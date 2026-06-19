'use client';

import React, { useEffect, useState } from 'react';
import BookCard from '@/components/ui/BookCard';
import FeedbackForm from '@/components/FeedbackForm';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverURL: string;
  slug: string;
  genre?: string;
}

const AllBooksClient = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/genres');
        const json = await res.json();
        if (json.success) setGenres(json.data || []);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (genre) params.set('genre', genre);
        if (author) params.set('author', author);

        const res = await fetch(`/api/books?${params.toString()}`);
        const json = await res.json();
        if (json.success) setBooks(json.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
    fetchBooks();
  }, [author, genre, search]);

  // Separate function for manual filter/reset calls
  const handleFetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (genre) params.set('genre', genre);
      if (author) params.set('author', author);

      const res = await fetch(`/api/books?${params.toString()}`);
      const json = await res.json();
      if (json.success) setBooks(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input className="form-input" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input className="form-input" placeholder="Filter by author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <select className="form-input" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button className="btn" onClick={handleFetchBooks} disabled={loading}>Filter</button>
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setAuthor(''); setGenre(''); handleFetchBooks(); }}>Reset</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((b) => (
          <div key={b._id} className="space-y-2">
            <BookCard title={b.title} author={b.author} coverURL={b.coverURL} slug={b.slug} />
            <div className="flex items-center gap-2">
              <button className="text-sm text-blue-600" onClick={() => setSelectedBook(b)}>Leave feedback</button>
              <span className="text-sm text-gray-500">{b.genre || '—'}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="mt-6 p-4 border rounded">
          <h3 className="font-semibold">Leave feedback for {selectedBook.title}</h3>
          <FeedbackForm bookId={selectedBook._id} onDone={() => { setSelectedBook(null); handleFetchBooks(); }} />
          <div className="mt-2 text-right">
            <button className="btn btn-ghost" onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooksClient;
