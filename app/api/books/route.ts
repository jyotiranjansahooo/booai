import { NextResponse } from 'next/server';
import { getAllBooks } from '@/lib/actions/book.actions';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get('search') || undefined;
    const genre = url.searchParams.get('genre') || undefined;
    const author = url.searchParams.get('author') || undefined;

    const result = await getAllBooks(search, genre);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}
