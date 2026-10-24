import Link from "next/link";
import { SERIES, formatDate, getPosts, isAdmin } from "@/lib/blog";
import { togglePublished } from "./actions";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const admin = isAdmin();
  const posts = [
    ...(await getPosts()).filter((p) => admin || p.published).map((p) => ({ ...p, href: `/blog/${p.slug}`, category: undefined as string | undefined })),
    ...SERIES.map((s) => ({ ...s, published: true, content: "" })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="py-8 pb-24">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Blog
        </h1>
        {admin && (
          <Link href="/blog/admin" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            + New post
          </Link>
        )}
      </div>
      <p className="mt-2 text-zinc-700 dark:text-zinc-400">Notes on AI agents, engineering and things I learn along the way.</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-zinc-600 dark:text-zinc-500">No posts yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {posts.map((post) => {
            const label = (
              <>
                {post.category && (
                  <span className="mr-2 text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">{post.category}</span>
                )}
                <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </span>
                {!post.published && <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">Draft</span>}
              </>
            );
            return (
            <li key={post.slug} className="flex items-baseline gap-4 py-4">
              {/* series are static files in public/, so they need a full page load instead of client routing */}
              {post.category ? (
                <a href={post.href} className="flex-1 group">{label}</a>
              ) : (
                <Link href={post.href} className="flex-1 group">{label}</Link>
              )}
              <time className="text-xs text-zinc-600 dark:text-zinc-500 tabular-nums shrink-0" dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
              {admin && !post.category && (
                <form action={togglePublished.bind(null, post.slug)}>
                  <button className="text-xs text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-2">
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
              )}
            </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
