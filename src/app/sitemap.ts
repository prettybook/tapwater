import { MetadataRoute } from 'next';
import { getAllCities, getStatesMetadata } from '@/lib/data/loader';
import { getAllBlogPosts } from '@/lib/blog/loader';

const SITE_URL = 'https://tapwater.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Homepage
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.7 },
    { path: '/data-sources', priority: 0.6 },
    { path: '/best-water-test-kits', priority: 0.8 },
    { path: '/blog', priority: 0.7 },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: page.priority,
    });
  }

  // Blog posts
  const blogPosts = await getAllBlogPosts();
  for (const post of blogPosts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // State pages
  const statesMetadata = await getStatesMetadata();
  for (const state of statesMetadata.states) {
    entries.push({
      url: `${SITE_URL}/${state.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // City pages
  const allCities = await getAllCities();
  for (const city of allCities) {
    entries.push({
      url: `${SITE_URL}/${city.stateSlug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
