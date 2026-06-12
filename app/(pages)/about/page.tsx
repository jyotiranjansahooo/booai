"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiSearch,
  FiTrendingUp,
  FiEdit3,
  FiArrowRight,
  FiArrowDown,
  FiBookOpen,
  FiCompass,
  FiAward,
  FiZap,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: FiCpu,
    title: "AI Chapter Briefs",
    text: "Every chapter gets an instant, intelligent summary so you grasp the core idea before you even start reading.",
  },
  {
    icon: FiSearch,
    title: "Cross-Book Search",
    text: "Ask a question once and Bookified scans your entire shelf, surfacing the exact passages that answer it.",
  },
  {
    icon: FiTrendingUp,
    title: "Adaptive Reading Paths",
    text: "The reading order quietly adjusts to your pace and curiosity, keeping momentum without losing depth.",
  },
  {
    icon: FiEdit3,
    title: "Living Margins",
    text: "Highlights and notes turn into an ongoing conversation with the text, powered by context-aware AI prompts.",
  },
];

const STATS = [
  { value: 12400, suffix: "+", label: "Books digitized" },
  { value: 4800000, suffix: "+", label: "Pages analyzed" },
  { value: 230, suffix: "K", label: "Active readers" },
  { value: 98, suffix: "%", label: "Faster discovery" },
];

const STEPS = [
  {
    icon: FiBookOpen,
    title: "Open any book",
    text: "Pick a title from your shelf or import one of your own — Bookified meets you where your reading already lives.",
  },
  {
    icon: FiCpu,
    title: "AI reads alongside you",
    text: "Our models map themes, characters, and arguments in real time, building an interactive layer beneath the text.",
  },
  {
    icon: FiCompass,
    title: "Explore in any direction",
    text: "Jump to related ideas, ask questions, or follow a thread across chapters without losing your place.",
  },
  {
    icon: FiAward,
    title: "Keep what matters",
    text: "Insights, notes, and connections are saved automatically into a personal knowledge map you can revisit anytime.",
  },
];

function formatStat(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (value >= 1000) return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + "K";
  return String(value);
}

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title letter reveal
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { y: "110%", rotate: 6, opacity: 0 },
          {
            y: "0%",
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
            stagger: 0.045,
            delay: 0.2,
          }
        );
      }

      // Hero subtext + cue fade in
      gsap.fromTo(
        ".hero-tagline, .hero-stamp-row, .scroll-cue",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 }
      );

      // Floating book icons ambient motion
      gsap.to(".float-icon", {
        y: "-=14",
        rotation: 6,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.35, from: "random" },
      });

      // Mission text reveal
      gsap.fromTo(
        ".mission-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 75%",
          },
        }
      );

      // Library stamp punch-in
      gsap.fromTo(
        stampRef.current,
        { scale: 0, rotate: -35, opacity: 0 },
        {
          scale: 1,
          rotate: -10,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(2.2)",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 70%",
          },
        }
      );

      // Feature cards stagger reveal
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      gsap.fromTo(
        cards,
        { y: 70, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 78%",
          },
        }
      );

      // Section heading reveals (reused across sections)
      gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Stat counters
      const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");
      statItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          }
        );

        const target = STATS[i].value;
        const span = statValueRefs.current[i];
        if (!span) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power1.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          onUpdate: () => {
            span.textContent = formatStat(Math.floor(counter.val));
          },
        });
      });

      // Process timeline line draw + steps
      if (processLineRef.current) {
        gsap.fromTo(
          processLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });

      // CTA pulse
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        }
      );

      gsap.to(".cta-button", {
        boxShadow: "0 0 0 14px rgba(193,80,46,0)",
        repeat: -1,
        duration: 1.8,
        ease: "sine.out",
        delay: 1.5,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bookified-about" ref={rootRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --cream: #F3E4C7;
          --paper: #FBF4E6;
          --ink: #2B2118;
          --rust: #C1502E;
          --moss: #5C7A5C;
        }

        .bookified-about {
          font-family: 'Space Grotesk', sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          width: 100%;
        }

        .bookified-about * {
          box-sizing: border-box;
        }

        .bookified-about section {
          padding: clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 6vw, 5rem);
          position: relative;
        }

        /* ---------- HERO ---------- */
        .hero {
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          color: var(--rust);
          font-weight: 700;
        }

        .hero-title {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: clamp(3rem, 13vw, 9rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          overflow: hidden;
        }

        .letter {
          display: inline-block;
          will-change: transform, opacity;
        }

        .letter.accent {
          font-style: italic;
          color: var(--rust);
        }

        .hero-tagline {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          font-weight: 500;
          max-width: 36ch;
          color: var(--ink);
          opacity: 0.85;
        }

        .hero-stamp-row {
          display: flex;
          gap: clamp(1rem, 4vw, 2.5rem);
          margin-top: 1rem;
        }

        .float-icon {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: var(--moss);
          opacity: 0.8;
        }

        .float-icon.rust {
          color: var(--rust);
        }

        .scroll-cue {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink);
          cursor: pointer;
          background: none;
          border: none;
          opacity: 0.7;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .scroll-cue:hover {
          opacity: 1;
          transform: translateY(4px);
        }

        .scroll-cue svg {
          animation: bounceDown 1.6s ease-in-out infinite;
        }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* ---------- MISSION ---------- */
        .mission {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2rem;
          background: var(--ink);
          color: var(--cream);
          border-radius: clamp(1.5rem, 4vw, 3rem);
          margin: 0 clamp(0.75rem, 3vw, 2rem);
        }

        .mission-stamp {
          width: clamp(70px, 12vw, 110px);
          height: clamp(70px, 12vw, 110px);
          border: 3px solid var(--rust);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.55rem, 1.3vw, 0.75rem);
          font-weight: 700;
          color: var(--rust);
          letter-spacing: 0.05em;
          text-align: center;
          line-height: 1.3;
          padding: 0.5rem;
        }

        .mission-text {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(1.4rem, 4.2vw, 2.75rem);
          line-height: 1.3;
          max-width: 22ch;
        }

        .mission-text .highlight {
          color: var(--rust);
          font-style: italic;
        }

        /* ---------- FEATURES ---------- */
        .features {
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 5vw, 3.5rem);
        }

        .section-heading {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          font-size: clamp(2rem, 6vw, 3.5rem);
          letter-spacing: -0.01em;
          max-width: 16ch;
        }

        .section-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          opacity: 0.75;
          max-width: 50ch;
          margin-top: 0.75rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: clamp(1.25rem, 3vw, 2rem);
        }

        .feature-card {
          background: var(--paper);
          border: 2px solid var(--ink);
          border-radius: 1.5rem;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .feature-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--rust);
          border: 2px solid var(--ink);
        }

        .feature-card h3 {
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: clamp(1.15rem, 2.5vw, 1.4rem);
          margin: 0;
        }

        .feature-card p {
          font-size: 0.95rem;
          line-height: 1.55;
          opacity: 0.8;
          margin: 0;
        }

        /* ---------- STATS ---------- */
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: clamp(1.5rem, 4vw, 2.5rem);
          text-align: center;
          background: var(--rust);
          color: var(--cream);
          border-radius: clamp(1.5rem, 4vw, 3rem);
          margin: 0 clamp(0.75rem, 3vw, 2rem);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .stat-value {
          font-family: 'Fraunces', serif;
          font-weight: 900;
          font-size: clamp(2.25rem, 6vw, 3.75rem);
          line-height: 1;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.65rem, 1.4vw, 0.85rem);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.85;
        }

        /* ---------- PROCESS ---------- */
        .process {
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 6vw, 4rem);
        }

        .process-track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 5vw, 3rem);
          padding-left: clamp(1.5rem, 4vw, 2.5rem);
          border-left: 2px dashed rgba(43, 33, 24, 0.25);
        }

        .process-line {
          position: absolute;
          left: -2px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--rust);
          transform-origin: top center;
        }

        .process-step {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          background: var(--paper);
          border-radius: 1.25rem;
          border: 2px solid var(--ink);
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
        }

        .process-step .feature-icon-wrap {
          flex-shrink: 0;
        }

        .process-step h3 {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          margin: 0 0 0.4rem 0;
        }

        .process-step p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
          opacity: 0.8;
        }

        /* ---------- CTA ---------- */
        .cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.75rem;
          padding-bottom: clamp(4rem, 10vw, 8rem);
        }

        .cta-title {
          font-family: 'Fraunces', serif;
          font-weight: 800;
          font-size: clamp(2rem, 6vw, 3.5rem);
          max-width: 18ch;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--ink);
          color: var(--cream);
          border: none;
          border-radius: 999px;
          padding: 1rem 2.25rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 0 0 0 rgba(193,80,46,0.5);
        }

        @media (max-width: 600px) {
          .hero-title { gap: 0; }
          .stats { text-align: left; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <span className="eyebrow"> About Bookified</span>
        <h1 className="hero-title" ref={titleRef}>
          {"BOOK".split("").map((ch, i) => (
            <span className="letter" key={`b-${i}`}>
              {ch}
            </span>
          ))}
          {"ified".split("").map((ch, i) => (
            <span className="letter accent" key={`i-${i}`}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="hero-tagline">
          Bookified transforms static books into interactive AI-powered learning experiences,
          helping readers discover ideas faster than ever before.
        </p>
        <div className="hero-stamp-row">
          <FiBookOpen className="float-icon" />
          <FiCpu className="float-icon rust" />
          <FiZap className="float-icon" />
          <FiCompass className="float-icon rust" />
        </div>
        <button className="scroll-cue" onClick={scrollToMission} aria-label="Scroll to mission">
          Scroll to explore
          <FiArrowDown />
        </button>
      </section>

      {/* MISSION */}
      <section className="mission" ref={missionRef}>
        <div className="mission-stamp" ref={stampRef}>
          AI · VERIFIED · READER
        </div>
        <p className="mission-text">
          Every page becomes a <span className="highlight">conversation</span>, every chapter a{" "}
          <span className="highlight">connection</span>, every book a living guide.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features" ref={featuresRef}>
        <div>
          <h2 className="section-heading reveal-heading">What makes Bookified different</h2>
          <p className="section-sub reveal-heading">
            We pair the depth of real books with the speed of AI, so you spend less time
            searching and more time understanding.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                className="feature-card"
                key={f.title}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? -1.5 : 1.5, boxShadow: "0 18px 30px rgba(43,33,24,0.18)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <motion.div
                  className="feature-icon-wrap"
                  whileHover={{ rotate: 360, backgroundColor: "#C1502E", color: "#FBF4E6" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Icon />
                </motion.div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* STATS */}
      <section className="stats" ref={statsRef}>
        {STATS.map((s, i) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value" ref={(el) => {
              statValueRefs.current[i] = el;
            }}>
              0
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* PROCESS */}
      <section className="process" ref={processRef}>
        <div>
          <h2 className="section-heading reveal-heading">How it works</h2>
          <p className="section-sub reveal-heading">
            From the first page to your last note, Bookified keeps the AI layer working quietly
            in the background.
          </p>
        </div>
        <div className="process-track">
          <div className="process-line" ref={processLineRef} />
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                className="process-step"
                key={s.title}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="feature-icon-wrap"
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon />
                </motion.div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" ref={ctaRef}>
        <h2 className="cta-title">Start reading, smarter, with Bookified.</h2>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.06, backgroundColor: "#C1502E" }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
        >
          Explore the library
          <FiArrowRight />
        </motion.button>
      </section>
    </div>
  );
}