'use client';

import React, { useEffect, useState } from 'react';

interface Props { bookId: string; onDone?: () => void }

interface Comment {
  _id: string;
  bookId: string;
  name: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const FeedbackForm = ({ bookId, onDone }: Props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch comments on mount and when bookId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/feedback?bookId=${bookId}`);
        const json = await res.json();
        if (json.success) setComments(json.data || []);
      } catch (e) { console.error(e); }
    };
    fetchComments();
  }, [bookId]);

  // Separate function for submit handler
  const refetchComments = async () => {
    try {
      const res = await fetch(`/api/feedback?bookId=${bookId}`);
      const json = await res.json();
      if (json.success) setComments(json.data || []);
    } catch (e) { console.error(e); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, name, comment }),
      });
      const json = await res.json();
      if (json.success) {
        setName(''); setComment('');
        refetchComments();
        if (onDone) onDone();
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={submit} className="space-y-2">
        <input className="form-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="form-input" placeholder="Your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <div className="flex gap-2">
          <button className="btn" type="submit" disabled={loading}>Submit</button>
          <button className="btn btn-ghost" type="button" onClick={() => { setName(''); setComment(''); }}>Clear</button>
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {comments.length === 0 && <p className="text-sm text-gray-500">No comments yet.</p>}
        {comments.map((c) => (
          <div key={c._id} className="p-2 border rounded">
            <div className="text-sm font-semibold">{c.name || 'Anonymous'}</div>
            <div className="text-sm text-gray-700">{c.comment}</div>
            <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
