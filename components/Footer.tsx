import { colophon, meta } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-14 pt-10">
      <div className="rule" />
      <div className="mono flex flex-wrap items-baseline justify-between gap-3 pt-5 text-[0.75rem] text-pencil">
        <span>{meta.footer}</span>
        <span>{colophon}</span>
      </div>
    </footer>
  );
}
