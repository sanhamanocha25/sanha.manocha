import type { ReactNode } from "react";
import { glossary } from "@/content/site";
import { Gloss } from "@/components/Gloss";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest terms first so "concept and claims tests" wins over shorter overlaps.
const TERMS = Object.keys(glossary).sort((a, b) => b.length - a.length);
const RE = TERMS.length ? new RegExp(`(${TERMS.map(escapeRe).join("|")})`, "g") : null;

/** Wrap glossary terms inside a plain string with <Gloss> tooltips. */
export function glossText(text: string, keyPrefix = "g"): ReactNode[] {
  if (!RE) return [text];
  const parts = text.split(RE);
  return parts.map((part, i) =>
    glossary[part] !== undefined ? (
      <Gloss key={`${keyPrefix}-${i}`} term={part} gloss={glossary[part]} />
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    ),
  );
}
