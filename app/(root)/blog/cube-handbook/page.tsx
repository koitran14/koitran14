import { HandbookPage } from "@/components/handbook-page";
import { loadPage } from "@/lib/handbook";

export default async function HandbookHub() {
  return <HandbookPage page={await loadPage("index")} engine={false} />;
}
