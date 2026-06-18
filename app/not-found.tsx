"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  Compass,
  BookOpen,
  Home,
  Search,
  MapPinned,
} from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".compass", {
        rotate: 360,
        repeat: -1,
        duration: 12,
        ease: "none",
      });

      gsap.to(".floating-book", {
        y: -15,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        duration: 2,
        ease: "sine.inOut",
      });

      gsap.to(".lost-guy", {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#F8F4EB] px-6"
    >
      {/* Background blobs */}
      <div className="absolute left-[-150px] top-[-100px] h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center text-center">
        {/* Animated Scene */}
        <div className="relative mb-10 h-[280px] w-full max-w-lg">
          {/* Compass */}
          <div className="compass absolute left-1/2 top-0 -translate-x-1/2">
            <Compass
              size={90}
              className="text-amber-700 drop-shadow-lg"
            />
          </div>

          {/* Floating books */}
          <BookOpen
            className="floating-book absolute left-6 top-28 text-amber-800"
            size={60}
          />

          <BookOpen
            className="floating-book absolute right-8 top-36 text-amber-700"
            size={52}
          />

          {/* Lost Explorer */}
          <div className="lost-guy absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <Search
                size={100}
                className="text-neutral-800"
                strokeWidth={1.5}
              />

              <MapPinned
                size={40}
                className="-mt-3 text-purple-600"
              />
            </div>
          </div>
        </div>

        {/* 404 */}
        <h1 className="fade-up text-7xl font-black text-neutral-900 md:text-9xl">
          404
        </h1>

        <h2 className="fade-up mt-4 text-3xl font-bold text-neutral-900 md:text-5xl">
          You&apos;re Lost In The Library
        </h2>

        <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
          The page you&apos;re looking for seems to have wandered off between
          the shelves.
        </p>

        <p className="fade-up mt-2 max-w-xl text-neutral-500">
          <span className="font-semibold">booai.ai</span> could not find this
          chapter. Either the URL is incorrect, the page has been moved, or a
          mischievous book goblin borrowed it.
        </p>

        {/* Funny card */}
        <div className="fade-up mt-8 rounded-3xl border border-amber-200 bg-white/70 px-6 py-5 shadow-lg backdrop-blur">
          <p className="text-sm text-neutral-700 md:text-base">
            📚 Fun Fact: The librarian checked everywhere...
            <br />
            under the tables, behind the bookshelves, and even inside another
            book.
            <br />
            This page is still missing.
          </p>
        </div>

        {/* Button */}
        <Link
          href="/"
          className="fade-up group mt-10 inline-flex items-center gap-3 rounded-full bg-purple-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-purple-800"
        >
          <Home size={18} />
          Back To Library
        </Link>
      </div>
    </main>
  );
}