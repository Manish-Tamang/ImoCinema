import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  posterImage: string;
  year: string;
  imdbRating: string;
  slug: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full max-w-[180px] mx-auto">
        <div className="aspect-[2/3] relative rounded-t-lg overflow-hidden bg-gray-100" style={{ minHeight: 180 }}>
          {movie.posterImage ? (
            <Image
              src={movie.posterImage}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-1 text-sm">
            {movie.title}
          </h3>
          {/* <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <span>{movie.year}</span>
          </div> */}
        </div>
      </div>
    </Link>
  );
}
