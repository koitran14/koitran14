import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/ui/gallery";
import { StatList } from "@/components/stat-value";
import { Reveal } from "@/components/reveal";
import { CaseStudy, CaseStudyHero } from "@/components/case-study";
import { fieldLabel, splitTitle, works } from "@/data/works";

const sorted = [...works].sort((a, b) => b.publishYear - a.publishYear);

const OWNER = "Trần Ngọc Đăng Khôi";
// Vietnamese names are family-name first: initials = family + given name ("Trần … Khôi" -> "TK")
const initials = (name: string) => {
  const w = name.trim().split(/\s+/);
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
};

export const generateStaticParams = () => works.map(({ id }) => ({ pageID: id }));

const label = "text-xl font-semibold tracking-[-0.01em] text-zinc-950 dark:text-zinc-50 mb-4";

export default function WorkPage({ params }: { params: { pageID: string } }) {
  const idx = sorted.findIndex((w) => w.id === params.pageID);
  if (idx < 0) notFound();
  const work = sorted[idx];
  const { name, tagline } = splitTitle(work.title);
  // owner first, then teammates in data order
  const team = work.author.split(",").map((m) => m.trim()).sort((a, b) => Number(b === OWNER) - Number(a === OWNER));
  const prev = sorted[idx - 1], next = sorted[idx + 1];
  const youtube = work.demoVideo?.includes("youtube") ? work.demoVideo.replace("watch?v=", "embed/") : null;

  return (
    <article className="py-8 pb-24">
      <Link href="/works" className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        ← Works
      </Link>

      {work.caseStudy ? (
        <CaseStudyHero
          work={work}
          data={work.caseStudy}
          meta={`${work.publishYear} · ${tagline || fieldLabel(work.field)} · ${work.platform}`}
        />
      ) : (
        <>
        <p className="mt-8 text-xs font-mono text-zinc-600 dark:text-zinc-500">
          {work.publishYear} · {fieldLabel(work.field)} · {work.platform}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {name}
        </h1>
        {tagline && <p className="mt-1 text-zinc-700 dark:text-zinc-400">{tagline}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          {work.linkAttached.linkdemo && (
            <a
              href={work.linkAttached.linkdemo}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
            >
              Live demo ↗
            </a>
          )}
          <a
            href={work.linkAttached.linkSource}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Source ↗
          </a>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.headingImg}
          alt={`${name} screenshot`}
          className="mt-8 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
        />

        {work.stats && <StatList stats={work.stats} size="text-[32px] sm:text-[40px]" className="mt-8 !grid-cols-2 sm:!grid-cols-4" />}
        </>
      )}

      <Reveal>
      <dl className="mt-8 border-b border-zinc-200 dark:border-zinc-800 text-sm">
        <div className="grid sm:grid-cols-[120px_minmax(0,1fr)] gap-2 sm:gap-4 border-t border-zinc-200 dark:border-zinc-800 py-4">
          <dt className="text-zinc-600 dark:text-zinc-500">{team.length > 1 ? `Team · ${team.length}` : "Team"}</dt>
          <dd>
            {team.length > 1 ? (
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                {team.map((m) => (
                  <li key={m} className="flex items-center gap-2.5 min-w-0">
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[11px] font-medium ${
                        m === OWNER
                          ? "bg-blue-600 text-white dark:bg-blue-500"
                          : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {initials(m)}
                    </span>
                    <span className="truncate text-zinc-800 dark:text-zinc-200">{m}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-zinc-800 dark:text-zinc-200">Solo project</span>
            )}
          </dd>
        </div>
        <div className="grid sm:grid-cols-[120px_minmax(0,1fr)] gap-2 sm:gap-4 border-t border-zinc-200 dark:border-zinc-800 py-4">
          <dt className="text-zinc-600 dark:text-zinc-500">Stack</dt>
          <dd className="flex flex-wrap gap-1.5">
            {work.stack.split(",").map((s) => (
              <span key={s} className="font-mono text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                {s.trim()}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      </Reveal>

      {work.caseStudy ? (
        <CaseStudy data={work.caseStudy} />
      ) : (
        <Reveal as="section" className="mt-12">
          <h2 className={label}>Overview</h2>
          <p className="text-zinc-700 dark:text-zinc-400 leading-relaxed">{work.description}</p>
        </Reveal>
      )}

      {work.demoVideo && (
        <Reveal as="section" className="mt-12">
          <h2 className={label}>Demo</h2>
          {youtube ? (
            <iframe
              src={youtube}
              title={`${name} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
            />
          ) : (
            <video controls className="w-full rounded-lg">
              <source src={work.demoVideo} type="video/mp4" />
            </video>
          )}
        </Reveal>
      )}

      {work.images.length > 0 && (
        <Reveal as="section" className="mt-12">
          <h2 className={label}>Screenshots</h2>
          <Gallery images={work.images} />
        </Reveal>
      )}

      <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-sm">
        {prev ? (
          <Link href={`/works/${prev.id}`} className="group">
            <span className="block text-xs text-zinc-600 dark:text-zinc-500">← Previous</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {splitTitle(prev.title).name}
            </span>
          </Link>
        ) : <span />}
        {next && (
          <Link href={`/works/${next.id}`} className="group text-right">
            <span className="block text-xs text-zinc-600 dark:text-zinc-500">Next →</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {splitTitle(next.title).name}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
