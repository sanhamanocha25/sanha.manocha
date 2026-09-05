"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only once the placeholder scrolls within `margin` of the
 * viewport. Keeps five interactive widgets from loading on first paint.
 */
export function LazyMount({
  children,
  placeholder,
  margin = "480px",
  className = "",
}: {
  children: ReactNode;
  placeholder: ReactNode;
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, margin]);
  return (
    <div ref={ref} className={className}>
      {near ? children : placeholder}
    </div>
  );
}

/** True while the element is on screen and the tab is visible. */
export function useOnScreen<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const update = () => setOn(visible && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref]);
  return on;
}
