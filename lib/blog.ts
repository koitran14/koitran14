import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export type Post = {
  slug: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
};

// Long-form learning series built as static, interactive pages under public/learn. Listed with the posts, not editable from admin.
export const SERIES = [
  {
    slug: "cube-handbook",
    title: "Cube.dev Engineering Handbook",
    category: "Learning",
    href: "/learn/cube-handbook/index.html",
    createdAt: "2026-10-24T00:00:00.000Z",
  },
];

// shortcut: posts live in a local JSON file, which does not persist on Vercel; move to a DB before deploying the blog.
const FILE = path.join(process.cwd(), "data", "posts.json");

export async function getPosts(): Promise<Post[]> {
  try {
    const posts: Post[] = JSON.parse(await fs.readFile(FILE, "utf-8"));
    return posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (e: any) {
    if (e.code === "ENOENT") return [];
    throw e;
  }
}

export async function savePosts(posts: Post[]) {
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2) + "\n");
}

export function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const ADMIN_COOKIE = "blog_admin";

function sha(s: string) {
  return createHash("sha256").update(s).digest();
}

export function adminToken() {
  const secret = process.env.ADMIN_PASSWORD;
  return secret ? createHmac("sha256", secret).update("blog-admin").digest("hex") : null;
}

export function checkPassword(input: string) {
  const secret = process.env.ADMIN_PASSWORD;
  return !!secret && timingSafeEqual(sha(input), sha(secret));
}

export function isAdmin() {
  const token = adminToken();
  const value = cookies().get(ADMIN_COOKIE)?.value;
  return !!token && !!value && timingSafeEqual(sha(value), sha(token));
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
