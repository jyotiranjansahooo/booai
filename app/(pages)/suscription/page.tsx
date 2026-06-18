"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Bot,
  Mic,
  Sparkles,
  Check,
  Crown,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SubscriptionPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".floating-book", {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

gsap.utils
  .toArray<HTMLElement>(".feature-card")
  .forEach((card) => {        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
        });
      });

      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: ".pricing-section",
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      });

      gsap.from(".chat-bubble", {
        scrollTrigger: {
          trigger: ".chat-section",
          start: "top 75%",
        },
        opacity: 0,
        x: -30,
        stagger: 0.3,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Bot,
      title: "Unlimited AI Chats",
      desc: "Discuss every chapter with your personal AI reading companion.",
    },
    {
      icon: Mic,
      title: "Voice Conversations",
      desc: "Speak naturally with your books anytime.",
    },
    {
      icon: Sparkles,
      title: "Priority AI",
      desc: "Get faster responses and premium models.",
    },
    {
      icon: BookOpen,
      title: "Large Book Uploads",
      desc: "Upload bigger PDFs without limits.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#F7F3EB] text-[#2B2B2B]"
    >
      {/* HERO */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="hero-content">
              <span className="rounded-full bg-white px-4 py-2 text-sm shadow">
                📚 BooAI Premium
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
                Talk With Your Books Like Never Before
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-600">
                Transform every PDF into an intelligent conversation.
                Ask questions, explore ideas, and learn faster with
                AI-powered book discussions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-purple-600 px-8 py-4 font-semibold text-white transition hover:scale-105">
                  Start Premium
                </button>

                <button className="rounded-full border px-8 py-4 font-semibold">
                  Learn More
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="floating-book flex h-72 w-72 items-center justify-center rounded-full bg-white shadow-2xl">
                <BookOpen size={120} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">
              Everything You Need To Learn Better
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card rounded-3xl bg-white p-8 shadow-sm"
              >
                <feature.icon
                  size={40}
                  className="mb-5 text-purple-600"
                />

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CHAT PREVIEW */}
      <section className="chat-section px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Ask Anything About Your Book
          </h2>

          <div className="space-y-4">
            <div className="chat-bubble ml-auto w-fit rounded-3xl bg-purple-600 px-5 py-4 text-white">
              Summarize Chapter 5
            </div>

            <div className="chat-bubble w-fit rounded-3xl bg-white px-5 py-4 shadow">
              Chapter 5 explores how habits shape long-term success...
            </div>

            <div className="chat-bubble ml-auto w-fit rounded-3xl bg-purple-600 px-5 py-4 text-white">
              Explain it like I`m 12.
            </div>

            <div className="chat-bubble w-fit rounded-3xl bg-white px-5 py-4 shadow">
              Imagine your brain is a garden...
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold">
              Choose Your Plan
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* FREE */}
            <div className="pricing-card rounded-3xl bg-white p-10 shadow-md">
              <h3 className="text-2xl font-bold">Free</h3>

              <p className="mt-4 text-5xl font-bold">$0</p>

              <ul className="mt-8 space-y-4">
                <li className="flex gap-3">
                  <Check /> 3 PDFs
                </li>
                <li className="flex gap-3">
                  <Check /> Limited AI chats
                </li>
                <li className="flex gap-3">
                  <Check /> Basic support
                </li>
              </ul>

              <button className="mt-8 w-full rounded-xl border py-4">
                Current Plan
              </button>
            </div>

            {/* PREMIUM */}
            <div className="pricing-card relative rounded-3xl bg-purple-600 p-10 text-white shadow-2xl">
              <div className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-sm text-purple-600">
                Most Popular
              </div>

              <Crown size={40} />

              <h3 className="mt-4 text-2xl font-bold">
                Premium
              </h3>

              <p className="mt-4 text-5xl font-bold">
                $12
                <span className="text-lg">/month</span>
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex gap-3">
                  <Check /> Unlimited PDFs
                </li>
                <li className="flex gap-3">
                  <Check /> Unlimited AI chats
                </li>
                <li className="flex gap-3">
                  <Check /> Voice conversations
                </li>
                <li className="flex gap-3">
                  <Check /> Priority AI processing
                </li>
              </ul>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-semibold text-purple-700">
                Upgrade Now
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[40px] bg-[#E9DCC0] p-12 text-center">
          <h2 className="text-4xl font-bold">
            Start Talking To Your Books Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Unlock deeper understanding, instant answers, and
            engaging conversations with every book you upload.
          </p>

          <button className="mt-8 rounded-full bg-purple-600 px-10 py-4 font-semibold text-white transition hover:scale-105">
            Get Premium
          </button>
        </div>
      </section>
    </div>
  );
}