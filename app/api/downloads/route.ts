import { NextResponse } from "next/server";
import { getDownloads, incrementView } from "@/lib/views";
import SKILLS from "@/lib/aiph-skills.json";

// Download counts for the AI Product handbook's Claude skills (the zips under public/learn/ai-product-handbook/skills).
const BOOK = "ai-product-handbook";

export async function GET() {
  return NextResponse.json(await getDownloads(BOOK));
}

export async function POST(req: Request) {
  const { file } = await req.json().catch(() => ({}));
  // only zips that actually ship can be counted, so the endpoint never creates arbitrary rows
  if (typeof file !== "string" || !SKILLS.includes(file)) return NextResponse.json({ error: "unknown file" }, { status: 400 });
  await incrementView(`download/${BOOK}/${file}`);
  return NextResponse.json(await getDownloads(BOOK));
}
