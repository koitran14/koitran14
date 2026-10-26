"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, adminToken, checkPassword, getPosts, isAdmin, savePosts, slugify, type PostType } from "@/lib/blog";
import { BOOKS } from "@/lib/handbook";
import { getViews, incrementView } from "@/lib/views";

export async function login(_: string | null, form: FormData) {
  if (!checkPassword(String(form.get("password") ?? ""))) return "Wrong password.";
  cookies().set(ADMIN_COOKIE, adminToken()!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/blog/admin");
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/blog");
}

export async function createPost(_: string | null, form: FormData) {
  if (!isAdmin()) return "Not authorized.";
  const title = String(form.get("title") ?? "").trim();
  const content = String(form.get("content") ?? "").trim();
  if (!title || !content) return "Title and content are required.";

  const posts = await getPosts();
  let slug = slugify(title) || "post";
  if (posts.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString(36)}`;

  const type = String(form.get("type") ?? "article");
  if (!["article", "note", "doc"].includes(type)) return "Unknown post type.";

  posts.push({ slug, title, content, type: type as PostType, published: form.get("published") === "on", createdAt: new Date().toISOString() });
  await savePosts(posts);
  revalidatePath("/blog");
  redirect(`/blog/${slug}`);
}

// only real slugs (published posts, or "<book>/<chapter>") are touched so nobody can fill the table with junk rows
export async function recordView(slug: string, count = true) {
  const [book, ch] = slug.split("/");
  const known = ch
    ? Object.hasOwn(BOOKS, book) && BOOKS[book].includes(ch)
    : (await getPosts()).find((p) => p.slug === slug)?.published;
  if (!known) return null;
  return count ? incrementView(slug) : getViews(slug);
}

export async function togglePublished(slug: string) {
  if (!isAdmin()) return;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return;
  post.published = !post.published;
  await savePosts(posts);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}
