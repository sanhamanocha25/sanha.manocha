"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A term with a plain-language tooltip. Hover on desktop, tap on touch,
 * focus + Enter/Space on keyboard. Renders inline inside running text.
 */
export function Gloss({ term, gloss, children }: { term: string; gloss: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <button
      ref={ref}
      type="button"
      className="gloss"
      aria-expanded={open}
      aria-label={`${term}: ${gloss}`}
      onClick={() => setOpen((o) => !o)}
    >
      {children ?? term}
      <span className="gloss-tip" role="tooltip" aria-hidden>
        {gloss}
      </span>
    </button>
  );
}
