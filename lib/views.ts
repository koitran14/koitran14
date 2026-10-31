import "server-only";

// shortcut: raw PostgREST calls instead of supabase-js; switch if we ever need auth or realtime.
async function supabase(path: string, init?: RequestInit) {
  const { SUPABASE_URL: url, SUPABASE_ANON_KEY: key } = process.env;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers: { apikey: key, "Content-Type": "application/json" },
      cache: "no-store",
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null; // a counter outage must never break the post page
  }
}

export async function getViews(slug: string): Promise<number | null> {
  const rows = await supabase(`post_views?slug=eq.${encodeURIComponent(slug)}&select=views`);
  return rows ? Number(rows[0]?.views ?? 0) : null;
}

/** Every counted page, keyed by slug: posts as "<slug>", handbook chapters as "<book>/<chapter>". */
export async function getAllViews(): Promise<Record<string, number> | null> {
  const rows: { slug: string; views: number }[] | null = await supabase("post_views?select=slug,views");
  return rows && Object.fromEntries(rows.map((r) => [r.slug, Number(r.views)]));
}

/** A whole handbook's views: the sum over its chapters. */
export function bookViews(all: Record<string, number>, book: string) {
  return Object.entries(all).reduce((sum, [slug, n]) => (slug.startsWith(`${book}/`) ? sum + n : sum), 0);
}

/** File downloads share the views table under "download/<book>/<file>"; returns each file's count and the sum. */
export async function getDownloads(book: string): Promise<{ total: number; files: Record<string, number> } | null> {
  const prefix = `download/${book}/`;
  const rows: { slug: string; views: number }[] | null = await supabase(`post_views?slug=like.${encodeURIComponent(prefix)}*&select=slug,views`);
  if (!rows) return null;
  const files = Object.fromEntries(rows.map((r) => [r.slug.slice(prefix.length), Number(r.views)]));
  return { total: Object.values(files).reduce((a, b) => a + b, 0), files };
}

export async function incrementView(slug: string): Promise<number | null> {
  const n = await supabase("rpc/increment_view", { method: "POST", body: JSON.stringify({ p_slug: slug }) });
  return n == null ? null : Number(n);
}
