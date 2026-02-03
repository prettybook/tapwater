export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readingTime: number;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQ[];
  image?: string;
  imageAlt?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  image?: string;
  imageAlt?: string;
}
