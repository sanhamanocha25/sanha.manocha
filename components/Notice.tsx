"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bioParagraphs, codeGloss, currentlyCurious, noticeHighlights, whereThisLeads } from "@/content/site";
import { StateBand } from "@/components/StateBand";
import { Sheet } from "@/components/Sheet";
import { Gloss } from "@/components/Gloss";
import { glossText } from "@/lib/gloss";
import { usePrefersReducedMotion } from "@/lib/motion";

type Piece = { text: string; code?: string };

function splitParagraph(text: string, highlights: { phrase: string; code: string }[]): Piece[] {
  const found = highlights
    .map((h) => ({ ...h, at: text.indexOf(h.phrase) }))
    .filter((h) => h.at >= 0)
    .sort((a, b) => a.at - b.at);
  const pieces: Piece[] = [];
  let cursor = 0;
  for (const h of found) {
    if (h.at < cursor) continue;
    if (h.at > cursor) pieces.push({ text: text.slice(cursor, h.at) });
    pieces.push({ text: h.phrase, code: h.code });
    cursor = h.at + h.phrase.length;
  }
  if (cursor < text.length) pieces.push({ text: text.slice(cursor) });
  return pieces;
}

/**
 * NOTICE — the bio as a transcript being coded. Highlighter strokes are
 * scrubbed by scroll; margin codes stamp in; each code explains itself.
 */
export function Notice() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCodes, setActiveCodes] = useState<Set<string>>(() => new Set());

  const paragraphs = useMemo(() => {
    const all = [...bioParagraphs, whereThisLeads];
    return all.map((p) => splitParagraph(p, noticeHighlights));
  }, []);

  const codes = useMemo(() => {
    const all = [...bioParagraphs, whereThisLeads];
    const seen = new Set<string>();
    const list: string[] = [];
    noticeHighlights.forEach((h) => {
      if (all.some((p) => p.includes(h.phrase)) && !seen.has(h.code)) {
        seen.add(h.code);
        list.push(h.code);
      }
    });
    return list;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>("mark.hl"));
    if (reduced) {
      marks.forEach((m) => m.style.setProperty("--hl", "100%"));
      setActiveCodes(new Set(codes));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      marks.forEach((m) => {
        const code = m.dataset.code ?? "";
        const tag = m.parentElement?.querySelector<HTMLElement>("[data-tag]") ?? null;
        gsap.fromTo(
          m,
          { "--hl": "0%" },
          {
            "--hl": "100%",
            ease: "none",
            scrollTrigger: {
              trigger: m,
              start: "top 82%",
              end: "top 52%",
              scrub: 0.4,
              onUpdate: (self) => {
                const on = self.progress > 0.55;
                if (tag) tag.style.opacity = on ? "1" : "0.4";
                setActiveCodes((prev) => {
                  if (prev.has(code) === on) return prev;
                  const next = new Set(prev);
                  if (on) next.add(code);
                  else next.delete(code);
                  return next;
                });
              },
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, codes]);

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
                    <span
                      aria-hidden
                      className={`inline-block h-[0.55rem] w-[0.55rem] border border-ink transition-colors duration-200 ${
                        on ? "bg-marker" : "bg-transparent"
                      }`}
                    />
                    <span className={on ? "text-ink" : "text-pencil-light"}>
                      {codeGloss[c] ? <Gloss term={c} gloss={codeGloss[c]} /> : c}
                    </span>
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
        <div ref={rootRef} className="space-y-9">
          {paragraphs.map((pieces, pi) => (
            <div key={pi} className="grid grid-cols-[2.5rem_1fr] gap-x-2 sm:grid-cols-[3rem_1fr] sm:gap-x-4">
              <span aria-hidden className="mono pt-[0.5rem] text-[0.7rem] text-pencil-light">
                ¶ {String(pi + 1).padStart(2, "0")}
              </span>
              <p className="body-serif m-0 text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] leading-[1.6]">
                {pieces.map((piece, i) =>
                  piece.code ? (
                    <span key={i}>
                      <mark className="hl" data-code={piece.code}>
                        {piece.text}
                      </mark>
                      <span
                        data-tag
                        className="mono ml-1 align-super text-[0.6rem] text-pencil transition-opacity duration-300"
                        style={{ opacity: reduced ? 1 : 0.4 }}
                      >
                        {codeGloss[piece.code] ? (
                          <Gloss term={piece.code} gloss={codeGloss[piece.code]} />
                        ) : (
                          piece.code
                        )}
                      </span>
                    </span>
                  ) : (
                    <span key={i}>{glossText(piece.text, `n${pi}-${i}`)}</span>
                  ),
                )}
              </p>
            </div>
          ))}
        </div>
      </Sheet>
    </section>
  );
}
