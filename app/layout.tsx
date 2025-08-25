import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
<Analytics />

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aashraya Co-living | Your Home Away From Home",
  description:
    "Experience comfortable, vibrant co-living spaces with all modern amenities in prime locations. Join our community today!",
  // themeColor: "#f59e0b", // Changed from purple to amber
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const viewport = {
  themeColor: '#your-color-here', // Move themeColor here
};