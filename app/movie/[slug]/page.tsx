"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Server, Loader2, ChevronRight } from "lucide-react";
import { MovieDetails } from "@/app/types/movie";
import { MovieCarousel } from "@/components/movie-carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Get the movie name from the slug and construct the full URL
        const movieName = params.slug as string;
        // Clean the slug if it contains the full URL
        const cleanSlug = movieName.replace("https://ww25.soap2day.day/", "").replace("/", "");
        const detailLink = `https://ww25.soap2day.day/${cleanSlug}/`;
        console.log("Fetching details for:", detailLink);

        const response = await fetch("/api/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detailLink }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(errorData.error || "Failed to fetch movie details");
        }

        const data = await response.json();
        console.log("Received movie data:", data);
        setMovie(data);

        // Auto-select the first server if available
        if (data.streamingServers && data.streamingServers.length > 0) {
          setSelectedServer(data.streamingServers[0]);
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="animate-spin mx-auto mb-4" size={32} />
        <p className="text-gray-600">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-header-height-footer-height)] py-12">
        <Image
          src="/404.png"
          alt="404 Not Found Illustration"
          width={500}
          height={300}
          className="max-w-full h-auto mb-8"
          draggable={false}
          style={{ userSelect: "none" }}
        />
        <h1 className="text-4xl font-bold font-ibm-plex text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-red-600 mb-4">{error || "Movie not found"}</p>    
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-md font-ibm-plex hover:bg-gray-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-ibm-plex">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{movie.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="btn-secondary inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Movie Details */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Poster */}
        <div className="md:col-span-1">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
            <Image
              src={movie.fullPosterImage || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>{movie.year}</span>
              {movie.imdbRating && (
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <span>{movie.imdbRating}</span>
                </div>
              )}
              {movie.country && <span>{movie.country}</span>}
            </div>
          </div>

          {/* Genres */}
          {movie.genres.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      {movie.carouselImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Gallery</h3>
          <MovieCarousel images={movie.carouselImages} title={movie.title} />
        </div>
      )}

      {/* Streaming Servers */}
      {movie.streamingServers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Watch Now</h3>

          {/* Server Buttons */}
          <div className="flex flex-wrap gap-2">
            {movie.streamingServers.map((server, index) => (
              <button
                key={index}
                onClick={() => setSelectedServer(server)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
                  selectedServer === server
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <Server size={16} />
                Server {index + 1}
              </button>
            ))}
          </div>

          {/* Video Player */}
          {selectedServer && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={selectedServer}
                className="w-full h-full"
                allowFullScreen
                title={`${movie.title} - Video Player`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="no-referrer"
                loading="lazy"
                style={{ border: "none" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
