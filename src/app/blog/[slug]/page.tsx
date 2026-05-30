'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts: Record<string, { title: string; content: string; date: string; category: string }> = {
  'social-media-trends-2026': {
    title: 'Social Media Trends Defining 2026',
    date: 'May 25, 2026',
    category: 'Trends',
    content: `
      The social media landscape is evolving faster than ever. In 2026, several key trends are shaping how brands connect with their audiences.

      AI-Powered Content Creation

      Artificial intelligence has moved from experimental to essential. Brands are using AI to generate content ideas, write captions, edit videos, and even create entire campaigns. The key is using AI as a creative partner, not a replacement.

      Ephemeral Marketing Dominance

      Short-lived content continues to dominate engagement. Stories, Fleets, and disappearing posts create urgency and authenticity that polished content often lacks. Brands that master ephemeral marketing see significantly higher engagement rates.

      Video-First Everything

      Short-form video is no longer optional. Platforms are prioritizing video content in their algorithms, and brands that aren't creating video are being left behind. The most successful brands are thinking in video first, text second.

      Community Over Followers

      The metric that matters most in 2026 isn't follower count—it's community engagement. Brands are shifting from broadcasting to conversing, building loyal communities that amplify their message organically.

      Authenticity Is Currency

      Polished, corporate content is being tuned out. Audiences want real, raw, authentic content from brands. Behind-the-scenes, user-generated content, and unfiltered moments are driving the highest engagement.

      At CB Equity, we're helping our clients stay ahead of these trends and turn them into real business results.
    `,
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <article className="relative pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            <span aria-hidden="true">←</span>
            Back to Blog
          </Link>

          <div className="mt-8 flex items-center gap-3 text-sm text-[var(--color-muted)]">
            <span className="font-medium text-[var(--color-primary)]">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{post.title}</h1>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-[var(--color-muted)]">
            {post.content.split('\n\n').map((paragraph, i) => {
              const trimmed = paragraph.trim()
              if (!trimmed) return null

              if (trimmed.startsWith('      ') && !trimmed.includes('\n')) {
                const heading = trimmed.trim()
                return (
                  <h2 key={i} className="mt-8 text-2xl font-semibold text-[var(--color-foreground)]">
                    {heading}
                  </h2>
                )
              }

              return (
                <p key={i}>{trimmed}</p>
              )
            })}
          </div>
        </motion.div>
      </div>
    </article>
  )
}
