import type { ReactNode } from "react";

/**
 * Inner coding-sheet layout used inside a state section: evidence left,
 * analyst's margin right. Collapses to a single column on small screens.
 */
export function Sheet({
  code,
  tag,
  margin,
  children,
  wide,
  className = "",
}: {
  code?: string;
  tag?: string;
  margin?: ReactNode;
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[84rem] px-[var(--gutter)] ${className}`}>
      <div className="grid gap-x-10 gap-y-6 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-x-16 lg:py-24">
        <aside className="lg:order-2 lg:sticky lg:top-20 lg:self-start">
          {code || tag ? (
            <div className="mono flex items-baseline gap-3 text-[0.8rem] text-pencil">
              {code ? (
                <span className="inline-flex items-center gap-1 text-ink">
                  <span aria-hidden className="text-pencil-light">[</span>
                  <span>{code}</span>
                  <span aria-hidden className="text-pencil-light">]</span>
                </span>
              ) : null}
              {tag ? <span className="italic-note text-[0.95rem]">{tag}</span> : null}
            </div>
          ) : null}
          {margin ? <div className="mt-6 hidden lg:block">{margin}</div> : null}
        </aside>
        <div className={`min-w-0 lg:order-1 ${wide ? "" : "measure-wide"}`}>{children}</div>
      </div>
    </div>
  );
}
