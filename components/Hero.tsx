"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero, heroFragments, heroSummary } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useFieldCanvas } from "@/components/useFieldCanvas";

/**
 * Hero: a full-viewport field of quoted fragments that drift like notes on a
 * desk. The cursor is a lens that snaps them to the graph paper; scrolling
 * sorts the entire field into a coded matrix beneath the headline.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef(0);

  // Scroll progress across the sticky travel → sorting progress (finishes at 70%).
  useEffect(() => {
    if (reduced) {
      progressRef.current = 1;
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel / 0.7)) : 1;
      progressRef.current = p;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useFieldCanvas({
    canvasRef,
    hostRef: stickyRef,
    headlineRef,
    statusRef,
    progressRef,
    fragments: heroFragments,
    summaries: heroSummary,
    reduced,
  });

  // Headline eases upward a touch as the matrix forms.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 0.7], [0, reduced ? 0 : -28]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative"
      style={{ height: reduced ? "100svh" : "175svh" }}
    >
      <div ref={stickyRef} className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 mx-auto max-w-[84rem] px-[var(--gutter)] pt-[clamp(3.5rem,9vh,7rem)]">
          <motion.div
            ref={headlineRef}
            style={{ y }}
            className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="italic-note mb-5 text-[0.95rem] text-pencil md:mb-7"
              >
                {hero.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="display text-[clamp(1.7rem,0.9rem+2.9vw,3.9rem)]"
              >
                {hero.headline}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="body-serif max-w-[34rem] text-[clamp(0.98rem,0.9rem+0.35vw,1.15rem)] leading-[1.5] text-pencil lg:col-span-4 lg:col-start-9 lg:max-w-none"
            >
              {hero.sub}
            </motion.p>
          </motion.div>
        </div>

        {/* Live status readout for the canvas — mirrors what the field is doing */}
        <p
          ref={statusRef}
          aria-live="off"
          className="mono pointer-events-none absolute bottom-4 left-[var(--gutter)] right-[var(--gutter)] z-10 truncate text-[0.72rem] text-pencil"
        />
      </div>

      {/* Accessible text alternative for the canvas content */}
      <p className="sr-only">
        A field of short quotations drawn from this page which sorts itself into three groups as you
        scroll: notice, question, and test.
      </p>
    </section>
  );
}

/** The three facts, as a record strip immediately under the hero. */
export function HeroFacts() {
  return (
    <div className="mx-auto max-w-[84rem] px-[var(--gutter)]">
      <div className="rule" />
      <dl className="grid grid-cols-1 divide-y divide-grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {hero.facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className={`flex items-baseline gap-4 py-4 ${i > 0 ? "sm:pl-6" : ""}`}
          >
            <dt className="mono shrink-0 text-[0.72rem] text-pencil">{f.label}</dt>
            <dd className="body-serif m-0 text-[0.98rem]">{f.value}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
