"use client";

import { bench } from "@/content/site";

/** Bench 05 — in progress. A cursor, and nothing more. */
export default function Platform() {
  const entry = bench.find((b) => b.id === "platform");
  return (
    <div className="flex h-full flex-col justify-between p-4 md:p-5">
      <div className="mono text-[0.7rem] text-pencil">{entry?.status ?? "in progress"}</div>
      <div className="mono flex items-center gap-1 text-[1.4rem]">
        <span className="text-pencil-light">&gt;</span>
        <span aria-hidden className="cursor-blink inline-block h-[1.2em] w-[0.6em] bg-ink" />
      </div>
      <div className="grid grid-cols-6 gap-1" aria-hidden>
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} className={`h-1.5 border border-grid ${i < 5 ? "bg-marker border-ink" : ""}`} />
        ))}
      </div>
    </div>
  );
}
