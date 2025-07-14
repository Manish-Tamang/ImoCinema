"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import MovieCard from "@/components/movie-card";

interface Movie {
  id: string;
  title: string;
  poster: string;
  runtime: string;
  slug: string;
  year: string;
  url: string;
  originalTitle: string;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch new movies on initial load
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.slice(0, 9)); // Show latest 9 movies
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setHasSearched(false);
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.slice(0, 9));
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="bg-white/90  p-8 shadow-lg border border-[#e0c8fa] max-w-3xl mx-auto">
        <div className="text-center space-y-6">
          <div className="space-y-3 font-ibm-plex">
            <h1 className="text-4xl font-extrabold text-[#9748FF] drop-shadow-sm">Hi there!</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
                  className="w-full pl-12 pr-4 py-4 border border-[#e0c8fa] rounded-3xl focus:ring-2 focus:ring-[#9748FF] focus:border-transparent outline-none placeholder-gray-500 text-gray-900 bg-white/80 shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span className="font-medium text-[#333] group-hover:text-white">Search</span>
                )}
              </button>
            </div>
          </form>
        </div>
        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        {loading && !hasSearched && (
          <div className="text-center py-8">
            <Loader2 className="animate-spin mx-auto mb-4 text-[#9748FF]" size={40} />
            <p className="text-gray-600 font-medium">Loading movies...</p>
          </div>
        )}
        {!loading && hasSearched && movies.length === 0 && !error && (
          <div className="py-8 text-center font-ibm-plex">
            <p className="text-gray-600 font-medium">
              No movies found. Try a different search term.
            </p>
          </div>
        )}
        {movies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#9748FF] mb-4 text-left">New Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-ibm-plex">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    posterImage: movie.poster,
                    year: movie.year,
                    imdbRating: "",
                    slug: movie.slug,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
