import type { RichSegment } from "@client/content/types";
import type { LegalBlock, LegalDoc, LegalSection } from "@client/content/legal/types";

// Renderer genérico de un LegalDoc. No conoce ningún documento en concreto, así
// que sirve igual para la política de Colombia y para la futura de España.

/** Fragmentos con resaltado, mismo idioma visual que Nosotros.tsx. */
function RichText({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-primary">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-muted-foreground leading-relaxed">
          <RichText segments={block.text} />
        </p>
      );

    case "list":
      return (
        <ul className="list-disc pl-5 space-y-2 marker:text-accent text-muted-foreground leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText segments={item} />
            </li>
          ))}
        </ul>
      );

    case "defs":
      return (
        <dl className="space-y-4">
          {block.items.map((item, i) => (
            <div key={i}>
              <dt className="font-semibold text-primary">{item.term}</dt>
              <dd className="text-muted-foreground leading-relaxed">
                <RichText segments={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

function Section({ section, level }: { section: LegalSection; level: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    // Los id se conservan aunque ya no haya índice visible: los enlaces
    // profundos compartidos (#sec-10) tienen que seguir funcionando.
    <section id={section.id} className="scroll-mt-24">
      <Heading
        className={
          level === 2
            ? "text-xl sm:text-2xl font-bold text-primary mb-4"
            : "text-lg font-bold text-primary mb-3"
        }
      >
        <span className="text-accent">{section.number}.</span> {section.title}
      </Heading>

      <div className="space-y-4">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {section.children && (
        <div className="mt-8 space-y-8 sm:pl-4 sm:border-l sm:border-border">
          {section.children.map((child) => (
            <Section key={child.id} section={child} level={3} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <article className="max-w-4xl mx-auto bg-white rounded-2xl border p-6 sm:p-10 shadow-sm print:border-0 print:shadow-none print:p-0">
      <div className="space-y-12">
        {doc.sections.map((section) => (
          <Section key={section.id} section={section} level={2} />
        ))}
      </div>

      <p className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
        {doc.footnote}
      </p>
    </article>
  );
}
