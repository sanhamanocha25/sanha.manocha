"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { benchLabels, screenLabels } from "@/content/site";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

type Concept = { id: string; synthetic: number; real: number };

// Deterministic: the same fifteen abstract concepts every visit. Values are
// relative bar heights only — no score is ever displayed as a number.
function makeConcepts(n: number): Concept[] {
  let seed = 11;
  const r = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: n }, (_, i) => {
    const synthetic = 0.25 + r() * 0.7;
    const real = Math.min(1, Math.max(0.15, synthetic + (r() - 0.5) * 0.22));
    return { id: String.fromCharCode(65 + i), synthetic, real };
  });
}

/**
 * Bench 04 — fifteen abstract concepts, two readings of each (synthetic and
 * real), five survive. Shows the pattern of a small gap; states no figure.
 */
export default function Screen() {
  const reduced = usePrefersReducedMotion();
  const concepts = useMemo(() => makeConcepts(screenLabels.concepts), []);
  const [ran, setRan] = useState(false);

  const ordered = useMemo(() => {
    if (!ran) return concepts;
    return [...concepts].sort((a, b) => b.synthetic - a.synthetic);
  }, [concepts, ran]);
  const keep = new Set(ordered.slice(0, screenLabels.keep).map((c) => c.id));

  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-5">
      <div className="mono flex flex-wrap items-center justify-between gap-2 text-[0.7rem]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRan(true)}
            disabled={ran}
            className="focus-marker border border-ink px-2.5 py-1 hover:bg-marker disabled:border-grid disabled:text-pencil-light"
          >
            {screenLabels.run}
          </button>
          <button type="button" onClick={() => setRan(false)} disabled={!ran} className="focus-marker border border-grid px-2.5 py-1 text-pencil hover:border-ink disabled:opacity-50">
            {screenLabels.reset}
          </button>
        </div>
        <span className="flex items-center gap-3 text-pencil">
          <span className="flex items-center gap-1">
            <span aria-hidden className="inline-block h-2 w-2 border border-ink" /> {screenLabels.synthetic}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden className="inline-block h-2 w-2 border border-ink bg-ink" /> {screenLabels.real}
          </span>
        </span>
      </div>

      <LayoutGroup>
        <ol className="m-0 grid list-none grid-cols-5 gap-2 p-0" aria-label="Fifteen abstract concepts">
          {ordered.map((c, i) => {
            const kept = ran && keep.has(c.id);
            const dim = ran && !kept;
            return (
              <motion.li
                key={c.id}
                layout={!reduced}
                transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : i * 0.02 }}
                className={`relative flex aspect-[5/4] flex-col justify-end border p-1.5 transition-colors duration-500 ${
                  kept ? "border-ink bg-marker/40" : dim ? "border-grid" : "border-ink"
                }`}
                aria-label={`Concept ${c.id}${kept ? ", shortlisted" : ""}`}
              >
                <span className={`mono absolute left-1.5 top-1 text-[0.6rem] ${dim ? "text-pencil-light" : "text-ink"}`}>{c.id}</span>
                <div className="flex h-[62%] items-end gap-1" aria-hidden>
                  <motion.span
                    className={`w-1/2 border border-ink ${dim ? "opacity-30" : ""}`}
                    initial={false}
                    animate={{ height: `${c.synthetic * 100}%` }}
                    transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  />
                  <motion.span
                    className={`w-1/2 bg-ink ${dim ? "opacity-30" : ""}`}
                    initial={false}
                    animate={{ height: `${(ran ? c.real : 0) * 100}%` }}
                    transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE, delay: 0.4 + i * 0.03 }}
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </LayoutGroup>

      <div className="mono flex items-baseline justify-between text-[0.65rem] text-pencil">
        <span>
          {ran
            ? `${screenLabels.shortlist}: ${ordered.slice(0, screenLabels.keep).map((c) => c.id).join(" ")} · ${screenLabels.concepts} → ${screenLabels.keep}`
            : `${screenLabels.concepts} concepts · ${screenLabels.synthetic} reading shown`}
        </span>
        <span className="text-pencil-light">{benchLabels.illustration}</span>
      </div>
    </div>
  );
}
