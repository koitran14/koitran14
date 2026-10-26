import { HandbookPage } from "@/components/handbook-page";
import { loadPage } from "@/lib/handbook";

export default async function HandbookHub() {
  return <HandbookPage book="rea-handbook" page={await loadPage("rea-handbook", "index")} engine={false} />;
}
