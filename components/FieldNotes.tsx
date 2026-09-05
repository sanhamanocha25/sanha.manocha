"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { writing } from "@/content/site";
import { Section } from "@/components/Section";
import { PostRow } from "@/components/PostRow";
import { sortedPosts } from "@/lib/posts";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

/** Home-page preview of the notes feed. Full feed lives at /notes. */
export function FieldNotes() {
  const reduced = usePrefersReducedMotion();
  const posts = sortedPosts();
  const latest = posts.slice(0, 3);

  return (
    <Section id={writing.id} code={writing.code} tag={writing.tag} heading={writing.heading} wide>
      {latest.length === 0 ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 40, rotate: 0.8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative max-w-[46rem] border border-ink bg-paper-deep p-7 md:p-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent calc(1.7em - 1px), rgba(21,23,27,0.10) calc(1.7em - 1px), rgba(21,23,27,0.10) 1.7em)",
            backgroundOrigin: "content-box",
          }}
        >
          <p className="mono absolute right-4 top-3 text-[0.7rem] text-pencil">index card · blank</p>
          <div className="body-serif space-y-[1.7em] text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.7]">
            {writing.note.map((p, i) => (
              <p key={i}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      ) : (
        <div>
          {latest.map((p, i) => (
            <PostRow key={p.slug} post={p} index={i} />
          ))}
        </div>
      )}

      <p className="mono mt-10 text-[0.8rem]">
        <Link href="/notes" className="focus-marker border-b border-ink pb-0.5 no-underline hover:bg-marker">
          {posts.length ? `all field notes (${posts.length})` : "the field notes feed"}
        </Link>
      </p>
    </Section>
  );
}
