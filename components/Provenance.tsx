"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { education, pathEntries, pathHighlights, pathLede, pathLedeHighlights, questionLabels, recognition, role, toolkit } from "@/content/site";
import { Stamp } from "@/components/Stamp";
import { Coded } from "@/components/Coded";
import { glossText } from "@/lib/gloss";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};
const nowIndex = () => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
};

type Plotted = { key: string; label: string; a: number; b: number; kind: "training" | "role"; ref: string };

/** Every record with a place on the axis, oldest first. */
function usePlotted(): Plotted[] {
  return useMemo(() => {
    const out: Plotted[] = [];
    education.forEach((e, i) => {
      if (!e.plot) return;
      out.push({ key: `edu-${i}`, label: `${e.degree} · ${e.school}`, a: monthIndex(e.plot.from), b: monthIndex(e.plot.to), kind: "training", ref: String(i + 1).padStart(2, "0") });
    });
    pathEntries.forEach((e, i) => {
      out.push({ key: `path-${i}`, label: `${e.role} · ${e.org}`, a: monthIndex(e.from), b: monthIndex(e.to), kind: "role", ref: String(education.length + i + 1).padStart(2, "0") });
    });
    out.push({ key: "now", label: `${role.title} · ${role.org}`, a: monthIndex(role.from), b: nowIndex(), kind: "role", ref: questionLabels.now });
    return out.sort((x, y) => x.a - y.a || y.b - x.b);
  }, []);
}

function TimeAxis({ reduced }: { reduced: boolean }) {
  const rows = usePlotted();
  const dataMin = Math.min(...rows.map((r) => r.a));
  const dataMax = Math.max(...rows.map((r) => r.b));
  const min = dataMin - 2;
  const max = dataMax + 2;
  const span = max + 1 - min;
  const pct = (m: number) => ((m - min) / span) * 100;
  const years: number[] = [];
  for (let m = min; m <= dataMax; m++) if (m % 12 === 0) years.push(m);

  return (
    <div role="img" aria-label="Timeline of training and roles" className="border-t border-ink">
      <div className="grid md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)]">
        <span className="mono hidden py-2 text-[0.68rem] text-pencil md:block">record</span>
        <div className="relative h-7">
          {years.map((m) => (
            <span key={m} className="mono absolute top-1.5 -translate-x-1/2 text-[0.66rem] text-pencil" style={{ left: `${pct(m)}%` }}>
              {m / 12}
            </span>
          ))}
        </div>
      </div>
      {rows.map((it, i) => {
        const left = pct(it.a);
        const width = Math.max(0.6, pct(it.b + 1) - left);
        const training = it.kind === "training";
        return (
          <div key={it.key} className="grid gap-x-6 border-t border-grid py-2.5 md:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] md:items-center">
            <span className="mono text-[0.72rem] leading-[1.4] text-ink">
              <span className="text-pencil">[{it.ref}]</span> {it.label}
            </span>
            <div className="relative mt-1.5 h-4 md:mt-0">
              {years.map((m) => (
                <span key={m} aria-hidden className="absolute bottom-0 top-0 border-l border-grid" style={{ left: `${pct(m)}%` }} />
              ))}
              <motion.span
                className={`absolute top-0.5 h-3 origin-left border border-ink ${training ? "bg-marker/35" : "bg-marker"}`}
                style={{ left: `${left}%`, width: `${width}%` }}
                initial={reduced ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.06 * i }}
              />
            </div>
          </div>
        );
      })}
      <div className="mono flex gap-5 border-t border-grid py-2 text-[0.66rem] text-pencil">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-2.5 w-4 border border-ink bg-marker" /> roles
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-2.5 w-4 border border-ink bg-marker/35" /> {questionLabels.training}
        </span>
      </div>
    </div>
  );
}

/** Under the panel: the story, the timeline, then everything on file as numbered records. */
export function Provenance() {
  const reduced = usePrefersReducedMotion();
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const rowCls = "grid gap-x-6 gap-y-1 border-t border-grid py-4 md:grid-cols-[3rem_9rem_minmax(0,1fr)]";

  return (
    <div className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-20 md:pb-28">
      <div className="rule-dashed" />
      <div className="pt-10">
        <h3 className="display-tight m-0 text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)]">{questionLabels.provenanceTitle}</h3>
        <Coded
          text={pathLede}
          highlights={pathLedeHighlights}
          gloss={false}
          keyPrefix="pl"
          className="body-serif measure-wide mt-5 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.6]"
        />
      </div>

      <div className="mt-10">
        <TimeAxis reduced={reduced} />
      </div>

      <ol className="m-0 mt-10 list-none p-0">
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
                <Coded
                  text={e.summary}
                  highlights={pathHighlights[i] ?? []}
                  keyPrefix={`pv-${i}`}
                  className="body-serif measure m-0 mt-1.5 text-[0.98rem] leading-[1.55]"
                />
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
