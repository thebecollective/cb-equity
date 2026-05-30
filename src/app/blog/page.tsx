'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const posts = [
  {
    slug: 'social-media-trends-2026',
    title: 'Social Media Trends Defining 2026',
    excerpt: 'From AI-powered content to the rise of ephemeral marketing, here are the trends you need to know.',
    date: 'May 25, 2026',
    category: 'Trends',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    slug: 'instagram-algorithm-guide',
    title: 'How the Instagram Algorithm Works in 2026',
    excerpt: 'A deep dive into Instagram\'s ranking signals and how to optimize your content strategy.',
    date: 'May 18, 2026',
    category: 'Guides',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    slug: 'tiktok-marketing-strategy',
    title: 'The Complete TikTok Marketing Playbook',
    excerpt: 'Everything you need to know about building a brand presence on TikTok in 2026.',
    date: 'May 10, 2026',
    category: 'Strategy',
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    slug: 'roi-social-media-advertising',
    title: 'Maximizing ROI on Social Media Advertising',
    excerpt: 'Proven strategies to optimize your ad spend and get the most out of every dollar.',
    date: 'May 3, 2026',
    category: 'Advertising',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    slug: 'content-creation-ai-tools',
    title: 'Best AI Tools for Content Creation in 2026',
    excerpt: 'We tested 20+ AI tools so you don\'t have to. Here are the ones worth using.',
    date: 'Apr 25, 2026',
    category: 'Tools',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    slug: 'building-brand-community',
    title: 'How to Build a Brand Community That Lasts',
    excerpt: 'Community is the new currency. Learn how to build and nurture an engaged audience.',
    date: 'Apr 18, 2026',
    category: 'Community',
    gradient: 'from-indigo-500 to-violet-600',
  },
]

export default function BlogPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold sm:text-6xl">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Insights, strategies, and trends to help you dominate social media.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className={`flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br ${post.gradient}`}>
                  <span className="text-4xl font-bold text-white/20">{post.category}</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-primary)]">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
