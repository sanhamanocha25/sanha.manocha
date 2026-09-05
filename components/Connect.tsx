"use client";

import { motion } from "framer-motion";
import { connect, connectText } from "@/content/site";
import { Section } from "@/components/Section";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

export function Connect() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section id={connect.id} code={connect.code} tag={connect.tag} heading={connect.heading} wide>
      <p className="body-serif measure m-0 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.6]">{connectText}</p>
      <ul className="m-0 mt-12 list-none p-0">
        {connect.links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            className="border-t border-ink py-5 last:border-b"
          >
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="display group block break-all text-[clamp(1.5rem,0.8rem+3.4vw,4.2rem)] no-underline"
            >
              <span className="bg-[linear-gradient(var(--color-marker),var(--color-marker))] bg-[length:0%_45%] bg-[position:0_80%] bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_45%] group-focus-visible:bg-[length:100%_45%]">
                {l.label}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
