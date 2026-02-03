import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog/loader';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

const SITE_URL = 'https://tapwater.org';

export const metadata: Metadata = {
  title: 'Blog - Water Quality Guides & Tips',
  description:
    'Expert guides on water quality, filtration, hardness, and making your tap water safer. Learn how to test and improve your drinking water.',
  openGraph: {
    title: 'Blog - Water Quality Guides & Tips',
    description:
      'Expert guides on water quality, filtration, hardness, and making your tap water safer.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  // Breadcrumb data for schema
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  return (
    <div className="bg-white">
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-brand-900/50 hover:text-brand-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-brand-900/30">/</li>
              <li className="text-brand-900/70">Blog</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight">
            Water Quality Blog
          </h1>
          <p className="mt-4 text-xl text-brand-900/60 max-w-2xl">
            Guides, tips, and insights about drinking water quality
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-900/60 text-lg">
                New articles coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Format date
                const formattedDate = new Date(post.date).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                );

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-brand-400 hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-50">
                          <svg
                            className="w-12 h-12 text-brand-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
                          {post.category}
                        </span>
                        <span className="text-sm text-brand-900/40">
                          {formattedDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-brand-900 group-hover:text-brand-600 transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-brand-900/60 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700">
                          Read article
                        </span>
                        <span className="text-sm text-brand-900/40">
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
