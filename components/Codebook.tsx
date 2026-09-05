import { education, recognition, toolkit } from "@/content/site";
import { Section } from "@/components/Section";
import { Stamp } from "@/components/Stamp";

export function Education() {
  return (
    <Section id={education.id} code={education.code} tag={education.tag} heading={education.heading} compact>
      <ol className="m-0 list-none p-0">
        {education.items.map((item, i) => (
          <Stamp
            key={item.degree}
            as="li"
            index={i}
            className="grid gap-x-8 gap-y-1 border-t border-grid py-6 first:border-t-0 first:pt-0 md:grid-cols-[9rem_minmax(0,1fr)]"
          >
            <p className="mono m-0 text-[0.78rem] text-pencil md:pt-1">{item.meta}</p>
            <div>
              <h3 className="display-tight m-0 text-[1.3rem] md:text-[1.45rem]">{item.degree}</h3>
              <p className="body-serif m-0 mt-1 text-[0.98rem] text-pencil">{item.school}</p>
              {item.thesis ? (
                <p className="italic-note m-0 mt-3 border-l border-ink pl-4 text-[1rem] leading-[1.5] text-pencil">
                  {item.thesis}
                </p>
              ) : null}
            </div>
          </Stamp>
        ))}
      </ol>
    </Section>
  );
}

export function Toolkit() {
  let running = 0;
  return (
    <Section id={toolkit.id} code={toolkit.code} tag={toolkit.tag} heading={toolkit.heading} compact wide>
      <div className="space-y-10">
        {toolkit.groups.map((group) => {
          const start = running;
          running += group.items.length;
          return (
            <div key={group.label} className="grid gap-x-8 gap-y-3 md:grid-cols-[9rem_minmax(0,1fr)]">
              <h3 className="italic-note m-0 text-[1rem] text-pencil md:pt-1">{group.label}</h3>
              <ol className="mono m-0 grid list-none grid-cols-1 gap-x-6 p-0 text-[0.85rem] xs:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <Stamp
                    key={item}
                    as="li"
                    index={start + i}
                    className="flex items-baseline gap-3 border-t border-grid py-2"
                  >
                    <span className="text-pencil-light">{String(start + i + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{item}</span>
                  </Stamp>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function Recognition() {
  return (
    <Section id={recognition.id} code={recognition.code} tag={recognition.tag} heading={recognition.heading} compact>
      <ul className="m-0 list-none p-0">
        {recognition.items.map((r, i) => (
          <Stamp
            key={r.name}
            as="li"
            index={i}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-t border-grid py-3 first:border-t-0 first:pt-0 sm:flex-nowrap"
          >
            <span className="body-serif text-[1rem] md:text-[1.05rem]">{r.name}</span>
            <span aria-hidden className="hidden min-w-4 flex-1 border-b border-dotted border-pencil-light sm:block" />
            <span className="mono text-[0.75rem] text-pencil">{r.org}</span>
          </Stamp>
        ))}
      </ul>
    </Section>
  );
}
