"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Film } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 font-mono">
      <div className="w-full max-w-[815px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Film className="text-white" size={18} />
            </div>
            ImoCinema
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/movie" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Movies
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/search" className="bg-[#FF6363] text-white px-4 py-2 rounded-md">
              Browse Movies
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/movie"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/search"
                className="btn-primary inline-block text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Movies
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
