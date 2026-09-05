"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { meta, nav, states } from "@/content/site";

const STATE_IDS = ["notice", "question", "test"] as const;

export function Masthead() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");

  // Track which section is in view so the nav and state strip mark it.
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = [
      ...nav.map((n) => n.href).filter((h) => h.startsWith("/#")).map((h) => h.slice(2)),
    ];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-[var(--gutter)] py-3">
        <Link
          href="/"
          className="display-tight shrink-0 whitespace-nowrap text-[1.05rem] no-underline"
          aria-label={`${meta.name} — home`}
        >
          {meta.name}
        </Link>

        {/* State strip — which of the three minds is on screen */}
        {isHome ? (
          <ol aria-label="Current state" className="mono hidden items-center gap-1 text-[0.7rem] text-pencil md:flex">
            {STATE_IDS.map((id, i) => (
              <li key={id} className="flex items-center gap-1">
                <span
                  className={`px-1.5 py-0.5 transition-colors duration-300 ${
                    active === id ? "bg-marker text-ink" : ""
                  }`}
                >
                  {states[id].word.toLowerCase()}
                </span>
                {i < STATE_IDS.length - 1 ? <span aria-hidden>·</span> : null}
              </li>
            ))}
          </ol>
        ) : null}

        <nav aria-label="Site" className="no-scrollbar -mr-[var(--gutter)] overflow-x-auto pr-[var(--gutter)]">
          <ul className="mono flex items-center gap-x-5 text-[0.78rem] leading-none">
            {nav.map((item) => {
              const isNotes = item.href === "/notes";
              const current =
                (isNotes && pathname.startsWith("/notes")) ||
                (!isNotes && isHome && item.href === `/#${active}`);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={current ? "true" : undefined}
                    className={`focus-marker inline-block py-2 no-underline transition-colors duration-200 ${
                      current ? "text-ink underline decoration-marker decoration-[3px] underline-offset-4" : "text-pencil hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
