import { HandbookPage } from "@/components/handbook-page";
import { loadPage } from "@/lib/handbook";

export default async function HandbookHub() {
  return <HandbookPage book="cube-handbook" page={await loadPage("cube-handbook", "index")} engine={false} />;
}
