import { notFound } from "next/navigation";
import { HandbookPage } from "@/components/handbook-page";
import { BOOKS, loadPage } from "@/lib/handbook";

const BOOK = "cube-handbook";
export const dynamicParams = false;
export const generateStaticParams = () => BOOKS[BOOK].map((ch) => ({ ch }));

export default async function HandbookChapter({ params }: { params: { ch: string } }) {
  if (!BOOKS[BOOK].includes(params.ch)) notFound();
  return <HandbookPage book={BOOK} page={await loadPage(BOOK, params.ch)} engine />;
}
