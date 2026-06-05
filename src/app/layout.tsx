import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ExitPopup from "@/components/ExitPopup"
import AIConcierge from "@/components/AIConcierge"



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    default: 'CB Equity | Elite Financial Planning & Wealth Management',
    template: '%s | CB Equity'
  },
  description: 'High-net-worth financial planning, insurance, securities, and wealth management by Brooke Adams & Connor Savenas. Empowering your financial legacy.',
  keywords: ['Financial Planning', 'Wealth Management', 'Insurance', 'Securities', 'CB Equity', 'Brooke Adams', 'Connor Savenas', 'Tax Optimization'],
  authors: [{ name: 'CB Equity' }],
  openGraph: {
    title: 'CB Equity | Elite Financial Planning',
    description: 'Professional wealth management and financial strategies for high-net-worth individuals.',
    url: 'https://cbequity.com',
    siteName: 'CB Equity',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

import './globals.css'
import { BrandProvider } from '@/context/BrandContext'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'

// Final launch build - verified and optimized
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <div className="aurora-bg" />
        <BrandProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
          <BookingModal />
        </BrandProvider>
      </body>
    </html>
  )
}

