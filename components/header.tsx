"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#e0c8fa] font-mono sticky top-0 z-50">
      <div className="max-w-[920px] mx-auto px-6 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#9748FF] rounded flex items-center justify-center">
              <Film className="text-white" size={16} />
            </div>
            <span className="text-xl font-medium text-black">ImoCinema</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-black hover:text-[#9748FF] transition-colors">Home</Link>
            <Link href="/movie" className="text-black hover:text-[#9748FF] transition-colors">Movies</Link>
            <Link href="/about" className="text-black hover:text-[#9748FF] transition-colors">About</Link>
          </div>
          <Link href="/search" className="ml-2">
            <Button
              variant="outline"
              className="border-[#9748FF] bg-[#9748FF] text-white"
            >
              Browse Movies
            </Button>
          </Link>
          {/* Mobile Menu Button */}
          <button className="md:hidden ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 bg-white/80 rounded-xl shadow-md animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-black hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/movie"
                className="text-black hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/search"
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="outline"
                  className="w-full border-[#9748FF] text-[#9748FF] hover:bg-[#9748FF] hover:text-white"
                >
                  Browse Movies
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
