export interface MovieSearchResult {
  title: string;
  link: string;
  image: string;
  imdb: string;
  year: string;
  country: string | null;
  genres: string[];
  type: "movie" | "tv";
  episodes?: string;
  slug?: string;
}

export interface MovieDetails {
  title: string;
  year: string;
  description: string;
  imdbRating: string;
  country: string;
  genres: string[];
  fullPosterImage: string;
  carouselImages: string[];
  streamingServers: string[];
} 