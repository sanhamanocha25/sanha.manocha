import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main id="main" className="mx-auto max-w-[84rem] px-[var(--gutter)] pb-24 pt-20 md:pt-32">
        <p className="mono text-[0.8rem] text-pencil">404 · no entry on file</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,1.6rem+4vw,5rem)]">This page isn&apos;t in the notes.</h1>
        <p className="mono mt-10 text-[0.85rem]">
          <Link href="/" className="focus-marker border-b border-ink pb-0.5 no-underline hover:bg-marker">
            back to the transcript
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
