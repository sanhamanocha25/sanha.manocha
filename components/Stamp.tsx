"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Stamp cadence: rows appear instantly, one after the other, like entries
 * being stamped into a ledger. Deliberately not a fade.
 */
export function Stamp({ index, children, className = "", as = "div" }: { index: number; children: ReactNode; className?: string; as?: "div" | "li" | "tr" }) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduced ? false : { opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.01, delay: Math.min(index * 0.045, 0.9) }}
      className={className}
    >
      {children}
    </Tag>
  );
}
