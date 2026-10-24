import { notFound } from "next/navigation";
import { HandbookPage } from "@/components/handbook-page";
import { CHAPTERS, loadPage } from "@/lib/handbook";

export const dynamicParams = false;
export const generateStaticParams = () => CHAPTERS.map((ch) => ({ ch }));

export default async function HandbookChapter({ params }: { params: { ch: string } }) {
  if (!CHAPTERS.includes(params.ch)) notFound();
  return <HandbookPage page={await loadPage(params.ch)} engine />;
}
