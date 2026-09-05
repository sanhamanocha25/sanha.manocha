"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { education, pathEntries, pathLede, questionLabels, recognition, toolkit } from "@/content/site";
import { Stamp } from "@/components/Stamp";
import { glossText } from "@/lib/gloss";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

type Entry = (typeof pathEntries)[number];
const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

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

function TimeAxis({ entries, reduced, offset }: { entries: Entry[]; reduced: boolean; offset: number }) {
  const { lanes, min, max, laneCount } = useLanes(entries);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 50%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);
  const W = 1000;
  const laneH = 30;
  const top = 20;
  const axisY = top + laneCount * laneH + 6;
  const H = axisY + 34;
  const span = max + 1 - min;
  const x = (m: number) => ((m - min) / span) * W;
  const ticks: { m: number; label: string }[] = [];
  for (let m = min; m <= max + 1; m++) if (m % 12 === 0) ticks.push({ m, label: String(m / 12) });

  return (
    <div ref={ref} className="hidden md:block">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Time axis of earlier roles">
        <motion.line x1={0} y1={axisY} x2={W} y2={axisY} stroke="#15171b" strokeWidth={1.25} style={{ pathLength }} />
        {ticks.map((t) => (
          <g key={t.m}>
            <line x1={x(t.m)} y1={axisY - 5} x2={x(t.m)} y2={axisY + 5} stroke="#15171b" strokeWidth={1} />
            <text x={x(t.m) + 6} y={axisY + 20} className="mono" fontSize={11} fill="#6f756d">
              {t.label}
            </text>
          </g>
        ))}
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
                y={y + 12}
                height={10}
                fill="#dcff4f"
                stroke="#15171b"
                strokeWidth={1}
                initial={reduced ? false : { width: 0 }}
                whileInView={{ width: w }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
              />
              <motion.text
                x={x0}
                y={y + 7}
                fontSize={11}
                fill="#15171b"
                className="mono"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                [{offset + i + 1}] {e.role} · {e.org}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Footnote apparatus under the QUESTION panel: education, earlier roles,
 * instruments and recognition, filed as numbered evidence records.
 */
export function Provenance() {
  const reduced = usePrefersReducedMotion();
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const pathStart = education.length;

  return (
    <div className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-20 md:pb-28">
      <div className="rule-dashed" />
      <div className="grid gap-x-16 gap-y-8 pt-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0">
          <h3 className="display-tight m-0 text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)]">{questionLabels.provenanceTitle}</h3>
          <p className="italic-note measure mt-4 text-[1.05rem] leading-[1.5] text-pencil">{pathLede}</p>
        </div>
        <p className="mono text-[0.72rem] text-pencil lg:pt-2">footnotes [{String(pathStart + 1).padStart(2, "0")}]–[{String(education.length + pathEntries.length).padStart(2, "0")}] are plotted on the axis; the rest are on file</p>
      </div>

      <div className="mt-10">
        <TimeAxis entries={pathEntries} reduced={reduced} offset={pathStart} />
      </div>

      {/* Footnotes */}
      <ol className="m-0 mt-8 list-none p-0">
        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">{questionLabels.training}</li>
        {education.map((e, i) => {
          const id = next();
          return (
            <Stamp key={e.degree} as="li" index={i} className="grid gap-x-6 gap-y-1 border-t border-grid py-4 md:grid-cols-[3rem_9rem_minmax(0,1fr)]">
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="mono text-[0.75rem] text-pencil">{e.meta}</span>
              <div>
                <p className="body-serif m-0 text-[1.02rem]">
                  <span className="font-medium">{e.degree}</span>
                  <span className="text-pencil"> — {e.school}</span>
                </p>
                {e.thesis ? <p className="italic-note m-0 mt-1.5 text-[0.95rem] text-pencil">{e.thesis}</p> : null}
              </div>
            </Stamp>
          );
        })}

        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">earlier path</li>
        {pathEntries.map((e, i) => {
          const id = next();
          return (
            <Stamp key={e.org + e.when} as="li" index={i} className="grid gap-x-6 gap-y-1 border-t border-grid py-4 md:grid-cols-[3rem_9rem_minmax(0,1fr)]">
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="mono text-[0.75rem] text-pencil">{e.when}</span>
              <div>
                <p className="body-serif m-0 text-[1.02rem]">
                  <span className="font-medium">{e.role}</span>
                  <span className="text-pencil"> — {e.org}</span>
                </p>
                <p className="body-serif measure m-0 mt-1.5 text-[0.98rem] leading-[1.55]">{glossText(e.summary, `pv-${i}`)}</p>
              </div>
            </Stamp>
          );
        })}

        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">{questionLabels.instruments}</li>
        {toolkit.map((g, gi) => {
          const id = next();
          return (
            <Stamp key={g.label} as="li" index={gi} className="grid gap-x-6 gap-y-1 border-t border-grid py-4 md:grid-cols-[3rem_9rem_minmax(0,1fr)]">
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="italic-note text-[0.95rem] text-pencil">{g.label}</span>
              <ul className="mono m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-[0.75rem]">
                {g.items.map((it) => (
                  <li key={it} className="border border-grid px-1.5 py-px">
                    {glossText(it, `tk-${gi}-${it}`)}
                  </li>
                ))}
              </ul>
            </Stamp>
          );
        })}

        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">{questionLabels.onRecord}</li>
        {recognition.map((r, i) => {
          const id = next();
          return (
            <Stamp key={r.name} as="li" index={i} className="grid gap-x-6 gap-y-0.5 border-t border-grid py-3 md:grid-cols-[3rem_9rem_minmax(0,1fr)]">
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="mono text-[0.75rem] text-pencil">{r.org}</span>
              <span className="body-serif text-[1rem]">{r.name}</span>
            </Stamp>
          );
        })}
      </ol>
    </div>
  );
}
