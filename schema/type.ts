export interface ImageType {
  href: string;
  alt?: string;
}

export interface Field {
  href?: string;
  id: string;
}

export interface Work {
  id: string;
  title: string;
  author: string;
  description: string;
  headingImg: string;
  stack: string;
  linkAttached: attachedLink;
  platform: string;
  field: string;
  newest?: boolean;
  publishYear: number;
  images: Image[];
  demoVideo?: string;
  /** Measured results shown on the detail page, e.g. from an evaluation. */
  stats?: { value: string; label: string }[];
  /** Structured story that replaces the plain Overview on the detail page. */
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  /** Hero hook shown instead of the plain title; "
" breaks the line. */
  headline: string;
  lead: string;
  /** Card image used in lists (falls back to headingImg). */
  cover?: string;
  gap: { lead: string; items: { name: string; issue: string }[]; ours: string };
  pipeline: { lead: string; steps: { title: string; tech: string }[]; sample: string };
  /** `**phrase**` in body is shown with a marker highlight. */
  features: { title: string; body: string; image: string; alt: string }[];
  results: { worked: string[]; next: string[] };
}

interface attachedLink {
  linkdemo?: string;
  linkSource: string;
  SourceTitle: string;
}

interface Image {
  alt: string;
  href: string;
}
