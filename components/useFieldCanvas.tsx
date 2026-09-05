"use client";

import { useEffect, type RefObject } from "react";

type Code = "notice" | "question" | "test";
type Fragment = { text: string; code: string };

type Item = {
  text: string;
  code: Code;
  // drift home + oscillation
  hx: number;
  hy: number;
  amp: number;
  s1: number;
  s2: number;
  ph: number;
  rot: number;
  // sorted grid position
  gx: number;
  gy: number;
  w: number;
  groupStart: boolean;
  hidden: boolean;
};

const CODE_ORDER: Code[] = ["notice", "question", "test"];
const COLORS = {
  paper: "#f1f2ed",
  ink: "#15171b",
  pencil: "#6f756d",
  marker: "#dcff4f",
  markerDeep: "#c4ea2c",
};

// Small deterministic PRNG so the field looks the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}
const INK = hexToRgb(COLORS.ink);
const PENCIL = hexToRgb(COLORS.pencil);

type Args = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hostRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  statusRef: RefObject<HTMLParagraphElement | null>;
  progressRef: RefObject<number>;
  fragments: Fragment[];
  reduced: boolean;
};

export function useFieldCanvas({ canvasRef, hostRef, headlineRef, statusRef, progressRef, fragments, reduced }: Args) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const GRID = 32;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let fontSize = 12;
    let fontFamily = "monospace";
    let items: Item[] = [];
    let pointer: { x: number; y: number } | null = null;
    let lensR = 150;
    let raf = 0;
    let visible = true;
    let lastStatus = "";
    let groupCounts: Record<Code, number> = { notice: 0, question: 0, test: 0 };

    const readFont = () => {
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim();
      fontFamily = fam ? `${fam}, ui-monospace, Menlo, monospace` : "ui-monospace, Menlo, monospace";
    };

    const pickFragments = (): Fragment[] => {
      const isMobile = W < 640;
      const isTablet = W < 1024;
      const target = isMobile ? 26 : isTablet ? 42 : fragments.length;
      if (target >= fragments.length) return fragments;
      // Take an even spread across codes: round-robin through the code buckets.
      const buckets: Record<string, Fragment[]> = {};
      fragments.forEach((f) => (buckets[f.code] ??= []).push(f));
      const out: Fragment[] = [];
      let i = 0;
      while (out.length < target) {
        let added = false;
        for (const code of CODE_ORDER) {
          const b = buckets[code];
          if (b && b[i]) {
            out.push(b[i]);
            added = true;
            if (out.length >= target) break;
          }
        }
        if (!added) break;
        i++;
      }
      return out;
    };

    const layout = () => {
      const rect = host.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = W < 640;
      fontSize = isMobile ? 10.5 : W < 1024 ? 11.5 : 12.5;
      lensR = isMobile ? 110 : 150;
      const gutter = Math.min(48, Math.max(20, W * 0.04));
      const rand = mulberry32(20241105);

      // Headline exclusion zone (drift should not sit on top of the type).
      const hl = headlineRef.current?.getBoundingClientRect();
      const ex = hl
        ? { x: hl.left - rect.left - 24, y: hl.top - rect.top - 24, w: hl.width + 48, h: hl.height + 48 }
        : null;

      const chosen = pickFragments();
      ctx.font = `${fontSize}px ${fontFamily}`;
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const rowGap = fontSize + 18;
      items = chosen.map((f) => {
        // rejection-sample a home outside the headline box and clear of other notes
        const tw = Math.ceil(ctx.measureText(f.text).width) + 12;
        let hx = 0;
        let hy = 0;
        let best: { x: number; y: number; score: number } | null = null;
        for (let tries = 0; tries < 60; tries++) {
          hx = gutter + rand() * Math.max(1, W - gutter * 2 - tw);
          hy = 40 + rand() * (H - 80);
          const inHeadline = ex && hx + tw > ex.x && hx < ex.x + ex.w && hy > ex.y && hy < ex.y + ex.h;
          if (inHeadline) continue;
          let overlap = 0;
          for (const r of placed) {
            const ox = Math.min(hx + tw, r.x + r.w) - Math.max(hx, r.x) + 16;
            const oy = Math.min(hy + rowGap, r.y + r.h) - Math.max(hy, r.y) + 8;
            if (ox > 0 && oy > 0) overlap += ox * oy;
          }
          if (overlap === 0) {
            best = { x: hx, y: hy, score: 0 };
            break;
          }
          if (!best || overlap < best.score) best = { x: hx, y: hy, score: overlap };
        }
        if (best) {
          hx = best.x;
          hy = best.y;
        }
        placed.push({ x: hx, y: hy, w: tw, h: rowGap });
        return {
          text: f.text,
          code: (CODE_ORDER.includes(f.code as Code) ? f.code : "notice") as Code,
          hx,
          hy,
          amp: 6 + rand() * 10,
          s1: 0.12 + rand() * 0.18,
          s2: 0.1 + rand() * 0.16,
          ph: rand() * Math.PI * 2,
          rot: (rand() - 0.5) * 0.22,
          gx: 0,
          gy: 0,
          w: 0,
          groupStart: false,
          hidden: false,
        };
      });

      // Sort into the coded matrix: grouped by code, flowing left→right.
      items.sort((a, b) => CODE_ORDER.indexOf(a.code) - CODE_ORDER.indexOf(b.code));
      ctx.font = `${fontSize}px ${fontFamily}`;
      const padX = 6;
      const gap = isMobile ? 8 : 12;
      const rowH = fontSize + (isMobile ? 9 : 13);
      const headlineBottom = hl ? hl.bottom - rect.top : 0;
      const bandTop = Math.max(H * (isMobile ? 0.62 : 0.58), headlineBottom + (isMobile ? 20 : 44));
      const bandBottom = H - (isMobile ? 44 : 52);
      const maxRows = Math.max(1, Math.floor((bandBottom - bandTop) / rowH));

      const place = () => {
        groupCounts = { notice: 0, question: 0, test: 0 };
        let x = gutter;
        let row = 0;
        let cur: Code | null = null;
        for (const it of items) {
          if (it.hidden) continue;
          it.w = Math.ceil(ctx.measureText(it.text).width) + padX * 2;
          it.groupStart = false;
          if (it.code !== cur) {
            if (cur !== null) row++;
            cur = it.code;
            x = gutter;
            it.groupStart = true;
            const label = `${it.code} ×00`;
            x += Math.ceil(ctx.measureText(label).width) + gap + 8;
          }
          if (x + it.w > W - gutter) {
            row++;
            x = gutter;
          }
          it.gx = x;
          it.gy = row;
          x += it.w + gap;
          groupCounts[it.code]++;
        }
        return row + 1;
      };

      let rows = place();
      // If the matrix won't fit the band, drop items from the longest group until it does.
      let guard = 0;
      while (rows > maxRows && guard++ < items.length) {
        const visibleItems = items.filter((i) => !i.hidden);
        if (visibleItems.length <= 4) break;
        const longest = CODE_ORDER.reduce((a, b) => (groupCounts[a] >= groupCounts[b] ? a : b));
        const idx = items.map((i) => (!i.hidden && i.code === longest ? 1 : 0)).lastIndexOf(1);
        if (idx < 0) break;
        items[idx].hidden = true;
        rows = place();
      }
      // Centre the finished matrix inside the band below the headline.
      const usedH = rows * rowH;
      const top = Math.max(bandTop, bandTop + (bandBottom - bandTop - usedH) / 2);
      for (const it of items) it.gy = top + it.gy * rowH + rowH * 0.5;
    };

    const setStatus = (s: string) => {
      if (s !== lastStatus && statusRef.current) {
        statusRef.current.textContent = s;
        lastStatus = s;
      }
    };

    const draw = (now: number) => {
      const time = now / 1000;
      const p = easeInOut(clamp01(progressRef.current ?? 0));
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "middle";

      const total = items.filter((i) => !i.hidden).length;
      let inLens = 0;

      for (const it of items) {
        if (it.hidden) continue;
        const dx = it.hx + Math.sin(time * it.s1 + it.ph) * it.amp;
        const dy = it.hy + Math.cos(time * it.s2 + it.ph * 1.7) * it.amp * 0.7;

        // Lens influence: fragments under the lens snap to the graph paper.
        let li = 0;
        if (pointer) {
          const d = Math.hypot(dx - pointer.x, dy - pointer.y);
          li = 1 - smooth((d - lensR * 0.45) / (lensR * 0.55));
          if (li > 0.5) inLens++;
        }
        const sx = Math.round(dx / GRID) * GRID + 4;
        const sy = Math.round(dy / GRID) * GRID - fontSize * 0.55;

        const lx = lerp(dx, sx, li);
        const ly = lerp(dy, sy, li);
        const x = lerp(lx, it.gx, p);
        const y = lerp(ly, it.gy, p);
        const k = Math.max(p, li);

        const rot = it.rot * (1 - k);
        const alpha = lerp(0.5, 1, k);
        const c = INK;
        const r = lerp(PENCIL[0], c[0], k);
        const g = lerp(PENCIL[1], c[1], k);
        const b = lerp(PENCIL[2], c[2], k);

        ctx.save();
        ctx.translate(x, y);
        if (rot !== 0) ctx.rotate(rot);

        // Marks: coded state appears past k = 0.35
        const mk = clamp01((k - 0.35) / 0.65);
        if (mk > 0) {
          const w = it.w || Math.ceil(ctx.measureText(it.text).width) + 12;
          const h = fontSize + 6;
          ctx.globalAlpha = mk;
          if (it.code === "notice") {
            ctx.fillStyle = COLORS.marker;
            ctx.fillRect(0, -h / 2, w, h);
          } else if (it.code === "question") {
            ctx.strokeStyle = COLORS.ink;
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, -h / 2 + 0.5, w - 1, h - 1);
          } else {
            ctx.strokeStyle = COLORS.ink;
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.moveTo(0, h / 2 - 1);
            ctx.lineTo(w, h / 2 - 1);
            ctx.stroke();
            ctx.setLineDash([]);
          }
          ctx.globalAlpha = 1;
        }

        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx.fillText(it.text, 6, 0);
        ctx.restore();
      }

      // Group labels once the matrix has formed.
      if (p > 0.6) {
        const la = clamp01((p - 0.6) / 0.4);
        ctx.globalAlpha = la;
        ctx.fillStyle = COLORS.pencil;
        ctx.font = `${fontSize}px ${fontFamily}`;
        for (const it of items) {
          if (it.hidden || !it.groupStart) continue;
          const gutter = Math.min(48, Math.max(20, W * 0.04));
          ctx.fillText(it.code, gutter, it.gy);
          const lw = ctx.measureText(it.code).width;
          ctx.fillStyle = COLORS.ink;
          ctx.fillText(`×${groupCounts[it.code]}`, gutter + lw + 4, it.gy);
          ctx.fillStyle = COLORS.pencil;
        }
        ctx.globalAlpha = 1;
      }

      // Lens ring with a running count — the researcher's reticle.
      if (pointer && canHover && p < 0.98) {
        ctx.save();
        ctx.globalAlpha = 0.9 * (1 - p);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, lensR, 0, Math.PI * 2);
        ctx.stroke();
        for (const a of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
          ctx.beginPath();
          ctx.moveTo(pointer.x + Math.cos(a) * (lensR - 8), pointer.y + Math.sin(a) * (lensR - 8));
          ctx.lineTo(pointer.x + Math.cos(a) * (lensR + 8), pointer.y + Math.sin(a) * (lensR + 8));
          ctx.stroke();
        }
        ctx.fillStyle = COLORS.ink;
        ctx.font = `${Math.max(10, fontSize - 1)}px ${fontFamily}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(`n = ${inLens}`, pointer.x + lensR * 0.72, pointer.y - lensR * 0.72);
        ctx.restore();
      }

      if (p >= 0.98) {
        setStatus(
          `coded · ${CODE_ORDER.map((c) => `${c} ×${groupCounts[c]}`).join(" · ")}`,
        );
      } else if (p > 0.05) {
        setStatus(`sorting ${total} fragments · ${Math.round(p * 100)}%`);
      } else {
        setStatus(`field · ${total} fragments${canHover ? " · move the cursor to read them" : ""}`);
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    // Pointer as lens
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (reduced) start();
    };
    const onLeave = () => {
      pointer = null;
      if (reduced) start();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointercancel", onLeave);

    // Only run while the hero is on screen and the tab is visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 },
    );
    io.observe(host);
    const onVis = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVis);

    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        layout();
        start();
      }, 120);
    };
    window.addEventListener("resize", onResize);

    readFont();
    layout();
    start();
    // Re-measure once web fonts are in, so grid widths are exact.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        readFont();
        layout();
        start();
      });
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(resizeT);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef, hostRef, headlineRef, statusRef, progressRef, fragments, reduced]);
}
