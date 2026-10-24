import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";

// Gate every /blog route (list, post, admin) behind the feature flag.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  if (!FEATURES.blog) notFound();
  return children;
}
