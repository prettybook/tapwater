import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta, FAQ } from './types';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content/blog');

interface FrontMatter {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  author?: string;
  image?: string;
  imageAlt?: string;
  faqs?: FAQ[];
}

/**
 * Get all blog posts for the listing page
 * Returns posts sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(BLOG_CONTENT_PATH, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const frontMatter = data as FrontMatter;

    const slug = file.replace('.md', '');

    posts.push({
      slug,
      title: frontMatter.title,
      excerpt: frontMatter.excerpt,
      category: frontMatter.category,
      date: frontMatter.date,
      readingTime: frontMatter.readingTime,
      image: frontMatter.image,
      imageAlt: frontMatter.imageAlt,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontMatter = data as FrontMatter;

  return {
    slug,
    title: frontMatter.title,
    metaTitle: frontMatter.metaTitle,
    metaDescription: frontMatter.metaDescription,
    excerpt: frontMatter.excerpt,
    category: frontMatter.category,
    date: frontMatter.date,
    readingTime: frontMatter.readingTime,
    author: frontMatter.author,
    image: frontMatter.image,
    imageAlt: frontMatter.imageAlt,
    faqs: frontMatter.faqs,
    content: content.trim(),
  };
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''));
}
