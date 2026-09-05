"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { delightSurvey } from "@/content/site";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !run) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = canvas.parentElement!.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = r.width;
    const H = r.height;
    const parts = Array.from({ length: 70 }, (_, i) => ({
      x: W / 2 + (Math.random() - 0.5) * 40,
      y: H * 0.55,
      vx: (Math.random() - 0.5) * 9,
      vy: -6 - Math.random() * 7,
      s: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      ink: i % 4 === 0,
    }));
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const age = (t - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.vy += 0.28;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - age / 1.8);
        ctx.fillStyle = p.ink ? "#15171b" : "#dcff4f";
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
      }
      if (age < 1.9) raf = requestAnimationFrame(step);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

/**
 * Bench 03 — a three-question micro survey the visitor can finish, with the
 * pattern of small delights described in the write-up. Nothing is stored.
 */
export default function Delight() {
  const reduced = usePrefersReducedMotion();
  const qs = delightSurvey.questions;
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n done
  const [answers, setAnswers] = useState<(number | null)[]>(() => qs.map(() => null));
  const [started, setStarted] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const done = step >= qs.length;

  const begin = () => {
    setAnswers(qs.map(() => null));
    setStarted(performance.now());
    setStep(0);
  };
  const choose = (i: number) => setAnswers((a) => a.map((v, k) => (k === step ? i : v)));
  const next = () => {
    if (step === qs.length - 1) setElapsed(Math.max(1, Math.round((performance.now() - started) / 1000)));
    setStep((s) => s + 1);
  };

  const progress = step < 0 ? 0 : Math.min(1, (step + (answers[step] !== null ? 1 : 0)) / qs.length);

  return (
    <div className="relative flex h-full flex-col p-4 md:p-5">
      {/* progress rail */}
      <div className="mono flex items-center gap-3 text-[0.65rem] text-pencil">
        <div className="h-2 flex-1 border border-ink">
          <motion.div
            className="h-full bg-marker"
            initial={false}
            animate={{ width: `${(done ? 1 : progress) * 100}%` }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
          />
        </div>
        <span className="tabular-nums">
          {done ? qs.length : Math.max(0, step)} / {qs.length}
        </span>
      </div>

      <div className="relative mt-5 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {step < 0 ? (
            <motion.div key="intro" {...fade(reduced)} className="flex h-full flex-col justify-between gap-4">
              <p className="italic-note m-0 text-[1.05rem] leading-[1.4] text-pencil">
                {delightSurvey.intro}
              </p>
              <button type="button" onClick={begin} className="focus-marker mono self-start border border-ink px-3 py-1.5 text-[0.75rem] hover:bg-marker">
                {delightSurvey.start}
              </button>
            </motion.div>
          ) : !done ? (
            <motion.div key={`q${step}`} {...fade(reduced)} className="flex h-full flex-col gap-4">
              <p className="body-serif m-0 text-[1.05rem] leading-[1.4]">{qs[step].q}</p>
              <div role="radiogroup" aria-label={qs[step].q} className="flex flex-wrap gap-2">
                {qs[step].options.map((o, i) => {
                  const on = answers[step] === i;
                  return (
                    <motion.button
                      key={o}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => choose(i)}
                      whileTap={reduced ? undefined : { scale: 0.96 }}
                      className={`focus-marker mono border px-2.5 py-1.5 text-[0.75rem] transition-colors ${
                        on ? "border-ink bg-marker" : "border-grid hover:border-ink"
                      }`}
                    >
                      {o}
                    </motion.button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={next}
                disabled={answers[step] === null}
                className="focus-marker mono mt-auto self-start border border-ink px-3 py-1.5 text-[0.75rem] transition-colors hover:bg-marker disabled:cursor-not-allowed disabled:border-grid disabled:text-pencil-light"
              >
                {step === qs.length - 1 ? delightSurvey.finish : delightSurvey.next}
              </button>
            </motion.div>
          ) : (
            <motion.div key="done" {...fade(reduced)} className="relative flex h-full flex-col justify-between gap-4">
              {!reduced ? <Confetti run={done} /> : null}
              <div>
                <p className="display-tight m-0 text-[2rem]">
                  <mark className="hl" style={{ "--hl": "100%" } as React.CSSProperties}>
                    {delightSurvey.done}
                  </mark>
                </p>
                <p className="body-serif m-0 mt-2 text-[1rem] text-pencil">{delightSurvey.doneDetail(elapsed)}</p>
              </div>
              <button type="button" onClick={begin} className="focus-marker mono self-start border border-ink px-3 py-1.5 text-[0.75rem] hover:bg-marker">
                {delightSurvey.again}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function fade(reduced: boolean) {
  if (reduced) return { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } };
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: EASE },
  };
}
