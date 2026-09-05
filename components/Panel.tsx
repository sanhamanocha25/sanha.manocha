"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PanelGroup } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { glossText } from "@/lib/gloss";

/** Counts up to `target` when `active` flips true. Instant under reduced motion. */
function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [n, setN] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (reduced) {
      setN(target);
      return;
    }
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, reduced]);
  return n;
}

function Units({ count, active, reduced }: { count: number; active: boolean; reduced: boolean }) {
  const perRow = 10;
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${Math.min(perRow, count)}, 0.7rem)` }}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`unit ${active ? "on" : "dim"}`}
          style={{ transitionDelay: active && !reduced ? `${i * 18}ms` : "0ms" }}
        />
      ))}
    </div>
  );
}

export function PanelGroupView({ group, active }: { group: PanelGroup; active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const tone = active ? "text-ink" : "text-pencil-light";
  return (
    <div className={`border-t border-grid py-3 transition-colors duration-300 ${tone}`} data-active={active}>
      <div className="mono mb-2 flex items-baseline justify-between gap-3 text-[0.68rem]">
        <span>{group.label}</span>
        <span className="text-pencil-light">¶ {String(group.point + 1).padStart(2, "0")}</span>
      </div>
      <GroupBody group={group} active={active} reduced={reduced} />
    </div>
  );
}

function GroupBody({ group, active, reduced }: { group: PanelGroup; active: boolean; reduced: boolean }) {
  switch (group.kind) {
    case "count": {
      return <CountBody group={group} active={active} reduced={reduced} />;
    }
    case "legend":
      return (
        <ul className="mono m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-[0.72rem]">
          {group.items.map((it, i) => (
            <li
              key={it}
              className={`border px-1 py-px transition-[border-color,background-color] duration-300 ${
                active ? "border-ink" : "border-grid"
              }`}
              style={{ transitionDelay: active && !reduced ? `${i * 60}ms` : "0ms" }}
            >
              {glossText(it, `lg-${group.id}-${i}`)}
            </li>
          ))}
        </ul>
      );
    case "pair":
      return (
        <div className="grid grid-cols-2 gap-2">
          {group.items.map((it, i) => (
            <div key={it} className="flex flex-col gap-1.5">
              <span
                className={`unit h-[0.7rem] w-full ${active ? "on" : "dim"}`}
                style={{ transitionDelay: active && !reduced ? `${i * 160}ms` : "0ms" }}
                aria-hidden
              />
              <span className="body-serif text-[0.8rem] leading-[1.3]">{it}</span>
            </div>
          ))}
        </div>
      );
    case "flat":
      return (
        <div>
          <div className="flex items-end gap-2" aria-hidden>
            {group.items.map((it) => (
              <div key={it} className="flex-1">
                <div
                  className={`h-6 border border-ink transition-colors duration-500 ${active ? "bg-marker" : "bg-transparent border-grid"}`}
                />
                <span className="mono mt-1 block text-[0.65rem]">{it}</span>
              </div>
            ))}
          </div>
          <p className="mono mt-2 text-[0.68rem]">{glossText("no significant lift", `flat-${group.id}`)}</p>
        </div>
      );
    case "cadence":
      return (
        <ul className="m-0 list-none space-y-2 p-0">
          {group.items.map((it) => (
            <li key={it.name} className="flex items-center gap-2">
              <span
                aria-hidden
                className={`unit shrink-0 ${active ? (it.rhythm === "monthly" ? "pulse-monthly" : "pulse-weekly") : "dim"}`}
              />
              <span className="mono text-[0.68rem] text-pencil">{it.rhythm}</span>
              <span className="body-serif text-[0.8rem] leading-[1.3]">{it.name}</span>
            </li>
          ))}
        </ul>
      );
    case "xref":
      return (
        <ul className="m-0 list-none space-y-1 p-0">
          {group.items.map((it) => (
            <li key={it.name} className="mono text-[0.72rem]">
              <Link
                href={`/#bench-${it.bench}`}
                className={`focus-marker no-underline hover:bg-marker ${active ? "border-b border-ink" : "border-b border-grid"}`}
              >
                {it.name}
              </Link>
              <span className="text-pencil-light"> · bench</span>
            </li>
          ))}
        </ul>
      );
  }
}

function CountBody({
  group,
  active,
  reduced,
}: {
  group: Extract<PanelGroup, { kind: "count" }>;
  active: boolean;
  reduced: boolean;
}) {
  const n = useCountUp(group.count, active, reduced);
  return (
    <div className="flex items-start gap-4">
      <Units count={group.count} active={active} reduced={reduced} />
      <span className="mono text-[1.6rem] leading-none tabular-nums">
        {n}
        <span className="text-[1rem]">{active ? group.suffix : ""}</span>
      </span>
    </div>
  );
}
