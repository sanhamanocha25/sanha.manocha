"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { benchLabels, feedLabels } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useOnScreen } from "@/components/LazyMount";

type Mark = { id: number; w: number; tone: 0 | 1 | 2 };

// Deterministic pseudo-random so the stream looks the same for everyone.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const QUARTER_MS = 12000;
const MAX = 16;

/**
 * Bench 01 — feedback read as it arrives vs once a quarter. Abstract marks
 * only; every mark is a shape, not a piece of text.
 */
export default function Feed() {
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(hostRef);
  const [mode, setMode] = useState<"live" | "quarterly">("live");
  const [marks, setMarks] = useState<Mark[]>([]);
  const [received, setReceived] = useState(0);
  const [readLive, setReadLive] = useState(0);
  const [readQuarter, setReadQuarter] = useState(0);
  const [sinceQuarter, setSinceQuarter] = useState(0);
  const rand = useRef(rng(7));
  const idRef = useRef(0);

  // Static illustration under reduced motion: no timers.
  useEffect(() => {
    if (!reduced) return;
    const r = rng(3);
    const list: Mark[] = Array.from({ length: 9 }, () => ({
      id: ++idRef.current,
      w: 30 + Math.round(r() * 60),
      tone: Math.floor(r() * 3) as 0 | 1 | 2,
    }));
    setMarks(list);
    setReceived(9);
    setReadLive(9);
    setReadQuarter(0);
  }, [reduced]);

  // Seed the stream so it never starts empty.
  useEffect(() => {
    if (reduced) return;
    const r = rng(5);
    const list: Mark[] = Array.from({ length: 6 }, () => ({
      id: ++idRef.current,
      w: 30 + Math.round(r() * 60),
      tone: Math.floor(r() * 3) as 0 | 1 | 2,
    }));
    setMarks(list);
    setReceived(6);
    setReadLive(6);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !onScreen) return;
    const arrive = window.setInterval(() => {
      const r = rand.current;
      const m: Mark = { id: ++idRef.current, w: 30 + Math.round(r() * 60), tone: Math.floor(r() * 3) as 0 | 1 | 2 };
      setMarks((prev) => [m, ...prev].slice(0, MAX));
      setReceived((n) => n + 1);
      setReadLive((n) => n + 1);
    }, 800 + Math.round(rand.current() * 500));
    const tick = window.setInterval(() => setSinceQuarter((t) => t + 250), 250);
    return () => {
      window.clearInterval(arrive);
      window.clearInterval(tick);
    };
  }, [reduced, onScreen]);

  // The quarterly reader catches up only when the quarter ends.
  useEffect(() => {
    if (sinceQuarter >= QUARTER_MS) {
      setReadQuarter(received);
      setSinceQuarter(0);
    }
  }, [sinceQuarter, received]);

  const live = mode === "live";
  const read = live ? readLive : readQuarter;
  const backlog = Math.max(0, received - read);
  const quarterPct = Math.min(100, Math.round((sinceQuarter / QUARTER_MS) * 100));

  return (
    <div ref={hostRef} className="flex h-full flex-col gap-4 p-4 md:p-5">
      <div className="mono flex flex-wrap items-center justify-between gap-2 text-[0.7rem]">
        <div role="group" aria-label="Reading mode" className="flex border border-ink">
          {(["live", "quarterly"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`focus-marker px-2.5 py-1 transition-colors ${mode === m ? "bg-ink text-paper" : "text-ink hover:bg-marker"}`}
            >
              {m === "live" ? feedLabels.live : feedLabels.quarterly}
            </button>
          ))}
        </div>
        <span className="text-pencil tabular-nums">
          {feedLabels.received} {String(received).padStart(3, "0")} · {feedLabels.read} {String(read).padStart(3, "0")}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1fr_auto] gap-4">
        {/* Stream */}
        <ul aria-hidden className="m-0 flex list-none flex-col gap-1.5 overflow-hidden p-0">
          <AnimatePresence initial={false}>
            {marks.map((m, i) => {
              const isRead = live || i >= backlog;
              return (
                <motion.li
                  key={m.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span className={`h-[0.55rem] w-[0.55rem] shrink-0 border border-ink ${isRead ? "bg-marker" : "bg-transparent"}`} />
                  <span
                    className={`h-[0.45rem] ${isRead ? "bg-ink" : "border border-dashed border-pencil-light"}`}
                    style={{ width: `${m.w}%`, opacity: isRead ? 0.85 - m.tone * 0.2 : 0.7 }}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Quarter clock */}
        <div className="mono flex w-[6.5rem] flex-col items-stretch justify-between text-[0.65rem] text-pencil">
          <span>{live ? "read on arrival" : feedLabels.waiting}</span>
          <div className="relative h-full min-h-[6rem] w-3 self-center border border-ink">
            <div
              className="absolute bottom-0 left-0 right-0 bg-marker transition-[height] duration-200"
              style={{ height: `${reduced ? 35 : quarterPct}%` }}
              aria-hidden
            />
          </div>
          <span className="tabular-nums">{live ? "backlog 000" : `backlog ${String(backlog).padStart(3, "0")}`}</span>
        </div>
      </div>
      <p className="mono m-0 text-[0.62rem] text-pencil-light">{benchLabels.illustration}</p>
    </div>
  );
}
