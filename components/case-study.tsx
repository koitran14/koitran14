import type { CaseStudy as CaseStudyData, Work } from "@/schema/type";
import { Highlight } from "./highlight";
import { StatValue } from "./stat-value";
import { Reveal } from "./reveal";

const label = "font-mono text-xs text-zinc-600 dark:text-zinc-500";
const h2 = "mt-2 text-[28px] sm:text-[32px] leading-tight font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50";
const sans = { fontFamily: "'Space Grotesk', sans-serif" };
// Media breaks out of the 640px text column on wide screens, capped to the viewport.
const breakout = "relative left-1/2 -translate-x-1/2 w-[min(1040px,calc(100vw-48px))]";

/** Image that opens full size in a new tab, so screenshots can be inspected. */
const Zoomable = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <a
    href={src}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open full-size image: ${alt}`}
    className={`group block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 ${className}`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} loading="lazy" className="block w-full transition-transform duration-500 group-hover:scale-[1.02]" />
  </a>
);

/** Hero: hook headline, CTAs, wide screenshot and a ruled stats band. */
export const CaseStudyHero = ({ work, data, meta }: { work: Work; data: CaseStudyData; meta: string }) => (
  <>
    <p className={`mt-8 ${label}`}>{meta}</p>
    <h1 className="mt-3 text-[40px] sm:text-[56px] leading-[1.02] font-semibold tracking-[-0.035em] whitespace-pre-line" style={sans}>
      {data.headline}
    </h1>
    <p className="mt-4 max-w-[560px] text-lg text-zinc-700 dark:text-zinc-400">{data.lead}</p>
    <div className="mt-6 flex flex-wrap gap-2.5">
      <a
        href={work.linkAttached.linkSource}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
      >
        View source ↗
      </a>
      <a
        href="#features"
        className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        See it in action ↓
      </a>
    </div>

    <div className={`mt-10 ${breakout}`}>
      <Reveal zoom delay={0.1}>
        <Zoomable src={work.headingImg} alt={`${work.title} screenshot`} className="shadow-[0_30px_80px_-30px_rgba(59,130,246,0.45)]" />
      </Reveal>
    </div>

    {work.stats && (
      <Reveal delay={0.15}>
      <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800">
        {work.stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col-reverse gap-2 py-5 ${i % 2 ? "pl-5 border-l" : ""} ${i > 0 ? "sm:pl-5 sm:border-l" : ""} ${
              i > 1 ? "border-t sm:border-t-0" : ""
            } border-zinc-200 dark:border-zinc-800`}
          >
            <dt className={label}>{s.label}</dt>
            <StatValue value={s.value} className="text-[40px] sm:text-[48px]" />
          </div>
        ))}
      </dl>
      </Reveal>
    )}
  </>
);

/** Story sections: the gap, how it works, features, results and limits. */
export const CaseStudy = ({ data }: { data: CaseStudyData }) => (
  <>
    <section className="mt-20">
      <Reveal>
        <p className={label}>01 — The gap</p>
        <h2 className={h2} style={sans}>{data.gap.lead}</h2>
      </Reveal>
      <ul className="mt-6 grid sm:grid-cols-2 gap-x-10">
        {data.gap.items.map((g, i) => (
          <li key={g.name} className="border-t border-zinc-200 dark:border-zinc-800 py-3.5">
            <Reveal delay={i * 0.08}>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{g.name}</p>
              <p className="font-mono text-xs text-red-600 dark:text-red-400">{g.issue}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delay={0.2}>
      <p className="mt-4 rounded-r-xl border-l-[3px] border-blue-600 bg-gradient-to-r from-blue-500/15 to-transparent px-5 py-4 text-zinc-800 dark:text-zinc-200">
        <span className="font-medium text-blue-600 dark:text-blue-400">This project →</span> {data.gap.ours}
      </p>
      </Reveal>
    </section>

    <section className="mt-20">
      <Reveal>
        <p className={label}>02 — How it works</p>
        <h2 className={h2} style={sans}>{data.pipeline.lead}</h2>
      </Reveal>
      <ol className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-6">
        {data.pipeline.steps.map((s, i) => {
          const hot = i === 1;
          return (
            <li key={s.title} className="relative pr-4">
              {/* connector line to the next step (desktop row only) */}
              {i < data.pipeline.steps.length - 1 && (
                <span aria-hidden className="hidden sm:block absolute top-[14px] left-9 right-2 h-px bg-gradient-to-r from-blue-500 to-zinc-300 dark:to-zinc-700" />
              )}
              <Reveal delay={i * 0.12}>
              <span
                className={`relative grid h-7 w-7 place-items-center rounded-full font-mono text-xs font-semibold ${
                  hot
                    ? "bg-blue-600 text-white"
                    : "border border-zinc-300 dark:border-zinc-700 bg-[#FAFAFA] dark:bg-[#0A0A0B] text-blue-600 dark:text-blue-400"
                }`}
              >
                {i + 1}
              </span>
              <p className="mt-3 font-medium text-zinc-900 dark:text-zinc-100">{s.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-500">{s.tech}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <Reveal delay={0.1}>
      <figure className="mt-8">
        <pre className="whitespace-pre-wrap break-words rounded-xl border border-zinc-800 bg-[#0D1117] p-5 font-mono text-[13px] leading-[1.75] text-zinc-200">
          <span className="text-zinc-500">{"// real reply, per the contract in lib/prompt.ts\n"}</span>
          <JsonHighlight json={data.pipeline.sample} />
        </pre>
      </figure>
      </Reveal>
    </section>

    <section id="features" className="mt-20 scroll-mt-24">
      <Reveal><p className={label}>03 — Built to feel human</p></Reveal>
      <div className={`mt-6 space-y-14 ${breakout}`}>
        {data.features.map((f, i) => (
          <div key={f.title} className={`grid gap-6 sm:gap-12 items-center ${i % 2 ? "sm:grid-cols-[1fr_1.25fr]" : "sm:grid-cols-[1.25fr_1fr]"}`}>
            <Reveal zoom className={i % 2 ? "sm:order-2" : ""}>
              <Zoomable src={f.image} alt={f.alt} />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-mono text-xs text-blue-600 dark:text-blue-400">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50" style={sans}>{f.title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-700 dark:text-zinc-400"><Highlight text={f.body} marker /></p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-20">
      <Reveal><p className={label}>04 — Results and limits</p></Reveal>
      <div className="mt-6 grid sm:grid-cols-2 gap-10">
        {[
          { title: "What worked", items: data.results.worked, mark: "✓", color: "text-emerald-600 dark:text-emerald-400" },
          { title: "What's next", items: data.results.next, mark: "→", color: "text-amber-600 dark:text-amber-400" },
        ].map((col, ci) => (
          <Reveal key={col.title} delay={ci * 0.12}>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">{col.title}</p>
            <ul className="mt-2">
              {col.items.map((t) => (
                <li key={t} className="flex gap-3 border-t border-zinc-200 dark:border-zinc-800 py-3 text-zinc-700 dark:text-zinc-400">
                  <span aria-hidden className={`font-semibold ${col.color}`}>{col.mark}</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

/** Colours JSON keys and string values; good enough for the short, trusted sample. */
const JsonHighlight = ({ json }: { json: string }) => (
  <>
    {json.split(/("(?:[^"\\]|\\.)*")(\s*:)?/g).map((part, i, arr) => {
      if (i % 3 === 1 && part) return <span key={i} className={arr[i + 1] ? "text-blue-300" : "text-green-300"}>{part}</span>;
      return part;
    })}
  </>
);
