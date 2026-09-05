"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { states } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion";

type Key = keyof typeof states;

/**
 * A full-width band announcing a change of mind. The state word is set huge;
 * a highlighter stroke sweeps under it as the band crosses the viewport.
 */
export function StateBand({ state, tag }: { state: Key; tag?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const s = states[state];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mark = el.querySelector<HTMLElement>("mark.hl");
    if (!mark) return;
    if (reduced) {
      mark.style.setProperty("--hl", "100%");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mark,
        { "--hl": "0%" },
        {
          "--hl": "100%",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: 0.5 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className="border-y border-ink bg-paper-deep">
      <div className="mx-auto grid max-w-[84rem] gap-x-12 gap-y-4 px-[var(--gutter)] py-10 md:grid-cols-12 md:items-end md:py-14">
        <p className="mono text-[0.75rem] text-pencil md:col-span-2">
          {s.number} / 03{tag ? <span className="italic-note block text-[0.95rem]">{tag}</span> : null}
        </p>
        <h2 className="state-word m-0 text-[clamp(4rem,2rem+12vw,11rem)] md:col-span-6">
          <mark className="hl" style={{ backgroundSize: "var(--hl, 0%) 26%", backgroundPosition: "0 92%" }}>
            {s.word}
          </mark>
        </h2>
        <p className="italic-note m-0 text-[clamp(1.1rem,1rem+0.6vw,1.5rem)] leading-[1.35] text-pencil md:col-span-4 md:pb-3">
          {s.gloss}
        </p>
      </div>
    </div>
  );
}
