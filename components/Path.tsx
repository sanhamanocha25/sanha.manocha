"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { path } from "@/content/site";
import { Section } from "@/components/Section";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

type Entry = (typeof path.entries)[number];

const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** Assign non-overlapping lanes to entries, earliest first. */
function useLanes(entries: Entry[]) {
  return useMemo(() => {
    const sorted = entries
      .map((e, i) => ({ e, i, a: monthIndex(e.from), b: monthIndex(e.to) }))
      .sort((x, y) => x.a - y.a || y.b - x.b);
    const laneEnd: number[] = [];
    const lanes = new Map<number, number>();
    for (const s of sorted) {
      let lane = laneEnd.findIndex((end) => end < s.a);
      if (lane < 0) lane = laneEnd.length;
      laneEnd[lane] = s.b;
      lanes.set(s.i, lane);
    }
    const min = Math.min(...sorted.map((s) => s.a));
    const max = Math.max(...sorted.map((s) => s.b));
    return { lanes, min, max, laneCount: laneEnd.length };
  }, [entries]);
}

function TimeAxis({ entries, reduced }: { entries: Entry[]; reduced: boolean }) {
  const { lanes, min, max, laneCount } = useLanes(entries);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 45%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  const W = 1000;
  const laneH = 34;
  const top = 24;
  const axisY = top + laneCount * laneH + 8;
  const H = axisY + 40;
  const span = max + 1 - min;
  const x = (m: number) => ((m - min) / span) * W;

  // Year ticks at each January inside the range, plus both ends.
  const ticks: { m: number; label: string }[] = [];
  for (let m = min; m <= max + 1; m++) {
    if (m % 12 === 0) ticks.push({ m, label: String(m / 12) });
  }

  return (
    <div ref={ref} className="hidden md:block">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Time axis of earlier roles">
        {/* Axis */}
        <motion.line
          x1={0}
          y1={axisY}
          x2={W}
          y2={axisY}
          stroke="#15171b"
          strokeWidth={1.25}
          style={{ pathLength }}
        />
        {ticks.map((t) => (
          <g key={t.m}>
            <line x1={x(t.m)} y1={axisY - 6} x2={x(t.m)} y2={axisY + 6} stroke="#15171b" strokeWidth={1} />
            <text x={x(t.m) + 6} y={axisY + 22} className="mono" fontSize={12} fill="#6f756d">
              {t.label}
            </text>
          </g>
        ))}
        {/* Bars */}
        {entries.map((e, i) => {
          const a = monthIndex(e.from);
          const b = monthIndex(e.to);
          const lane = lanes.get(i) ?? 0;
          const y = top + lane * laneH;
          const x0 = x(a);
          const w = Math.max(6, x(b + 1) - x0);
          return (
            <g key={e.org + e.when}>
              <motion.rect
                x={x0}
                y={y + 14}
                height={12}
                fill="#dcff4f"
                stroke="#15171b"
                strokeWidth={1}
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: w }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 }}
              />
              <motion.text
                x={x0}
                y={y + 8}
                fontSize={11.5}
                fill="#15171b"
                className="mono"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                {e.role} · {e.org}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Path() {
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  return (
    <Section id={path.id} code={path.code} tag={path.tag} heading={path.heading} wide>
      <p className="italic-note measure mb-12 text-[clamp(1.05rem,1rem+0.3vw,1.3rem)] leading-[1.5] text-pencil">
        {path.lede}
      </p>

      <TimeAxis entries={path.entries} reduced={reduced} />

      <ol ref={listRef} className="relative m-0 mt-10 list-none p-0 md:mt-16">
        {/* Vertical rule that draws with scroll */}
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-ink"
          style={{ scaleY }}
        />
        {path.entries.map((e, i) => (
          <motion.li
            key={e.org + e.when}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid gap-x-8 gap-y-2 border-t border-grid py-7 pl-6 first:border-t-0 md:grid-cols-[10rem_minmax(0,1fr)] md:pl-10"
          >
            <p className="mono m-0 text-[0.78rem] text-pencil md:pt-1">{e.when}</p>
            <div className="min-w-0">
              <h3 className="display-tight m-0 text-[1.35rem] md:text-[1.5rem]">{e.role}</h3>
              <p className="body-serif m-0 mt-1 text-[0.98rem] text-pencil">{e.org}</p>
              <p className="body-serif measure m-0 mt-3 text-[1rem] leading-[1.6] md:text-[1.05rem]">{e.summary}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
