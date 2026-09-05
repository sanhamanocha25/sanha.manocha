"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { questionLabels, questionPanel, role, roleHighlights } from "@/content/site";
import { StateBand } from "@/components/StateBand";
import { PanelGroupView } from "@/components/Panel";
import { Provenance } from "@/components/Provenance";
import { Coded } from "@/components/Coded";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

/**
 * QUESTION — the role, plotted. A panel of unit marks fills in as each of
 * the seven statements scrolls past. In NOTICE words get highlighted; here
 * the numbers get plotted.
 */
export function Question() {
  const reduced = usePrefersReducedMotion();
  const [seen, setSeen] = useState<boolean[]>(() => role.points.map(() => false));
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (reduced) {
      setSeen(role.points.map(() => true));
      return;
    }
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("li[data-idx]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number(e.target.getAttribute("data-idx"));
          setSeen((prev) => (prev[idx] ? prev : prev.map((v, i) => (i === idx ? true : v))));
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  const lit = seen.filter(Boolean).length;

  return (
    <section id="question" aria-labelledby="question-heading" className="grid-tight scroll-mt-14">
      <div id="question-heading" className="sr-only">
        Question
      </div>
      <StateBand state="question" tag="right now" />

      <div className="mx-auto max-w-[84rem] px-[var(--gutter)] py-14 md:py-20 lg:py-24">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(19rem,24rem)_minmax(0,1fr)]">
          {/* The panel — pinned on large screens */}
          <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start">
            <div className="border border-ink bg-paper p-5">
              <div className="mono flex items-baseline justify-between text-[0.7rem]">
                <span className="text-ink">{questionLabels.panelTitle}</span>
                <span className="text-pencil tabular-nums">
                  {String(lit).padStart(2, "0")} / {String(role.points.length).padStart(2, "0")} statements
                </span>
              </div>
              <p className="italic-note mt-1 text-[0.85rem] leading-[1.4] text-pencil">{questionLabels.panelHint}</p>
              <div className="mt-4">
                {questionPanel.map((g) => (
                  <PanelGroupView key={g.id} group={g} active={seen[g.point] ?? false} />
                ))}
              </div>
            </div>
          </aside>

          {/* The statements */}
          <div className="min-w-0">
            <header className="mb-10">
              <h3 className="display-tight m-0 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">{role.title}</h3>
              <p className="body-serif m-0 mt-2 text-[1rem] text-pencil">{role.org}</p>
              <p className="mono m-0 mt-2 text-[0.75rem] text-pencil">{role.when}</p>
            </header>
            <ol ref={listRef} className="m-0 list-none p-0">
              {role.points.map((pt, i) => {
                const groups = questionPanel.filter((g) => g.point === i);
                return (
                  <motion.li
                    key={i}
                    data-idx={i}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="grid grid-cols-[2.4rem_1fr] gap-x-3 border-t border-grid py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr] sm:gap-x-4"
                  >
                    <span className={`mono pt-[0.4rem] text-[0.72rem] transition-colors duration-300 ${seen[i] ? "text-ink" : "text-pencil"}`}>
                      ¶ {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <Coded
                        text={pt}
                        highlights={roleHighlights[i] ?? []}
                        keyPrefix={`q${i}`}
                        className="body-serif m-0 text-[clamp(1.05rem,1rem+0.3vw,1.2rem)] leading-[1.6]"
                      />
                      {/* Inline panel groups for small screens */}
                      {groups.length ? (
                        <div className="mt-4 max-w-[26rem] border border-ink bg-paper p-4 lg:hidden">
                          {groups.map((g) => (
                            <PanelGroupView key={g.id} group={g} active={seen[i] ?? false} />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <Provenance />
    </section>
  );
}
