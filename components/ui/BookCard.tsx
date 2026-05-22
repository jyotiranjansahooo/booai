"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BookCardProps } from "@/app/types";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Link href={`/books/${slug}`}>
            <article className="book-card">
                <figure className="book-card-figure">
                    <div className="book-card-cover-wrapper relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse z-10" />
                        )}
                        <Image 
                            src={coverURL} 
                            alt={title} 
                            width={133} 
                            height={200} 
                            className="book-card-cover"
                            onLoad={() => setIsLoading(false)}
                            priority={false}
                        />
                    </div>

                    <figcaption className="book-card-meta">
                        <h3 className="book-card-title">{title}</h3>
                        <p className="book-card-author">{author}</p>
                    </figcaption>
                </figure>
            </article>
        </Link>
    )
}
export default BookCard