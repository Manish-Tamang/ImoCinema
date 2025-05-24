"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import MovieCard from "@/components/movie-card";
import { MovieSearchResult } from "@/app/types/movie";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Show popular movies on initial load
  useEffect(() => {
    const fetchPopularMovies = async () => {
      console.log("Fetching popular movies...");
      try {
        const response = await fetch("/api/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: "popular" }),
        });

        console.log("Popular movies response status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }

        const data = await response.json();
        console.log("Popular movies data:", data);
        setMovies(data.slice(0, 9)); // Show 9 movies (3 rows of 3)
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError("Failed to load popular movies. Please try again.");
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted with query:", query);

    if (!query.trim()) {
      console.log("Empty query, fetching popular movies...");
      // If search is empty, fetch popular movies again
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "popular" }),
      });

      console.log("Popular movies response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Popular movies data:", data);
        setMovies(data.slice(0, 9));
      }
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      console.log("Fetching search results for:", query);
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      console.log("Search response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      console.log("Search results data:", data);
      setMovies(data);
    } catch (err) {
      console.error("Error searching movies:", err);
      setError("Failed to search movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="text-center space-y-6">
          <div className="space-y-3 font-ibm-plex">
            <h1 className="text-5xl font-bold text-gray-900">Hi there!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Fuelled by a passion for discovering compelling movies, I have a
              deep desire to excel and continuously improve your streaming
              experience. Explore our collection below.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for movies..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-8"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {error && (
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <Loader2
            className="animate-spin mx-auto mb-4 text-gray-900"
            size={40}
          />
          <p className="text-gray-600 font-medium">Searching for movies...</p>
        </div>
      )}

      {!loading && hasSearched && movies.length === 0 && !error && (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center font-ibm-plex">
          <p className="text-gray-600 font-medium">
            No movies found. Try a different search term.
          </p>
        </div>
      )}

      {movies.length > 0 && (
        <div className="space-y-6 font-ibm-plex">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {hasSearched ? "Search Results" : "Popular Movies"}
            </h2>
            <p className="text-gray-600">
              {hasSearched
                ? `Found ${movies.length} movies matching your search`
                : "Trending movies you might enjoy"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-ibm-plex">
            {movies.map((movie, index) => {
              const cleanSlug = movie.link
                .replace("https://ww25.soap2day.day/", "")
                .replace("/", "");
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
  );
}
