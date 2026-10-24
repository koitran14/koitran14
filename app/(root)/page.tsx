"use client";

import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Section from "@/components/section";
import { ArrowUpRight, Box, Github, Linkedin, Mail } from "lucide-react";
import { BioDesc, BioSection, BioYear } from "@/components/bio";
import dynamic from "next/dynamic";
import { useRef } from "react";
import useContactHook from "@/hooks/useContactHook";
import { experiences } from "@/data/experience";
import { Highlight } from "@/components/highlight";
import { StatList } from "@/components/stat-value";
import { Reveal } from "@/components/reveal";
import { FEATURES } from "@/lib/features";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PersonalCard = dynamic(
  () => import("@/components/personal-card").then((m) => ({ default: m.PersonalCard })),
  { ssr: false }
);

const skills = [
  ["AI / LLM", "Claude API, MCP, Claude Code plugins, AWS Bedrock, OpenAI API, agent design"],
  ["Languages", "TypeScript, JavaScript, Python, SQL, Java"],
  ["Frameworks", "Node.js, NestJS, Next.js, React, Prisma, Airflow, Tailwind CSS"],
  ["Data & Cloud", "PostgreSQL, MongoDB, Supabase, AWS (ECS, S3), Docker, GitLab CI/CD"],
];

const projects = [
  { name: "Real-Time 3D AI Assistant", meta: "Thesis · 94/100", desc: "A 3D AI host that holds unscripted voice conversations in the browser, with no install, GPU or headset.", href: "/works/3d-ai-assistant", img: "/images/works/3d-ai-assistant/cover.jpg" },
  { name: "NetBot", meta: "2025", desc: "Natural-language ordering chatbot for internet cafés, parsed with ANTLR4 grammars.", href: "https://youtu.be/L75SCaAraMw", img: "https://img.youtube.com/vi/L75SCaAraMw/hqdefault.jpg" },
  { name: "Sketcha", meta: "2024", desc: "Real-time collaborative whiteboard.", href: "/works/whiteboard-project", img: "/images/works/whiteboard-project/thumbnail.png" },
  { name: "IU Blackboard", meta: "2024", desc: "Course management system for students and instructors.", href: "/works/iu-blackboard", img: "/images/works/iu-blackboard/image.png" },
];

// Writes the pointer position, relative to the [data-spot] layer inside the hovered card,
// as CSS vars so the spotlight gradient follows it without re-rendering.
const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const spot = e.currentTarget.querySelector<HTMLElement>("[data-spot]");
  if (!spot) return;
  const r = spot.getBoundingClientRect();
  spot.style.setProperty("--x", `${e.clientX - r.left}px`);
  spot.style.setProperty("--y", `${e.clientY - r.top}px`);
};

const socials = [
  { label: "GitHub", value: "@koitran14", href: "https://github.com/koitran14", icon: Github },
  { label: "LinkedIn", value: "in/koitran14", href: "https://linkedin.com/in/koitran14", icon: Linkedin },
];

export default function Home() {
  const { onOpen } = useContactHook();
  // The card canvas ignores pointer events (it overlaps the text); the hero forwards them.
  const heroRef = useRef<HTMLElement>(null!);

  return (
    <Section delay={0}>
      <div className="py-8 space-y-2">
        {/* Hero: text left, the lanyard card hangs from the navbar on the right */}
        <header
          ref={heroRef}
          className="relative grid md:grid-cols-[minmax(0,1fr)_220px] gap-4 md:gap-8 items-center"
        >
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">AI Software Engineer · Saigon</p>
            <Heading as="h1" variant="page-title">Tran Ngoc Dang Khoi</Heading>
            <p className="mt-4 text-zinc-700 dark:text-zinc-400">
              I build AI agent platforms and production automation — from LLM integration
              (Claude, AWS Bedrock, MCP) to backend services, data pipelines and real-time frontends.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-[440px] -mt-12">
            {/* wider and taller than the column so a dragged card isn't clipped */}
            <PersonalCard
              eventSource={heroRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] max-w-[100vw] pointer-events-none z-10"
            />
            <p className="absolute bottom-0 inset-x-0 text-center text-xs text-zinc-500 dark:text-zinc-400 select-none pointer-events-none">
              drag me
            </p>
          </div>
        </header>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Experience</Heading>
          <Accordion type="multiple" defaultValue={[experiences[0].slug]}>
            {experiences.map((exp) => (
              <AccordionItem key={exp.slug} value={exp.slug} className="border-b-0 border-t border-zinc-200 dark:border-zinc-800 py-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {exp.title}{" "}
                    <a
                      href={exp.companyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                    >
                      @ {exp.shortCompany}
                    </a>
                  </h3>
                  <span className="text-xs text-zinc-600 dark:text-zinc-500 font-mono shrink-0">{exp.shortPeriod}</span>
                </div>
                {exp.stats.length > 0 && (
                  <StatList stats={exp.stats} size="text-[40px] sm:text-[52px]" className="mt-5" />
                )}
                <AccordionTrigger className="justify-start gap-1 py-0 mt-3 font-normal text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:no-underline">
                  Summary
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-400 list-disc pl-4 marker:text-zinc-300 dark:marker:text-zinc-700">
                    {exp.summary.map((p) => <li key={p}><Highlight text={p} /></li>)}
                  </ul>
                  <NextLink
                    href={`/experience/${exp.slug}`}
                    className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                  >
                    Read the full story →
                  </NextLink>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Selected projects</Heading>
          <ul className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => {
              const body = (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 transition-colors group-hover:border-blue-500/50">
                    {/* glow that tracks the pointer across the thumbnail */}
                    <div
                      aria-hidden
                      data-spot
                      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                      style={{ background: "radial-gradient(180px circle at var(--x) var(--y), rgba(59,130,246,0.18), transparent 70%)" }}
                    />
                    {p.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.img}
                        alt={`${p.name} screenshot`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      // no screenshot for the thesis: show its score instead of an empty frame
                      <div className="h-full w-full flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                        <Box className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                        <span className="mt-2 font-mono text-2xl font-medium">94/100</span>
                        <span className="text-xs">graduation thesis</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.name}
                      {p.href && <ArrowUpRight className="inline h-3.5 w-3.5 ml-1 -mt-0.5 opacity-50" />}
                    </span>
                    <span className="text-xs font-mono text-zinc-600 dark:text-zinc-500 shrink-0">{p.meta}</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-400 mt-1">{p.desc}</p>
                </>
              );
              return (
                <li key={p.name} onPointerMove={trackPointer} className="relative">
                  {p.href ? (
                    <NextLink href={p.href} className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
                      {body}
                    </NextLink>
                  ) : (
                    <div className="group">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <NextLink href="/works" className="inline-block mt-4 text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            All works →
          </NextLink>
        </Reveal>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Skills</Heading>
          <dl className="space-y-3 text-sm">
            {skills.map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[140px_1fr] gap-1">
                <dt className="text-zinc-600 dark:text-zinc-500">{k}</dt>
                <dd className="text-zinc-700 dark:text-zinc-300">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Education</Heading>
          <BioSection>
            <BioYear>2021 — 2025</BioYear>
            <BioDesc>B.Sc. Computer Science, International University — VNU-HCM.</BioDesc>
          </BioSection>
          <BioSection>
            <BioYear>2018 — 2021</BioYear>
            <BioDesc>Tien Giang High School for the Gifted.</BioDesc>
          </BioSection>
        </Reveal>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Outside work</Heading>
          <p className="text-zinc-700 dark:text-zinc-400">
            Art, music, <Link as={NextLink} href="/gallery">photography</Link>
            {FEATURES.blog ? (
              <>, Pokémon — and occasionally <Link as={NextLink} href="/blog">writing</Link>.</>
            ) : (
              <> and Pokémon.</>
            )}
          </p>
        </Reveal>

        <Reveal as="section">
          <Heading as="h2" variant="section-title">Contact</Heading>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="h-4 w-4" /> tndkhoi.work@gmail.com
            </button>
            {socials.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Icon className="h-4 w-4" /> {value}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
