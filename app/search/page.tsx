"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import MovieCard from "@/components/movie-card"
import { MovieSearchResult } from "@/app/types/movie"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<MovieSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  // Show popular movies on initial load
  useEffect(() => {
    const fetchPopularMovies = async () => {
      console.log('Fetching popular movies...');
      try {
        const response = await fetch("/api/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: "popular" }),
        })

        console.log('Popular movies response status:', response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies")
        }

        const data = await response.json()
        console.log('Popular movies data:', data);
        setMovies(data.slice(0, 12)) // Show 9 movies (3 rows of 3)
      } catch (err) {
        console.error('Error fetching popular movies:', err);
        setError("Failed to load popular movies. Please try again.")
      }
    }

    fetchPopularMovies()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search submitted with query:', query);
    
    if (!query.trim()) {
      console.log('Empty query, fetching popular movies...');
      // If search is empty, fetch popular movies again
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "popular" }),
      })

      console.log('Popular movies response status:', response.status);
      if (response.ok) {
        const data = await response.json()
        console.log('Popular movies data:', data);
        setMovies(data.slice(0, 12))
      }
      setHasSearched(false)
      return
    }

    setLoading(true)
    setError("")
    setHasSearched(true)

    try {
      console.log('Fetching search results for:', query);
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      console.log('Search response status:', response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch search results")
      }

      const data = await response.json()
      console.log('Search results data:', data);
      setMovies(data)
    } catch (err) {
      console.error('Error searching movies:', err);
      setError("Failed to search movies. Please try again.")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-ibm-plex">
      {/* Header */}
      <div className="text-center mb-8 space-y-3 font-ibm-plex">
        <h1 className="text-4xl font-extrabold text-[#9748FF] drop-shadow-sm">Find Your Next Movie</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Search through our collection of movies and TV shows. Discover new titles, explore genres, and find your next favorite entertainment.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-10 max-w-lg mx-auto">
        <div className="flex items-center max-w-md mx-auto gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for movies..."
              className="pl-10 border-gray-200 focus:border-[#9748FF] focus:ring-[#9748FF]"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#9748FF] hover:bg-[#8040E6] text-white min-w-[96px]"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-center mb-8 bg-red-50 p-4 rounded-lg max-w-3xl mx-auto">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 font-ibm-plex">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full max-w-[180px] mx-auto">
                <div className="aspect-[2/3] relative rounded-t-lg overflow-hidden bg-gray-100 animate-pulse" style={{ minHeight: 180 }} />
                <div className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && hasSearched && movies.length === 0 && !error && (
        <div className="text-center text-gray-600 bg-gray-50 p-8 rounded-lg max-w-3xl mx-auto">
          <p className="text-lg mb-2">No results found for "{query}"</p>
          <p className="text-sm">Try different keywords or check your spelling</p>
        </div>
      )}

      {/* Results */}
      {movies.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#9748FF] mb-1">
              {hasSearched ? "Search Results" : "Popular Movies"}
            </h2>
            <p className="text-gray-600 text-sm">
              {hasSearched ? `Found ${movies.length} movies matching your search` : "Trending movies you might enjoy"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-5 font-ibm-plex">
            {movies.map((movie, index) => {
              // Extract the clean slug from the link and add -soap2day
              const cleanSlug = movie.link
                .replace("https://ww25.soap2day.day/", "")
                .replace("/", "")
                .replace("-soap2day", "") + "-soap2day";

              return (
                <MovieCard
                  key={index}
                  movie={{
                    id: movie.link,
                    title: movie.title,
                    posterImage: movie.image,
                    year: movie.year,
                    imdbRating: movie.imdb,
                    slug: cleanSlug,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
} 