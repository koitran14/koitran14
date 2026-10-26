import { HandbookPage } from "@/components/handbook-page";
import { loadPage } from "@/lib/handbook";

export default async function HandbookHub() {
  return <HandbookPage book="ai-product-handbook" page={await loadPage("ai-product-handbook", "index")} engine={false} />;
}
