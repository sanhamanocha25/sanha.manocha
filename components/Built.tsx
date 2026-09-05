"use client";

import { useRef, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { made } from "@/content/site";
import { Section } from "@/components/Section";
import { EASE, useCanHover, usePrefersReducedMotion } from "@/lib/motion";

type Project = (typeof made.projects)[number];

/**
 * Specimen card. On hover-capable devices the description sits in pencil
 * until a circular lens, following the cursor, reveals the inked version and
 * marks the tags — the way you'd examine evidence with a loupe.
 */
function Specimen({ project, index, span }: { project: Project; index: number; span: boolean }) {
  const canHover = useCanHover();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lens = canHover && !reduced;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--lr", "150px");
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--lr", "0px");
  };

  const fromRight = index % 2 === 1;
  const id = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      onPointerMove={lens ? onMove : undefined}
      onPointerLeave={lens ? onLeave : undefined}
      initial={reduced ? false : { clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.08 }}
      className={`relative -mt-px border border-ink bg-paper ${lens ? "lens-card" : ""} ${
        span ? "md:col-span-2" : ""
      } md:-ml-px`}
      style={{ "--lr": "0px", "--mx": "50%", "--my": "50%" } as React.CSSProperties}
      aria-labelledby={`spec-${id}`}
    >
      <CardBody project={project} id={id} variant={lens ? "pencil" : "ink"} />

      {lens ? (
        <>
          {/* The lens: inked duplicate clipped to a circle around the cursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-paper-deep transition-[clip-path] duration-300 ease-out"
            style={{ clipPath: "circle(var(--lr) at var(--mx) var(--my))" }}
          >
            <CardBody project={project} id={id} variant="lens" />
          </div>
          {/* Reticle drawn at the cursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full border border-ink transition-[opacity,transform] duration-300 ease-out"
            style={{
              transform: `translate(calc(var(--mx) - 50%), calc(var(--my) - 50%)) scale(calc(var(--lr) / 150px))`,
              opacity: `calc(var(--lr) / 150px)`,
            }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 -translate-y-full bg-ink" />
            <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 translate-y-full bg-ink" />
            <span className="absolute left-0 top-1/2 h-px w-2 -translate-x-full -translate-y-1/2 bg-ink" />
            <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 translate-x-full bg-ink" />
          </div>
        </>
      ) : null}
    </motion.article>
  );
}

function CardBody({ project, id, variant }: { project: Project; id: string; variant: "ink" | "pencil" | "lens" }) {
  const isLens = variant === "lens";
  const isPencil = variant === "pencil";
  const textColor = isPencil ? "text-pencil" : "text-ink";
  const Name = project.href ? "a" : "span";
  return (
    <div className="flex h-full flex-col gap-6 p-6 md:p-8">
      <div className="mono flex items-baseline justify-between gap-4 text-[0.72rem]">
        <span className={isLens ? "bg-marker px-1 text-ink" : "text-pencil"}>spec. {id}</span>
        <span className="italic-note text-[0.9rem] text-pencil">{project.status}</span>
      </div>
      <h3 id={isLens ? undefined : `spec-${id}`} className="display-tight text-[1.6rem] md:text-[1.9rem]">
        <Name
          {...(project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer", className: "underline decoration-grid underline-offset-4 hover:decoration-ink" } : {})}
        >
          {project.name}
        </Name>
      </h3>
      <p className={`body-serif m-0 max-w-[36rem] text-[1rem] leading-[1.6] md:text-[1.05rem] ${textColor}`}>
        {project.description}
      </p>
      <ul className="mono mt-auto flex flex-wrap gap-x-2 gap-y-1.5 pt-2 text-[0.72rem]">
        {project.tags.map((t) => (
          <li
            key={t}
            className={`border px-1.5 py-0.5 ${
              isLens ? "border-ink bg-marker text-ink" : "border-grid text-pencil"
            }`}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Built() {
  const n = made.projects.length;
  return (
    <Section id={made.id} code={made.code} tag={made.tag} heading={made.heading} wide>
      <p className="italic-note measure mb-12 text-[clamp(1.05rem,1rem+0.3vw,1.3rem)] leading-[1.5] text-pencil">
        {made.lede}
      </p>
      <div className="grid md:grid-cols-2">
        {made.projects.map((p, i) => (
          <Specimen key={p.name} project={p} index={i} span={n % 2 === 1 && i === n - 1} />
        ))}
      </div>
    </Section>
  );
}
