"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { bench, benchLabels, type Bench } from "@/content/site";
import { StateBand } from "@/components/StateBand";
import { LazyMount } from "@/components/LazyMount";
import { Coded } from "@/components/Coded";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

// Each miniature is its own chunk and only mounts when scrolled near.
const widgets = {
  feed: dynamic(() => import("@/components/bench/Feed"), { ssr: false }),
  wheel: dynamic(() => import("@/components/bench/Wheel"), { ssr: false }),
  delight: dynamic(() => import("@/components/bench/Delight"), { ssr: false }),
  screen: dynamic(() => import("@/components/bench/Screen"), { ssr: false }),
  platform: dynamic(() => import("@/components/bench/Platform"), { ssr: false }),
} as const;

function Placeholder({ entry }: { entry: Bench }) {
  return (
    <div className="flex h-full flex-col justify-between p-4 md:p-5">
      <span className="mono text-[0.7rem] text-pencil">bench {entry.number} · idle</span>
      <div className="grid grid-cols-8 gap-1" aria-hidden>
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="h-1.5 border border-grid" />
        ))}
      </div>
    </div>
  );
}

function Entry({ entry, index }: { entry: Bench; index: number }) {
  const reduced = usePrefersReducedMotion();
  const Widget = widgets[entry.id];
  const fields = [
    { label: benchLabels.why, text: entry.why },
    { label: benchLabels.did, text: entry.did },
    { label: benchLabels.result, text: entry.result },
  ].filter((f) => f.text);
  const flip = index % 2 === 1;

  return (
    <motion.article
      id={`bench-${entry.id}`}
      aria-labelledby={`bench-${entry.id}-title`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid scroll-mt-20 gap-x-10 gap-y-6 border-t border-ink py-10 md:py-14 lg:grid-cols-12"
    >
      {/* The miniature */}
      <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="border border-ink bg-paper">
          <div className="mono flex items-baseline justify-between border-b border-ink px-4 py-2 text-[0.7rem] text-pencil">
            <span>bench {entry.number}</span>
            <span className="italic-note text-[0.9rem]">{entry.status}</span>
          </div>
          <LazyMount className="grid min-h-[24rem] md:min-h-[26rem]" placeholder={<Placeholder entry={entry} />}>
            <Widget />
          </LazyMount>
        </div>
        <p className="mono mt-2 text-[0.68rem] text-pencil">{entry.caption}</p>
      </div>

      {/* The lab entry */}
      <div className={`min-w-0 lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <h3 id={`bench-${entry.id}-title`} className="display-tight m-0 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">
          {entry.title}
        </h3>
        <dl className="m-0 mt-8 space-y-6">
          {fields.map((f) => (
            <div key={f.label} className="grid gap-x-6 gap-y-1 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <dt className="mono pt-1 text-[0.72rem] text-pencil">{f.label}</dt>
              <Coded
                as="dd"
                text={f.text}
                highlights={entry.highlights}
                keyPrefix={`b-${entry.id}-${f.label}`}
                className="body-serif m-0 text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-[1.6]"
              />
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

/** TEST — the bench. Five curiosity-driven experiments you can operate. */
export function Test() {
  return (
    <section id="test" aria-labelledby="test-heading" className="grid-dots scroll-mt-14">
      <div id="test-heading" className="sr-only">
        Test
      </div>
      <StateBand state="test" tag="the bench" />
      <div className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-6 pt-14 md:pb-8 md:pt-20 lg:pt-24">
        <p className="italic-note measure-wide mb-12 text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-[1.45] text-pencil">
          {benchLabels.lede}
        </p>
        {bench.map((b, i) => (
          <Entry key={b.id} entry={b} index={i} />
        ))}
      </div>
    </section>
  );
}
