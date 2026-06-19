import AllBooksClient from '@/components/AllBooksClient';
import React from 'react';

const page = async () => {
  return (
    <main className="wrapper container">
      <div className="mx-auto max-w-180 space-y-8">
        <section>
          <h1 className="page-title-xl">All Books</h1>
          <p className="text-gray-600">Explore all uploaded books. Filter by title, author or genre, and leave feedback on any book.</p>
        </section>

        <AllBooksClient />
      </div>
    </main>
  );
};

export default page;
