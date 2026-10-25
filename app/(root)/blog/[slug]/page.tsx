import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { formatDate, getPosts, isAdmin } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = (await getPosts()).find((p) => p.slug === params.slug);
  if (!post || (!post.published && !isAdmin())) notFound();

  return (
    <article className="py-8 pb-24">
      <Link href="/blog" className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
        ← Notes
      </Link>
      <Reveal>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {post.title}
        </h1>
        <time className="mt-2 block text-sm text-zinc-600 dark:text-zinc-500" dateTime={post.createdAt}>
          {formatDate(post.createdAt)}
          {!post.published && " · Draft"}
        </time>
      </Reveal>
      {/* shortcut: plain text with paragraph breaks, no markdown; add a markdown renderer if posts need formatting. */}
      <div className="mt-8 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {post.content.split(/\n\s*\n/).map((para, i) => (
          // first paragraphs stagger in under the title; the rest reveal on scroll
          <Reveal key={i} delay={0.08 + Math.min(i, 3) * 0.06}>
            <p className="whitespace-pre-wrap">{para}</p>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
