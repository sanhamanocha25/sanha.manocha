"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { codeGloss } from "@/content/site";
import { Gloss } from "@/components/Gloss";
import { glossText } from "@/lib/gloss";
import { usePrefersReducedMotion } from "@/lib/motion";

export type Highlight = { phrase: string; code: string };
type Piece = { text: string; code?: string };

/** Split text around highlight phrases (exact, first occurrence, non-overlapping). */
export function splitHighlights(text: string, highlights: Highlight[]): Piece[] {
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
 * A paragraph being coded. Highlighter strokes sweep under the phrases as
 * they scroll into the reading zone; the code stamps in beside each one and
 * explains itself on hover. This is the page's one recurring gesture.
 */
export function Coded({
  text,
  highlights,
  className = "",
  as: Tag = "p",
  onToggle,
  gloss = true,
  keyPrefix = "c",
}: {
  text: string;
  highlights: Highlight[];
  className?: string;
  as?: "p" | "span" | "dd";
  /** notified when a code turns on/off (used by the NOTICE codebook) */
  onToggle?: (code: string, on: boolean) => void;
  /** wrap glossary terms inside the text */
  gloss?: boolean;
  keyPrefix?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pieces = useMemo(() => splitHighlights(text, highlights), [text, highlights]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>("mark.hl"));
    if (!marks.length) return;
    if (reduced) {
      marks.forEach((m) => {
        m.style.setProperty("--hl", "100%");
        onToggle?.(m.dataset.code ?? "", true);
      });
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
                onToggle?.(code, on);
              },
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, onToggle, pieces]);

  const render = (t: string, k: string): ReactNode => (gloss ? glossText(t, k) : t);

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {pieces.map((piece, i) =>
        piece.code ? (
          <span key={i}>
            <mark className="hl" data-code={piece.code}>
              {render(piece.text, `${keyPrefix}-${i}`)}
            </mark>
            <span data-tag className="mono ml-1 align-super text-[0.6rem] text-pencil transition-opacity duration-300" style={{ opacity: reduced ? 1 : 0.4 }}>
              {codeGloss[piece.code] ? <Gloss term={piece.code} gloss={codeGloss[piece.code]} /> : piece.code}
            </span>
          </span>
        ) : (
          <span key={i}>{render(piece.text, `${keyPrefix}-${i}`)}</span>
        ),
      )}
    </Tag>
  );
}
