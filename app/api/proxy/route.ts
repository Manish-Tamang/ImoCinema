import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'Missing "url" in request body' },
        { status: 400 }
      );
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://ww25.soap2day.day/',
        'Origin': 'https://ww25.soap2day.day'
      },
      responseType: 'text'
    });

    // Get the content type from the response
    const contentType = response.headers['content-type'];

    // Return the response with appropriate headers
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType || 'text/html',
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self'",
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy content', details: (error as Error).message },
      { status: 500 }
    );
  }
} 