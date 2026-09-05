"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { work } from "@/content/site";
import { Section } from "@/components/Section";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

/** Tally marks: groups of five with a diagonal strike, the way evidence is counted by hand. */
function Tally({ count, total }: { count: number; total: number }) {
  const groups: number[] = [];
  for (let n = total; n > 0; n -= 5) groups.push(Math.min(5, n));
  let drawn = 0;
  return (
    <svg
      viewBox={`0 0 ${groups.length * 62} 44`}
      className="h-11 w-auto max-w-full"
      role="img"
      aria-label={`${count} of ${total} points in view`}
    >
      {groups.map((size, gi) => {
        const ox = gi * 62 + 6;
        const marks = [];
        for (let i = 0; i < size; i++) {
          const idx = drawn++;
          const on = idx < count;
          if (i < 4) {
            const x = ox + i * 11;
            marks.push(
              <motion.line
                key={i}
                x1={x}
                y1={6}
                x2={x - 1}
                y2={38}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.18 }}
                transition={{ duration: 0.35, ease: EASE }}
              />,
            );
          } else {
            marks.push(
              <motion.line
                key={i}
                x1={ox - 6}
                y1={34}
                x2={ox + 40}
                y2={8}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.18 }}
                transition={{ duration: 0.45, ease: EASE }}
              />,
            );
          }
        }
        return <g key={gi}>{marks}</g>;
      })}
    </svg>
  );
}

export function CurrentWork() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section id={work.id} code={work.code} tag={work.tag} heading={work.heading} wide>
      <div className="space-y-20">
        {work.roles.map((role) => (
          <Role key={role.title + role.when} role={role} reduced={reduced} />
        ))}
      </div>
    </Section>
  );
}

function Role({ role, reduced }: { role: (typeof work.roles)[number]; reduced: boolean }) {
  const [seen, setSeen] = useState<boolean[]>(() => role.points.map(() => reduced));
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (reduced) {
      setSeen(role.points.map(() => true));
      return;
    }
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll("li"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number((e.target as HTMLElement).dataset.idx);
          setSeen((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        });
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.2 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced, role.points]);

  const count = seen.filter(Boolean).length;

  return (
    <div className="grid gap-x-12 gap-y-10 md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)]">
      {/* Pinned role header */}
      <div className="md:sticky md:top-24 md:self-start">
        <h3 className="display-tight text-[1.45rem] md:text-[1.6rem]">{role.title}</h3>
        <p className="body-serif mt-2 text-[0.98rem] text-pencil">{role.org}</p>
        <p className="mono mt-3 text-[0.75rem] text-pencil">{role.when}</p>

        <div className="mt-8 text-ink">
          <Tally count={count} total={role.points.length} />
          <p className="mono mt-2 text-[0.72rem] text-pencil" aria-hidden>
            evidence · {String(count).padStart(2, "0")} / {String(role.points.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* The evidence, one line at a time */}
      <ol ref={listRef} className="m-0 list-none p-0">
        {role.points.map((pt, i) => (
          <motion.li
            key={i}
            data-idx={i}
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-[2.4rem_1fr] gap-x-3 border-t border-grid py-5 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-x-4"
          >
            <span className="mono pt-[0.35rem] text-[0.72rem] text-pencil">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="body-serif m-0 text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.6]">{pt}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
