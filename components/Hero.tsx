"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero, heroExtras, heroNote, heroSummary } from "@/content/site";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";
import { useFieldCanvas } from "@/components/useFieldCanvas";

type Piece = { text: string; tag: boolean };
const parse = (text: string): Piece[] =>
  text.split(/(\[\[[^\]]+\]\])/g).filter(Boolean).map((part) =>
    part.startsWith("[[") ? { text: part.slice(2, -2), tag: true } : { text: part, tag: false },
  );

/**
 * Hero: a field of quoted fragments that drift like notes on a desk. The
 * cursor is a lens; scrolling flies each fragment into its place in a written
 * summary, so the keywords add up to a person.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef(0);

  const sentences = useMemo(() => heroSummary.map((s) => ({ code: s.code, pieces: parse(s.text) })), []);
  const fragments = useMemo(
    () => sentences.flatMap((s) => s.pieces.filter((p) => p.tag).map((p) => ({ text: p.text, code: s.code }))),
    [sentences],
  );

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
      progressRef.current = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel / 0.7)) : 1;
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

  useFieldCanvas({ canvasRef, hostRef: stickyRef, headlineRef, summaryRef, statusRef, progressRef, fragments, extras: heroExtras, reduced });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 0.7], [0, reduced ? 0 : -24]);
  // On small screens the summary needs the room, so the headline hands over as the sort completes.
  const small = useMediaQuery("(max-width: 767px)");
  const headlineOpacity = useTransform(scrollYProgress, (v) =>
    small && !reduced ? 1 - Math.min(1, Math.max(0, (v - 0.2) / 0.3)) : 1,
  );

  return (
    <section ref={sectionRef} aria-label="Introduction" className="relative" style={{ height: reduced ? "100svh" : "175svh" }}>
      <div
        ref={stickyRef}
        className="hero-host sticky top-0 h-[100svh] overflow-hidden"
        style={reduced ? ({ "--words": 1, "--marks": 1 } as React.CSSProperties) : undefined}
      >
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        <div className="relative z-10 mx-auto max-w-[84rem] px-[var(--gutter)] pt-[clamp(3rem,8vh,6.5rem)]">
          <motion.div ref={headlineRef} style={{ y, opacity: headlineOpacity }} className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="italic-note mb-4 text-[0.95rem] text-pencil md:mb-6">
                {hero.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="display text-[clamp(1.6rem,0.9rem+2.7vw,3.7rem)]"
              >
                {hero.headline}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="body-serif hidden max-w-[34rem] text-[clamp(0.95rem,0.88rem+0.3vw,1.08rem)] leading-[1.5] text-pencil md:block lg:col-span-4 lg:col-start-9 lg:max-w-none"
            >
              {hero.sub}
            </motion.p>
          </motion.div>
        </div>

        {/* The written summary the fragments fly into */}
        <div
          ref={summaryRef}
          className="hero-summary absolute bottom-12 left-[var(--gutter)] right-[var(--gutter)] z-10 mx-auto max-w-[84rem] md:bottom-14"
          aria-live="off"
        >
          <p className="hero-words mono mb-3 text-[0.72rem] text-pencil">{heroNote}</p>
          {sentences.map((s, i) => (
            <p key={i} className="body-serif m-0 mb-1.5 text-[0.92rem] leading-[1.75] md:mb-2 md:text-[1.05rem] md:leading-[1.9] lg:text-[1.12rem]">
              {s.pieces.map((p, j) =>
                p.tag ? (
                  <mark key={j} className="frag" data-frag={p.text} data-code={s.code}>
                    {p.text}
                  </mark>
                ) : (
                  <span key={j} className="hero-words">
                    {p.text}
                  </span>
                ),
              )}
            </p>
          ))}
        </div>

        <p ref={statusRef} aria-live="off" className="mono pointer-events-none absolute bottom-4 left-[var(--gutter)] right-[var(--gutter)] z-10 truncate text-[0.72rem] text-pencil" />
      </div>
    </section>
  );
}

/** The three facts as a record strip under the hero; the sub-line joins it on small screens. */
export function HeroFacts() {
  return (
    <div className="mx-auto max-w-[84rem] px-[var(--gutter)]">
      <div className="rule" />
      <p className="body-serif py-4 text-[0.98rem] leading-[1.55] text-pencil md:hidden">{hero.sub}</p>
      <dl className="grid grid-cols-1 divide-y divide-grid border-t border-grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:border-t-0">
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
