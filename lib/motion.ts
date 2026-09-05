"use client";

import { useEffect, useState } from "react";

/** True when the OS asks for reduced motion. Safe on the server (false). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True on devices with a fine pointer that can hover (i.e. not touch). */
export function useCanHover(): boolean {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCan(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return can;
}

/** True when the viewport matches the given media query. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Shared easing: a firm, editorial ease. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Roman numeral → integer, for ordering margin codes if ever needed. */
export function romanToInt(s: string): number {
  const map: Record<string, number> = { i: 1, v: 5, x: 10, l: 50, c: 100 };
  let total = 0;
  const str = s.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    const cur = map[str[i]] ?? 0;
    const next = map[str[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}
