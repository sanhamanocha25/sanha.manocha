"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { education, pathEntries, pathLede, questionLabels, recognition, toolkit } from "@/content/site";
import { Stamp } from "@/components/Stamp";
import { glossText } from "@/lib/gloss";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** Everything that gets a bar on the axis: education at year resolution, roles by month. */
type Plotted = { key: string; label: string; a: number; b: number; kind: "year" | "month"; footnote: number };

function usePlotted(): Plotted[] {
  return useMemo(() => {
    const out: Plotted[] = [];
    education.forEach((e, i) => {
      if (!e.years) return;
      out.push({
        key: `edu-${i}`,
        label: `${e.degree} · ${e.school}`,
        a: e.years[0] * 12,
        b: e.years[1] * 12 + 11,
        kind: "year",
        footnote: i + 1,
      });
    });
    pathEntries.forEach((e, i) => {
      out.push({
        key: `path-${i}`,
        label: `${e.role} · ${e.org}`,
        a: monthIndex(e.from),
        b: monthIndex(e.to),
        kind: "month",
        footnote: education.length + i + 1,
      });
    });
    return out;
  }, []);
}

function useLanes(items: Plotted[]) {
  return useMemo(() => {
    const sorted = [...items].sort((x, y) => x.a - y.a || y.b - x.b);
    const laneEnd: number[] = [];
    const lanes = new Map<string, number>();
    for (const s of sorted) {
      let lane = laneEnd.findIndex((end) => end < s.a);
      if (lane < 0) lane = laneEnd.length;
      laneEnd[lane] = s.b;
      lanes.set(s.key, lane);
    }
    const min = Math.min(...sorted.map((s) => s.a));
    const max = Math.max(...sorted.map((s) => s.b));
    return { lanes, min, max, laneCount: laneEnd.length };
  }, [items]);
}

function TimeAxis({ reduced }: { reduced: boolean }) {
  const items = usePlotted();
  const rows = useMemo(() => [...items].sort((a, b) => a.a - b.a || b.b - a.b), [items]);
  const dataMax = Math.max(...items.map((i) => i.b));
  const min = Math.min(...items.map((i) => i.a)) - 1;
  const max = dataMax + 3;
  const span = max + 1 - min;
  const pct = (m: number) => ((m - min) / span) * 100;
  const years: number[] = [];
  for (let m = min; m <= dataMax; m++) if (m % 12 === 0) years.push(m);

  const gridLines = years.map((m) => (
    <span key={m} aria-hidden className="absolute bottom-0 top-0 border-l border-dashed border-pencil-light" style={{ left: `${pct(m)}%` }} />
  ));

  return (
    <div role="img" aria-label="Time axis of training and earlier roles" className="border-t border-ink">
      {/* year header */}
      <div className="grid md:grid-cols-[20rem_minmax(0,1fr)] lg:grid-cols-[26rem_minmax(0,1fr)]">
        <span className="mono hidden py-2 text-[0.68rem] text-pencil md:block">record</span>
        <div className="relative h-7">
          {years.map((m) => (
            <span key={m} className="mono absolute top-1.5 -translate-x-1/2 text-[0.68rem] text-pencil" style={{ left: `${pct(m)}%` }}>
              {m / 12}
            </span>
          ))}
        </div>
      </div>
      {rows.map((it, i) => {
        const left = pct(it.a);
        const width = Math.max(0.8, pct(it.b + 1) - left);
        const isYear = it.kind === "year";
        return (
          <div key={it.key} className="grid gap-x-6 border-t border-grid py-2.5 md:grid-cols-[20rem_minmax(0,1fr)] lg:grid-cols-[26rem_minmax(0,1fr)] md:items-center">
            <span className="mono text-[0.72rem] leading-[1.4] text-ink">
              <span className="text-pencil">[{String(it.footnote).padStart(2, "0")}]</span> {it.label}
            </span>
            <div className="relative mt-1.5 h-4 md:mt-0">
              {gridLines}
              <motion.span
                className={`absolute top-0.5 h-3 origin-left ${isYear ? "border border-dashed border-ink bg-transparent" : "border border-ink bg-marker"}`}
                style={{ left: `${left}%`, width: `${width}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.08 * i }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Footnote apparatus under the QUESTION panel: training, earlier roles,
 * instruments and recognition, filed as numbered evidence records.
 */
export function Provenance() {
  const reduced = usePrefersReducedMotion();
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const rowCls = "grid gap-x-6 gap-y-1 border-t border-grid py-4 md:grid-cols-[3rem_9rem_minmax(0,1fr)]";

  return (
    <div className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-20 md:pb-28">
      <div className="rule-dashed" />
      <div className="grid gap-x-16 gap-y-8 pt-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0">
          <h3 className="display-tight m-0 text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)]">{questionLabels.provenanceTitle}</h3>
          <p className="italic-note measure mt-4 text-[1.05rem] leading-[1.5] text-pencil">{pathLede}</p>
        </div>
        <p className="mono text-[0.72rem] leading-[1.5] text-pencil lg:pt-2">{questionLabels.provenanceNote}</p>
      </div>

      <div className="mt-10">
        <TimeAxis reduced={reduced} />
      </div>

      <ol className="m-0 mt-8 list-none p-0">
        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">{questionLabels.training}</li>
        {education.map((e, i) => {
          const id = next();
          return (
            <Stamp key={e.degree} as="li" index={i} className={rowCls}>
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="mono text-[0.75rem] text-pencil">{e.meta}</span>
              <div>
                <p className="body-serif m-0 text-[1.02rem]">
                  <span className="font-medium">{e.degree}</span>
                  <span className="text-pencil"> · {e.school}</span>
                </p>
                {e.thesis ? <p className="italic-note m-0 mt-1.5 text-[0.95rem] text-pencil">{e.thesis}</p> : null}
              </div>
            </Stamp>
          );
        })}

        <li className="mono border-t border-ink py-2 text-[0.68rem] text-pencil">{questionLabels.earlierPath}</li>
        {pathEntries.map((e, i) => {
          const id = next();
          return (
            <Stamp key={e.org + e.when} as="li" index={i} className={rowCls}>
              <span className="mono text-[0.72rem] text-pencil">[{id}]</span>
              <span className="mono text-[0.75rem] text-pencil">{e.when}</span>
              <div>
                <p className="body-serif m-0 text-[1.02rem]">
                  <span className="font-medium">{e.role}</span>
                  <span className="text-pencil"> · {e.org}</span>
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
            <Stamp key={g.label} as="li" index={gi} className={rowCls}>
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
