"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import MovieCard from "@/components/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        setMovies(data.slice(0, 8)); // Show latest 8 movies
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
      <div className="max-w-3xl mx-auto">
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
        </div>
        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}
        {loading && !hasSearched && (
          <div className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 font-ibm-plex">
              {Array.from({ length: 8 }).map((_, i) => (
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 font-ibm-plex">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    posterImage: movie.poster,
                    year: "",
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
