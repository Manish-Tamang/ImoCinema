"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Film } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-[#f8f6ff] via-[#f3eaff] to-[#e9d8fd] border-b border-[#e0c8fa] font-mono">
      <div className="w-full max-w-[900px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold text-[#9748FF] tracking-tight drop-shadow-sm">
            <div className="w-10 h-10 bg-[#9748FF] rounded-xl flex items-center justify-center border-2 border-white">
              <Film className="text-white" size={22} />
            </div>
            ImoCinema
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-600 hover:text-[#9748FF] transition-colors font-semibold px-2 py-1 rounded-lg hover:bg-[#f3eaff]">
              Home
            </Link>
            <Link href="/movie" className="text-gray-600 hover:text-[#9748FF] transition-colors font-semibold px-2 py-1 rounded-lg hover:bg-[#f3eaff]">
              Movies
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#9748FF] transition-colors font-semibold px-2 py-1 rounded-lg hover:bg-[#f3eaff]">
              About
            </Link>
            <Link href="/search" className="ml-2">
              <button className="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center">
                <span className="font-medium text-[#333] group-hover:text-white">Browse Movies</span>
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#e0c8fa] pt-4 bg-white/80 rounded-xl shadow-md animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/movie"
                className="text-gray-600 hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-[#9748FF] transition-colors py-2 font-semibold px-2 rounded-lg hover:bg-[#f3eaff]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/search"
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center mx-auto">
                  <span className="font-medium text-[#333] group-hover:text-white">Browse Movies</span>
                </button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
