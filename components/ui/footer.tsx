"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";

import { BookOpen, Mail, ArrowRight } from "lucide-react";

import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      gsap.to(".beam", {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  const footerLinks = [
  { label: "Library", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

  return (
    <footer
      ref={footerRef}
      className="
        relative
        min-h-[30vh]
        overflow-hidden
        border-t
        border-[#7C3AED20]
        bg-[#F4F0E8]
      "
    >
      {/* Aurora Glow */}
      <div className="absolute inset-0 ">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="overflow-hidden border-y border-violet-500/10 py-4">
  <div className="marquee-track whitespace-nowrap">
    {Array(8)
      .fill(
        "READ • EXPLORE • KNOWLEDGE • DISCOVER • LEARN • THINK • "
      )
      .map((text, i) => (
        <span
          key={i}
          className="mx-8 text-sm font-bold tracking-[0.3em] text-[#2A1F16]/60 md:text-base"
        >
          {text}
        </span>
      ))}
  </div>
</div>

      {/* Animated Beam */}
      <div
        className="
          beam
          absolute
          top-0
          left-0
          h-0.5
          w-full
          bg-[linear-gradient(90deg,transparent,#7C3AED,transparent)]
          bg-position-[200%_100%]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Top Row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="footer-item">
            <div className="mb-3 flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-violet-600" />

              <span className="text-xl font-bold text-[#2A1F16]">
                Bookified
              </span>
            </div>

            <h2
              className="
                text-3xl
                font-black
                tracking-tight
                text-[#2A1F16]
                md:text-5xl
              "
            >
              Keep Reading...
              <br />
              Keep Discovering...
            </h2>
          </div>

          {/* Links */}
          <div className="footer-item flex gap-8">
  {footerLinks.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className="
        group
        relative
        text-[#2A1F16]/70
        transition-all
        hover:text-violet-600
      "
    >
      {item.label}

      <span
        className="
          absolute
          bottom-1
          left-1/2
          h-0.5
          w-0
          -translate-x-1/2
          bg-violet-600
          transition-all
          duration-300
          group-hover:w-full
        "
      />
    </Link>
  ))}
</div>
        </div>

        {/* Bottom Row */}
        <div
          className="
            footer-item
            mt-10
            flex
            flex-col
            gap-6
            border-t
            border-[#2A1F16]/10
            pt-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p className="text-sm text-[#2A1F16]/60">
            © 2025 Bookified. Crafted for curious minds.
          </p>

          <div className="flex gap-3">
            {[FaGithub, FaXTwitter, FaLinkedin, Mail].map((Icon, i) => (
              <button
                key={i}
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-violet-500/20
                  bg-white/50
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:border-violet-500
                  hover:bg-violet-500
                  hover:text-white
                  hover:shadow-[0_0_20px_rgba(124,58,237,.35)]
                "
              >
                <Icon
                  size={18}
                  className="transition-transform group-hover:rotate-12"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
