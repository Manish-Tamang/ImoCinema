import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    console.log("Received search query:", query);

    const searchUrl = `https://ww25.soap2day.day/search/${encodeURIComponent(query)}`;
    console.log("Fetching URL:", searchUrl);

    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    console.log("Received data length:", data.length);

    const $ = cheerio.load(data);
    const results: any[] = [];

    // Process movies section
    console.log("Processing section: #movies .ml-item");
    $("#movies .ml-item").each((_, element) => {
      const $element = $(element);
      const link = $element.find("a").attr("href") || "";
      const title = $element.find(".mli-info h3").text().trim();
      const image = $element.find("img").attr("data-src") || "";
      const year = $element.find(".mli-info span").first().text().trim();
      const imdb = $element.find(".mli-info span").last().text().trim();

      // Extract clean slug from the link
      const slug = link
        .replace("https://ww25.soap2day.day/", "")
        .replace("/", "")
        .replace("-soap2day", "");

      results.push({
        title,
        image,
        year,
        imdb,
        slug,
        link,
      });
    });

    // Process TV shows section
    console.log("Processing section: #tvshows .ml-item");
    $("#tvshows .ml-item").each((_, element) => {
      const $element = $(element);
      const link = $element.find("a").attr("href") || "";
      const title = $element.find(".mli-info h3").text().trim();
      const image = $element.find("img").attr("data-src") || "";
      const year = $element.find(".mli-info span").first().text().trim();
      const imdb = $element.find(".mli-info span").last().text().trim();

      // Extract clean slug from the link
      const slug = link
        .replace("https://ww25.soap2day.day/", "")
        .replace("/", "")
        .replace("-soap2day", "");

      results.push({
        title,
        image,
        year,
        imdb,
        slug,
        link,
      });
    });

    console.log("Found results:", results.length);
    console.log("Returning results:", results.length);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
