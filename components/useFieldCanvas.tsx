"use client";

import { useEffect, type RefObject } from "react";

type Code = "notice" | "question" | "test";
type Fragment = { text: string; code: string };

type Item = {
  text: string;
  code: Code;
  /** true when this fragment has a home in the written summary */
  keep: boolean;
  hx: number;
  hy: number;
  amp: number;
  s1: number;
  s2: number;
  ph: number;
  rot: number;
  gx: number;
  gy: number;
  w: number;
};

const CODE_ORDER: Code[] = ["notice", "question", "test"];
const COLORS = { ink: "#15171b", pencil: "#6f756d", marker: "#dcff4f" };

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
const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};
const INK = hexToRgb(COLORS.ink);
const PENCIL = hexToRgb(COLORS.pencil);

type Args = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hostRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLDivElement | null>;
  /** the written summary; its <mark data-frag> elements are the sort targets */
  summaryRef: RefObject<HTMLDivElement | null>;
  statusRef: RefObject<HTMLParagraphElement | null>;
  progressRef: RefObject<number>;
  /** fragments with a home in the summary */
  fragments: Fragment[];
  /** fragments that drift but fade away on sort */
  extras: Fragment[];
  reduced: boolean;
};

/**
 * The opening field. Fragments drift like notes on a desk; the cursor snaps
 * them to the graph paper; scrolling flies each one into its place in the
 * written summary, where the HTML tags take over so the text is real text.
 */
export function useFieldCanvas({ canvasRef, hostRef, headlineRef, summaryRef, statusRef, progressRef, fragments, extras, reduced }: Args) {
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
    let fontFamily = "ui-monospace, Menlo, monospace";
    let items: Item[] = [];
    let pointer: { x: number; y: number } | null = null;
    let lensR = 150;
    let raf = 0;
    let visible = true;
    let lastStatus = "";
    let lastVars = "";
    let counts: Record<Code, number> = { notice: 0, question: 0, test: 0 };

    const readFont = () => {
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim();
      fontFamily = fam ? `${fam}, ui-monospace, Menlo, monospace` : "ui-monospace, Menlo, monospace";
    };

    const pickExtras = (): Fragment[] => {
      const n = W < 640 ? 6 : W < 1024 ? 12 : extras.length;
      return extras.slice(0, n);
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
      // The HTML tags must be set in exactly the same size as the canvas text.
      host.style.setProperty("--frag", `${fontSize}px`);

      const gutter = Math.min(48, Math.max(20, W * 0.04));
      const rand = mulberry32(20241105);
      const hl = headlineRef.current?.getBoundingClientRect();
      const ex = hl ? { x: hl.left - rect.left - 24, y: hl.top - rect.top - 24, w: hl.width + 48, h: hl.height + 48 } : null;

      // Targets: the <mark> elements of the written summary.
      const targets = new Map<string, { x: number; y: number; w: number }>();
      summaryRef.current?.querySelectorAll<HTMLElement>("mark[data-frag]").forEach((m) => {
        const r = m.getBoundingClientRect();
        targets.set(m.dataset.frag ?? "", { x: r.left - rect.left, y: r.top - rect.top + r.height / 2, w: r.width });
      });

      const all: (Fragment & { keep: boolean })[] = [
        ...fragments.map((f) => ({ ...f, keep: true })),
        ...pickExtras().map((f) => ({ ...f, keep: false })),
      ];

      ctx.font = `${fontSize}px ${fontFamily}`;
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const rowGap = fontSize + 18;
      counts = { notice: 0, question: 0, test: 0 };
      items = all.map((f) => {
        const code = (CODE_ORDER.includes(f.code as Code) ? f.code : "notice") as Code;
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
        const t = f.keep ? targets.get(f.text) : undefined;
        if (f.keep && t) counts[code]++;
        return {
          text: f.text,
          code,
          keep: Boolean(f.keep && t),
          hx,
          hy,
          amp: 6 + rand() * 10,
          s1: 0.12 + rand() * 0.18,
          s2: 0.1 + rand() * 0.16,
          ph: rand() * Math.PI * 2,
          rot: (rand() - 0.5) * 0.22,
          gx: t?.x ?? hx,
          gy: t?.y ?? hy,
          w: t?.w ?? tw,
        };
      });
    };

    const setStatus = (s: string) => {
      if (s !== lastStatus && statusRef.current) {
        statusRef.current.textContent = s;
        lastStatus = s;
      }
    };
    const setVars = (words: number, marks: number) => {
      const key = `${words.toFixed(2)}|${marks}`;
      if (key === lastVars) return;
      lastVars = key;
      host.style.setProperty("--words", words.toFixed(2));
      host.style.setProperty("--marks", String(marks));
    };

    const drawMark = (code: Code, w: number, h: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      if (code === "notice") {
        ctx.fillStyle = COLORS.marker;
        ctx.fillRect(0, -h / 2, w, h);
      } else if (code === "question") {
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
    };

    const draw = (now: number) => {
      const time = now / 1000;
      const raw = clamp01(progressRef.current ?? 0);
      const p = easeInOut(raw);
      const swapped = raw >= 0.985;
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "middle";
      let inLens = 0;

      for (const it of items) {
        if (it.keep && swapped) continue; // the HTML tag has taken over
        const dx = it.hx + Math.sin(time * it.s1 + it.ph) * it.amp;
        const dy = it.hy + Math.cos(time * it.s2 + it.ph * 1.7) * it.amp * 0.7;
        let li = 0;
        if (pointer && p < 0.5) {
          const d = Math.hypot(dx - pointer.x, dy - pointer.y);
          li = 1 - smooth((d - lensR * 0.45) / (lensR * 0.55));
          if (li > 0.5) inLens++;
        }
        const sx = Math.round(dx / GRID) * GRID + 4;
        const sy = Math.round(dy / GRID) * GRID - fontSize * 0.55;
        const lx = lerp(dx, sx, li);
        const ly = lerp(dy, sy, li);

        let x: number, y: number, k: number, alpha: number;
        if (it.keep) {
          x = lerp(lx, it.gx, p);
          y = lerp(ly, it.gy, p);
          k = Math.max(p, li);
          alpha = lerp(0.5, 1, k);
        } else {
          // Extras drift off and fade as the sort happens.
          x = lx;
          y = ly + p * 60;
          k = li * (1 - p);
          alpha = lerp(0.5, 0, smooth(p * 1.4));
          if (alpha <= 0.01) continue;
        }
        const rot = it.rot * (1 - k);
        const r = lerp(PENCIL[0], INK[0], k);
        const g = lerp(PENCIL[1], INK[1], k);
        const b = lerp(PENCIL[2], INK[2], k);

        ctx.save();
        ctx.translate(x, y);
        if (rot !== 0) ctx.rotate(rot);
        const mk = clamp01((k - 0.35) / 0.65);
        if (mk > 0) drawMark(it.code, it.w, fontSize + 6, mk * alpha);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx.fillText(it.text, 6, 0);
        ctx.restore();
      }

      if (pointer && canHover && p < 0.5) {
        ctx.save();
        ctx.globalAlpha = 0.9 * (1 - p * 2);
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

      // Hand the summary's plain words in as the tags land; swap tags at the end.
      setVars(clamp01((raw - 0.55) / 0.4), swapped ? 1 : 0);

      const total = items.length;
      const kept = items.filter((i) => i.keep).length;
      if (swapped) setStatus(`coded · notice ×${counts.notice} · question ×${counts.question} · test ×${counts.test} · ${total - kept} set aside`);
      else if (raw > 0.05) setStatus(`sorting ${total} fragments · ${Math.round(raw * 100)}%`);
      else setStatus(`field · ${total} fragments${canHover ? " · move the cursor to read them" : ""}`);
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
    const relayout = () => {
      // Two passes: the first sets --frag, the second measures the tags at that size.
      layout();
      requestAnimationFrame(() => {
        layout();
        start();
      });
    };
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(relayout, 120);
    };
    window.addEventListener("resize", onResize);

    readFont();
    relayout();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        readFont();
        relayout();
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
  }, [canvasRef, hostRef, headlineRef, summaryRef, statusRef, progressRef, fragments, extras, reduced]);
}
