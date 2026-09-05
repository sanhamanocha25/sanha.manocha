"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/content/site";
import { Section } from "@/components/Section";
import { usePrefersReducedMotion } from "@/lib/motion";

type Piece = { text: string; code?: string };

/** Split a paragraph around the highlight phrases (exact match, first occurrence). */
function splitParagraph(text: string, highlights: { phrase: string; code: string }[]): Piece[] {
  const found = highlights
    .map((h) => ({ ...h, at: text.indexOf(h.phrase) }))
    .filter((h) => h.at >= 0)
    .sort((a, b) => a.at - b.at);
  const pieces: Piece[] = [];
  let cursor = 0;
  for (const h of found) {
    if (h.at < cursor) continue; // overlapping — skip
    if (h.at > cursor) pieces.push({ text: text.slice(cursor, h.at) });
    pieces.push({ text: h.phrase, code: h.code });
    cursor = h.at + h.phrase.length;
  }
  if (cursor < text.length) pieces.push({ text: text.slice(cursor) });
  return pieces;
}

export function About() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeCodes, setActiveCodes] = useState<Set<string>>(() => new Set());

  const paragraphs = useMemo(
    () => about.paragraphs.map((p) => splitParagraph(p, about.highlights)),
    [],
  );
  const codes = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    about.highlights.forEach((h) => {
      if (about.paragraphs.some((p) => p.includes(h.phrase)) && !seen.has(h.code)) {
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
        const tag = m.nextElementSibling as HTMLElement | null;
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
    <Section
      id={about.id}
      code={about.code}
      tag={about.tag}
      heading={about.heading}
      margin={
        <div>
          <p className="mono mb-3 text-[0.7rem] text-pencil-light">codes applied</p>
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
                  <span className={on ? "text-ink" : "text-pencil-light"}>{c}</span>
                </li>
              );
            })}
          </ul>
        </div>
      }
    >
      <div ref={rootRef} className="space-y-8">
        {paragraphs.map((pieces, pi) => (
          <div key={pi} className="grid grid-cols-[2.5rem_1fr] gap-x-2 sm:grid-cols-[3rem_1fr] sm:gap-x-4">
            <span aria-hidden className="mono pt-[0.45rem] text-[0.7rem] text-pencil-light">
              ¶ {String(pi + 1).padStart(2, "0")}
            </span>
            <p className="body-serif m-0 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.6]">
              {pieces.map((piece, i) =>
                piece.code ? (
                  <span key={i} className="whitespace-normal">
                    <mark className="hl" data-code={piece.code}>
                      {piece.text}
                    </mark>
                    <span
                      aria-hidden
                      className="mono ml-1 align-super text-[0.6rem] text-pencil transition-opacity duration-300"
                      style={{ opacity: reduced ? 1 : 0.4 }}
                    >
                      {piece.code}
                    </span>
                  </span>
                ) : (
                  <span key={i}>{piece.text}</span>
                ),
              )}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
