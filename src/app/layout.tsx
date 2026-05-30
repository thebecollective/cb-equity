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
  title: "CB Equity | Financial Advisory & Wealth Management",
  description: "Brooke Adams & Connor Savenas — financial planning, insurance, securities, annuities, and wealth management. Independent 1099 opportunities and college-credit internships.",
  openGraph: {
    title: "CB Equity | Financial Advisory & Wealth Management",
    description: "Financial planning, insurance, securities, and wealth management by Brooke Adams & Connor Savenas.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitPopup />
        <AIConcierge />
      </body>


    </html>
  )
}
