import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/database/mongoose';
import Feedback from '@/app/database/models/feedback.model';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const bookId = url.searchParams.get('bookId');
    if (!bookId) return NextResponse.json({ success: false, error: 'bookId required' });

    const comments = await Feedback.find({ bookId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: comments });
  } catch (e) {
    console.error('GET /api/feedback error', e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ success: false, error: msg });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { bookId, name, comment } = body;
    if (!bookId || !comment) return NextResponse.json({ success: false, error: 'bookId and comment required' });

    // Ensure bookId is stored as an ObjectId
    const bookObjectId = mongoose.isValidObjectId(bookId) ? new mongoose.Types.ObjectId(bookId) : bookId;

    const created = await Feedback.create({ bookId: bookObjectId, name, comment });
    return NextResponse.json({ success: true, data: created });
  } catch (e) {
    console.error('POST /api/feedback error', e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ success: false, error: msg });
  }
}
