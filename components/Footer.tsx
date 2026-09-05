import Link from "next/link";
import { colophon, meta, writing } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-14 pt-10">
      <div className="rule" />
      <div className="mono flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-5 text-[0.75rem] text-pencil">
        <span>{meta.footer}</span>
        <Link href="/notes" className="focus-marker border-b border-grid pb-0.5 no-underline hover:border-ink hover:text-ink">
          {writing.heading.toLowerCase()}
        </Link>
        <span>{colophon}</span>
      </div>
    </footer>
  );
}
