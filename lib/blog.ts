import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export type PostType = "article" | "note" | "doc";

export type Post = {
  slug: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  /** Missing on posts saved before types existed; those are articles. */
  type?: PostType;
};

// Long-form learning series with their own routes (e.g. /blog/cube-handbook). Listed with the posts, not editable from admin.
export const SERIES = [
  {
    slug: "cube-handbook",
    title: "Cube.dev Engineering Handbook",
    summary: "Từ Semantic Layer đến production, cùng khám phá cách Cube.dev hoạt động qua từng phần, kèm câu hỏi ôn tập cuối mỗi chương để hệ thống lại kiến thức.",
    href: "/blog/cube-handbook",
    createdAt: "2026-10-24T00:00:00.000Z",
    // `key` is the localStorage suffix the handbook stores quiz answers under (ans:<key>); answered = read.
    chapters: [
      "How Cube Works",
      "Fundamentals",
      "Architecture & Internals",
      "Hands-on Implementation",
      "Engineering Deep Dives",
      "Production Engineering",
      "Reference & Engineering Notes",
      "Applied Case Studies",
    ].map((title, i) => {
      const n = String(i).padStart(2, "0");
      return { n, title, key: `ch${n}`, href: `/blog/cube-handbook/${n}` };
    }),
    // ids of the players on the handbook's index page
    media: [
      { kind: "audio" as const, label: "Nghe 15 phút", href: "/blog/cube-handbook#aud" },
      { kind: "video" as const, label: "Xem video", href: "/blog/cube-handbook#vd" },
    ],
  },
  {
    slug: "rea-handbook",
    title: "REA Reverse Engineer Anything",
    summary: "REA nối AI agent với Ghidra, IDA, JADX và nhiều công cụ dịch ngược khác. Handbook đi từ cơ chế hoạt động đến an ninh, pháp lý và cách dùng có trách nhiệm, kèm câu hỏi ôn tập cuối mỗi chương.",
    href: "/blog/rea-handbook",
    createdAt: "2026-10-26T00:00:00.000Z",
    chapters: [
      "Tổng quan nhanh",
      "REA thực chất là gì?",
      "Kiến trúc: AI agent, MCP và các engine",
      "Quy trình: từ bằng chứng đến tái tạo",
      "REA dùng được vào việc gì?",
      "Lợi ích và giới hạn",
      "Rủi ro an ninh",
      "Pháp lý: được phép đến đâu?",
      "REA và làn sóng AI agent",
      "Dùng REA có trách nhiệm",
      "Kết luận và thuật ngữ",
    ].map((title, i) => {
      const n = String(i).padStart(2, "0");
      return { n, title, key: `rea${n}`, href: `/blog/rea-handbook/${n}` };
    }),
    media: [
      { kind: "audio" as const, label: "Nghe 19 phút", href: "/blog/rea-handbook#aud" },
      { kind: "video" as const, label: "Xem video", href: "/blog/rea-handbook#yt" },
    ],
  },
  {
    slug: "ai-product-handbook",
    title: "AI Product Engineering & Management",
    summary: "Dành cho Software Engineer muốn làm sản phẩm AI: tìm đúng vấn đề, thiết kế và đánh giá hệ thống AI, đo lường, kinh tế và rủi ro, rồi ghép lại trong một dự án. Mỗi chương kèm video liên quan và câu hỏi ôn tập.",
    href: "/blog/ai-product-handbook",
    createdAt: "2026-10-26T12:00:00.000Z",
    chapters: [
      "Lộ trình học",
      "Product Thinking & Lifecycle",
      "Problem Discovery & User Research",
      "Market Research & Opportunity",
      "Product Design & UX cho AI",
      "Vision, Strategy & Positioning",
      "Requirements & Roadmapping",
      "AI & LLM Fundamentals",
      "AI System Architecture",
      "AI Evaluation & Responsible AI",
      "Product Analytics",
      "Launch, Adoption & Growth",
      "Product Economics",
      "Risk & Governance",
      "Stakeholders & Communication",
      "Advanced Product Strategy",
      "Product Management Glossary",
      "AI Engineering Glossary",
      "Builder & FDE Glossary",
      "Frameworks Cheat Sheet",
      "Documentation Reference",
      "Capstone: từ vấn đề đến launch",
    ].map((title, i) => {
      const n = String(i).padStart(2, "0");
      return { n, title, key: `aip${n}`, href: `/blog/ai-product-handbook/${n}` };
    }),
    media: [{ kind: "audio" as const, label: "Nghe 8 audio", href: "/blog/ai-product-handbook#aud" }],
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
