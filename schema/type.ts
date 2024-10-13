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
