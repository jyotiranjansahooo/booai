import HeroSection from "@/components/heroSection"
import BookCard from "@/components/ui/BookCard"
import { getAllBooks } from "@/lib/actions/book.actions"


const page =async () => {
  const bookresult=await getAllBooks()
  const books=bookresult.success ?bookresult.data?? []: []
  return (
<>
<main className="wrapper container">
<HeroSection/>
<div className="library-books-grid">
  {books.map((book) => (
    <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
  ))}
</div>
</main>
</>  )
}

export default page