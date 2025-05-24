import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { MovieDetails } from '@/app/types/movie';

export async function POST(request: Request) {
  try {
    const { detailLink } = await request.json();
    console.log('Received detail link:', detailLink);
    
    if (!detailLink) {
      return NextResponse.json(
        { error: 'Missing "detailLink" in request body' },
        { status: 400 }
      );
    }

    console.log('Fetching movie details from:', detailLink);
    const { data } = await axios.get(detailLink, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Received data length:', data.length);
    
    const $ = cheerio.load(data);
    console.log('Loaded HTML content');

    // Extract title
    const title = $('#bread li.active span').text().trim().replace('OK', '');
    console.log('Extracted title:', title);

    // Extract poster from thumb mvic-thumb
    const poster = $('.thumb.mvic-thumb img').attr('src') || '';
    console.log('Extracted poster URL:', poster);

    // Extract carousel images
    const carouselImages: string[] = [];
    $('.mvi-images .galeria_img img').each((_, el) => {
      const src = $(el).attr('src');
      if (src) carouselImages.push(src);
    });
    console.log('Extracted carousel images:', carouselImages.length);

    // Extract rating
    const rating = $('#movie-mark').text().trim();
    console.log('Extracted rating:', rating);

    // Extract streaming servers
    const servers: string[] = [];
    $('#content-embed iframe').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src');
      if (src) servers.push(src);
    });
    console.log('Found streaming servers:', servers.length);

    // Extract description
    let description = $('div[itemprop="description"] .f-desc').text().trim();
    console.log('Raw description length:', description.length);
    
    const lastPeriodIndex = description.lastIndexOf('. ');
    if (lastPeriodIndex !== -1) {
      description = description.substring(0, lastPeriodIndex + 1);
    }
    
    description = description.replace(/(.*)\..*$/, '$1.').trim();
    console.log('Processed description length:', description.length);

    // Extract genres
    const genres: string[] = [];
    $('.block').last().find('a').each((_, el) => {
      genres.push($(el).text().trim());
    });
    console.log('Extracted genres:', genres);

    // Extract year and country
    const year = $('.jt-info a[rel="tag"]').first().text().trim();
    const country = $('.block').first().find('a').text().trim();
    console.log('Extracted year:', year);
    console.log('Extracted country:', country);

    // Validate required fields
    if (!title || !poster) {
      console.error('Missing required fields:', { title, poster });
      throw new Error('Failed to extract required movie details');
    }

    const movieDetails: MovieDetails = {
      title,
      fullPosterImage: poster,
      description,
      genres,
      year,
      imdbRating: rating,
      country,
      streamingServers: servers,
      carouselImages
    };

    console.log('Successfully created movie details object');
    return NextResponse.json(movieDetails);
  } catch (error) {
    console.error('Details API error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape data', details: (error as Error).message },
      { status: 500 }
    );
  }
}
