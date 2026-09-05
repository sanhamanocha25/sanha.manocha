"use client";

import { useCallback, useMemo, useState } from "react";
import { bioParagraphs, codeGloss, currentlyCurious, noticeHighlights, whereThisLeads } from "@/content/site";
import { StateBand } from "@/components/StateBand";
import { Sheet } from "@/components/Sheet";
import { Gloss } from "@/components/Gloss";
import { Coded } from "@/components/Coded";

/** NOTICE: the bio as a transcript being coded, with the codebook in the margin. */
export function Notice() {
  const [activeCodes, setActiveCodes] = useState<Set<string>>(() => new Set());
  const paragraphs = useMemo(() => [...bioParagraphs, whereThisLeads], []);
  const codes = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    noticeHighlights.forEach((h) => {
      if (paragraphs.some((p) => p.includes(h.phrase)) && !seen.has(h.code)) {
        seen.add(h.code);
        list.push(h.code);
      }
    });
    return list;
  }, [paragraphs]);

  const onToggle = useCallback((code: string, on: boolean) => {
    setActiveCodes((prev) => {
      if (prev.has(code) === on) return prev;
      const next = new Set(prev);
      if (on) next.add(code);
      else next.delete(code);
      return next;
    });
  }, []);

  return (
    <section id="notice" aria-labelledby="notice-heading" className="grid-loose scroll-mt-14">
      <div id="notice-heading" className="sr-only">
        Notice
      </div>
      <StateBand state="notice" tag="who I am" />
      <Sheet
        code="ii"
        tag="transcript, coded"
        margin={
          <div>
            <p className="mono mb-3 text-[0.7rem] text-pencil-light">codes applied · hover for meaning</p>
            <ul className="mono space-y-1.5 text-[0.75rem]">
              {codes.map((c) => {
                const on = activeCodes.has(c);
                return (
                  <li key={c} className="flex items-center gap-2">
                    <span aria-hidden className={`inline-block h-[0.55rem] w-[0.55rem] border border-ink transition-colors duration-200 ${on ? "bg-marker" : "bg-transparent"}`} />
                    <span className={on ? "text-ink" : "text-pencil-light"}>{codeGloss[c] ? <Gloss term={c} gloss={codeGloss[c]} /> : c}</span>
                  </li>
                );
              })}
            </ul>
            {currentlyCurious.length ? (
              <div className="mt-8">
                <p className="mono mb-3 text-[0.7rem] text-pencil-light">currently curious about</p>
                <ul className="body-serif space-y-1 text-[0.95rem]">
                  {currentlyCurious.map((c) => (
                    <li key={c} className="border-l border-ink pl-3">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        }
      >
        <div className="space-y-9">
          {paragraphs.map((text, pi) => (
            <div key={pi} className="grid grid-cols-[2.5rem_1fr] gap-x-2 sm:grid-cols-[3rem_1fr] sm:gap-x-4">
              <span aria-hidden className="mono pt-[0.5rem] text-[0.7rem] text-pencil-light">
                ¶ {String(pi + 1).padStart(2, "0")}
              </span>
              <Coded
                text={text}
                highlights={noticeHighlights}
                onToggle={onToggle}
                keyPrefix={`n${pi}`}
                className="body-serif m-0 text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] leading-[1.6]"
              />
            </div>
          ))}
        </div>
      </Sheet>
    </section>
  );
}
