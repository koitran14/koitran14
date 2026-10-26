"use client";

import { useEffect, useState } from "react";
import { recordView } from "@/app/(root)/blog/actions";

// counts from the client so link prefetches and server renders never inflate the number
export function useViews(slug: string, initial: number | null = null) {
  const [views, setViews] = useState(initial);

  useEffect(() => {
    const key = `viewed:${slug}`;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(key); // a refresh in the same tab is not a new view
      sessionStorage.setItem(key, "1");
    } catch {}
    // static pages have no server-read number, so a repeat view still fetches it
    if (seen && initial != null) return;
    recordView(slug, !seen).then((n) => n != null && setViews(n));
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return views;
}

export function ViewCount({ slug, initial }: { slug: string; initial: number | null }) {
  const views = useViews(slug, initial);
  if (views == null) return null;
  return <> · {views.toLocaleString("en-US")} {views === 1 ? "view" : "views"}</>;
}
