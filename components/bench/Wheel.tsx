"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { wheelLabels } from "@/content/site";

function hsvToHex(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

type Pick = { t: string; hex: string; h: number; s: number; v: number };

/**
 * Bench 02 — a real, draggable HSV wheel. Each pick lands in a sheet row,
 * the way a respondent's would. Sliders provide the keyboard path.
 */
export default function Wheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(84);
  const [s, setS] = useState(0.7);
  const [v, setV] = useState(0.95);
  const [rows, setRows] = useState<Pick[]>([]);
  const dragging = useRef(false);

  const fromPointer = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = wheelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // -180..180, 0 = right
    const hue = (angle + 360) % 360; // conic-gradient from 90deg puts red at the right
    const dist = Math.min(1, Math.hypot(dx, dy) / (r.width / 2));
    setH(Math.round(hue));
    setS(Math.round(dist * 100) / 100);
  }, []);

  const commit = useCallback(() => {
    const hex = hsvToHex(h, s, v);
    const t = new Date().toISOString().slice(11, 19);
    setRows((prev) => [{ t, hex, h, s, v }, ...prev].slice(0, 4));
  }, [h, s, v]);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    fromPointer(e);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(e);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    commit();
  };

  // First row so the sheet never looks empty.
  useEffect(() => {
    setRows([{ t: "--:--:--", hex: hsvToHex(84, 0.7, 0.95), h: 84, s: 0.7, v: 0.95 }]);
  }, []);

  const hex = hsvToHex(h, s, v);
  const angle = (h * Math.PI) / 180;
  const radius = 50 * s;
  const px = 50 + Math.cos(angle) * radius;
  const py = 50 + Math.sin(angle) * radius;

  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-5">
      <div className="grid grid-cols-[minmax(0,10rem)_1fr] items-center gap-4">
        <div
          ref={wheelRef}
          aria-hidden
          className="hue-wheel relative aspect-square w-full cursor-crosshair select-none border border-ink"
          style={{ filter: `brightness(${0.55 + v * 0.45})` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <span
            aria-hidden
            className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-paper"
            style={{ left: `${px}%`, top: `${py}%` }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 shrink-0 border border-ink" style={{ background: hex }} aria-hidden />
            <span className="mono text-[0.85rem] tabular-nums">{hex}</span>
          </div>
          <label className="mono flex items-center gap-2 text-[0.65rem] text-pencil">
            <span className="w-16">{wheelLabels.hue}</span>
            <input className="sheet-range" type="range" min={0} max={359} value={h} aria-valuetext={`${h} degrees, ${hex}`} onChange={(e) => setH(Number(e.target.value))} onPointerUp={commit} onKeyUp={commit} />
          </label>
          <label className="mono flex items-center gap-2 text-[0.65rem] text-pencil">
            <span className="w-16">{wheelLabels.saturation}</span>
            <input className="sheet-range" type="range" min={0} max={100} value={Math.round(s * 100)} onChange={(e) => setS(Number(e.target.value) / 100)} onPointerUp={commit} onKeyUp={commit} />
          </label>
          <label className="mono flex items-center gap-2 text-[0.65rem] text-pencil">
            <span className="w-16">{wheelLabels.value}</span>
            <input className="sheet-range" type="range" min={20} max={100} value={Math.round(v * 100)} onChange={(e) => setV(Number(e.target.value) / 100)} onPointerUp={commit} onKeyUp={commit} />
          </label>
        </div>
      </div>

      {/* The sheet */}
      <div className="overflow-x-auto">
        <table className="mono w-full border-collapse text-[0.68rem]">
          <thead>
            <tr className="border-b border-ink text-left text-pencil">
              {wheelLabels.columns.map((c) => (
                <th key={c} className="py-1 pr-3 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.t}-${i}`} className={`border-b border-grid tabular-nums ${i === 0 ? "bg-marker/50" : ""}`}>
                <td className="py-1 pr-3">{r.t}</td>
                <td className="py-1 pr-3">
                  <span className="mr-1.5 inline-block h-2 w-2 border border-ink align-middle" style={{ background: r.hex }} aria-hidden />
                  {r.hex}
                </td>
                <td className="py-1 pr-3">{r.h}</td>
                <td className="py-1 pr-3">{Math.round(r.s * 100)}</td>
                <td className="py-1 pr-3">{Math.round(r.v * 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mono m-0 text-[0.62rem] text-pencil-light">{wheelLabels.hint}</p>
    </div>
  );
}
