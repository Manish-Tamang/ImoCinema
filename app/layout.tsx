import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
})
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans'
})

export const metadata: Metadata = {
  title: "CineHamster - Movie Streaming",
  description: "Discover and watch movies with a clean, minimalistic interface",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 w-full max-w-[815px] mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
