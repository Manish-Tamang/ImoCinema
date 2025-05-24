import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { MovieSearchResult } from "@/app/types/movie";

async function scrapeSearchResults(
  query: string
): Promise<MovieSearchResult[]> {
//   console.log("Scraping for query:", query);
  const url = `https://ww25.soap2day.day/search/${encodeURIComponent(query)}`;
  try {
    console.log("Fetching URL:", url);
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    console.log("Received data length:", data.length);
    const $ = cheerio.load(data);
    const results: MovieSearchResult[] = [];

    const sections = ["#movies .ml-item", "#tvshows .ml-item"];

    sections.forEach((selector) => {
      const isTv = selector.includes("tv");
      console.log("Processing section:", selector);

      $(selector).each((_, el) => {
        const element = $(el);
        const title = element.find(".h2").text().trim();
        if (!title.toLowerCase().includes(query.toLowerCase())) return;

        const anchor = element.find("a");
        const link = anchor.attr("href") || "";
        const image = anchor.find("img").attr("data-original")?.trim() || "";
        const imdb = element.find(".imdb").text().trim();
        const episode = element.find(".mli-eps i").text().trim();

        const hiddenTip = element.find("#hidden_tip");
        const year = hiddenTip
          .find('.jt-info a[rel="tag"]')
          .first()
          .text()
          .trim();
        const country = hiddenTip
          .find(".block")
          .first()
          .find("a")
          .text()
          .trim();
        const genres: string[] = [];

        hiddenTip
          .find(".block")
          .last()
          .find("a")
          .each((_, genre) => {
            genres.push($(genre).text().trim());
          });

        results.push({
          title,
          link,
          image,
          imdb,
          year,
          country: country || null,
          genres,
          type: isTv ? "tv" : "movie",
          episodes: episode || undefined,
        });
      });
    });

    console.log("Found results:", results.length);
    return results;
  } catch (err) {
    console.error("Scraping error:", err);
    throw new Error("Failed to scrape: " + (err as Error).message);
  }
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    console.log("Received search query:", query);

    if (!query) {
      return NextResponse.json(
        { error: 'Missing "query" in request body' },
        { status: 400 }
      );
    }

    const results = await scrapeSearchResults(query);
    console.log("Returning results:", results.length);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch("https://ww25.soap2day.day/movies-97exwe/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const movies: any[] = [];

    $(".ml-item.ml-item-post").each((_, element) => {
      const $element = $(element);
      const $link = $element.find("a.ml-mask");
      const $img = $element.find("img.lazy");
      const $runtime = $element.find(".runtime");
      const $info = $element.find(".mli-info");
      const $imdb = $element.find(".imdb");

      const href = $link.attr("href") || "";
      const cleanSlug = href.replace("https://ww25.soap2day.day/", "").replace("/", "");
      const poster = $img.attr("src") || $img.attr("data-original") || "/placeholder.svg";
      
      // Extract year from title if available
      const title = $img.attr("alt") || "";
      const yearMatch = title.match(/\((\d{4})\)/);
      const year = yearMatch ? yearMatch[1] : "N/A";
      
      const movie = {
        id: $element.attr("data-movie-id") || "",
        title: title.replace(/\(\d{4}\)/, "").trim(),
        poster: poster,
        runtime: $runtime.text().trim(),
        slug: cleanSlug,
        year: year,
        imdbRating: $imdb.text().trim() || "",
        link: cleanSlug // Use the clean slug as the link
      };

      movies.push(movie);
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error scraping movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
