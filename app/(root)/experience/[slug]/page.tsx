import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/data/experience";
import { Highlight } from "@/components/highlight";
import { StatList } from "@/components/stat-value";
import { Reveal } from "@/components/reveal";

export const generateStaticParams = () => experiences.map(({ slug }) => ({ slug }));

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) notFound();

  return (
    <article className="py-8 pb-24">
      <Link href="/" className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        ← Back
      </Link>

      <p className="mt-8 text-xs font-mono text-zinc-600 dark:text-zinc-500">{exp.period} · {exp.location}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <a href={exp.companyLink} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {exp.company}
        </a>
      </h1>
      <p className="mt-1 text-zinc-700 dark:text-zinc-400">{exp.title}</p>

      {exp.stats.length > 0 && (
        <Reveal delay={0.1}><StatList stats={exp.stats} size="text-[40px] sm:text-[48px]" className="mt-10" /></Reveal>
      )}

      <div className="mt-10">
        {exp.stories.map((story) => (
          <Reveal as="section" key={story.title} className="border-t border-zinc-200 dark:border-zinc-800 py-6">
            <h2 className="font-medium text-zinc-900 dark:text-zinc-100">{story.title}</h2>
            {/* the evidence for this story's claims, right where they're made */}
            {story.stats && <StatList stats={story.stats} size="text-[28px]" className="mt-4" />}
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-400">
              {story.body.map((p) => <p key={p}><Highlight text={p} /></p>)}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal as="section" className="mt-6">
        <h2 className="text-xl font-semibold tracking-[-0.01em] text-zinc-950 dark:text-zinc-50 mb-4">Toolkit</h2>
        <dl>
          {exp.toolkit.map((t) => (
            <div key={t.group} className="grid sm:grid-cols-[140px_minmax(0,1fr)] gap-2 sm:gap-4 border-t border-zinc-200 dark:border-zinc-800 py-4">
              <dt className="text-sm text-zinc-600 dark:text-zinc-500">{t.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {t.items.map((i) => (
                    <li key={i} className="font-mono text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-500">{t.usedFor}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </article>
  );
}
