'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Whether you&apos;re looking for financial advice, interested in joining our team, 
            or want to become a referral partner — we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-8"
            >
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--color-primary)]">Name</label>
                    <input type="text" id="name" required
                      className="mt-1 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-primary)]">Email</label>
                    <input type="email" id="email" required
                      className="mt-1 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                      placeholder="you@email.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-[var(--color-primary)]">I&apos;m interested in</label>
                  <select id="interest"
                    className="mt-1 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="financial-planning">Financial Planning & Advisory</option>
                    <option value="insurance">Insurance Products</option>
                    <option value="securities">Securities & Fixed Income</option>
                    <option value="annuities">Annuities</option>
                    <option value="wholesaling">Wholesale Distribution</option>
                    <option value="careers">Careers & Internships</option>
                    <option value="referral">Referral Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--color-primary)]">Message</label>
                  <textarea id="message" rows={5} required
                    className="mt-1 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button type="submit"
                  className="w-full rounded-xl gradient-bg px-8 py-3.5 text-sm font-medium text-white transition-all hover:opacity-90 glow"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h3 className="font-semibold text-[var(--color-primary)]">Contact Info</h3>
              <div className="mt-4 space-y-4 text-sm text-[var(--color-muted)]">
                <div>
                  <div className="font-medium text-[var(--color-foreground)]">Email</div>
                  <div>brooke@cb-equity.com</div>
                  <div>connor@cb-equity.com</div>
                </div>
                <div>
                  <div className="font-medium text-[var(--color-foreground)]">Quick Links</div>
                  <div className="mt-1 space-y-1">
                    <Link href="/careers" className="block hover:text-[var(--color-primary)]">Careers & Internships</Link>
                    <Link href="/referrals" className="block hover:text-[var(--color-primary)]">Partner Program</Link>
                    <Link href="/education" className="block hover:text-[var(--color-primary)]">Education Center</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl gradient-bg p-6 text-white">
              <h3 className="font-semibold">Free Consultation</h3>
              <p className="mt-2 text-sm text-white/70">
                Schedule a no-obligation consultation to discuss your financial goals.
              </p>
              <Link
                href="#"
                className="mt-4 inline-flex items-center gap-2 rounded-lg gradient-accent px-4 py-2 text-xs font-medium text-[var(--color-primary)] transition-all hover:opacity-90"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
