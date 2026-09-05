import type { ReactNode } from "react";

type Props = {
  id: string;
  code: string;
  tag: string;
  heading: string;
  children: ReactNode;
  /** Extra content rendered in the right-hand margin under the code. */
  margin?: ReactNode;
  className?: string;
  /** Let the content column stretch instead of holding a reading measure. */
  wide?: boolean;
  /** Tighter vertical rhythm for the ledger-like sections. */
  compact?: boolean;
};

/**
 * The coding-sheet layout: evidence on the left, analyst's margin on the right.
 * On small screens the margin collapses into a single line above the content.
 */
export function Section({ id, code, tag, heading, children, margin, className = "", wide, compact }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`relative scroll-mt-16 ${className}`}>
      <div className="mx-auto max-w-[84rem] px-[var(--gutter)]">
        <div className="rule" />
        <div
          className={`grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-x-16 ${
            compact ? "py-12 md:py-16 lg:py-20" : "py-14 md:py-20 lg:py-28"
          }`}
        >
          {/* Margin: mobile first (above), desktop right column */}
          <aside className="lg:order-2 lg:self-start lg:sticky lg:top-20">
            <div className="mono flex items-baseline gap-3 text-[0.8rem] text-pencil">
              <span className="inline-flex items-center gap-1 text-ink">
                <span aria-hidden className="text-pencil-light">[</span>
                <span>{code}</span>
                <span aria-hidden className="text-pencil-light">]</span>
              </span>
              <span className="italic-note text-[0.95rem]">{tag}</span>
            </div>
            {margin ? <div className="mt-6 hidden lg:block">{margin}</div> : null}
          </aside>

          <div className="min-w-0 lg:order-1">
            <h2
              id={`${id}-heading`}
              className={`display ${compact ? "text-[clamp(2rem,1.4rem+2.6vw,3.4rem)]" : "text-[clamp(2.4rem,1.6rem+4vw,5rem)]"}`}
            >
              {heading}
            </h2>
            <div className={`${compact ? "mt-8 md:mt-10" : "mt-10 md:mt-14"} ${wide ? "" : "measure-wide"}`}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
