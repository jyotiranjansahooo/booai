import { NextResponse } from 'next/server';
import { getAllGenres } from '@/lib/actions/book.actions';

export async function GET() {
  try {
    const res = await getAllGenres();
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}
