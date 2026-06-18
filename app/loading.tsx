'use client'


import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence,  } from "framer-motion";
import { gsap } from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookifiedLoadingProps {
  onComplete?: () => void;
  duration?: number; // ms until onComplete fires
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CREAM = "#F8F4E9";
const INK   = "#2C1A0E";
const WARM  = "#C8873A";
const DUST  = "#E8E0CC";
const SAGE  = "#7A8C6E";

const TAGLINES = [
  "Turning pages, warming souls…",
  "Every story finds its reader…",
  "Words waiting to be discovered…",
];

// ─── Page component ───────────────────────────────────────────────────────────
function BookPage({
  delay,
  index,
}: {
  delay: number;
  index: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: index % 2 === 0 ? "#FAF6EE" : "#F5EFE0",
        transformOrigin: "left center",
        borderRight: `1px solid ${DUST}`,
        backfaceVisibility: "hidden",
      }}
      initial={{ rotateY: 0, z: -index * 2 }}
      animate={{
        rotateY: [-3, 3, -3],
        transition: {
          delay,
          repeat: Infinity,
          duration: 2.4,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      }}
    />
  );
}

// ─── Animated book ────────────────────────────────────────────────────────────
function AnimatedBook() {
  const coverRef  = useRef<HTMLDivElement>(null);
  const spineRef  = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coverRef.current || !spineRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(coverRef.current, {
      rotateY: -25,
      duration: 1.8,
      ease: "power2.inOut",
    })
      .to(
        spineRef.current,
        { scaleX: 1.08, duration: 1.8, ease: "power2.inOut" },
        "<"
      )
      .to(
        glowRef.current,
        { opacity: 0.6, scale: 1.15, duration: 1.8, ease: "power2.inOut" },
        "<"
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "clamp(80px, 18vw, 120px)",
        height: "clamp(100px, 23vw, 155px)",
        perspective: "800px",
      }}
    >
      {/* Glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: "-20%",
          background: `radial-gradient(ellipse, ${WARM}55 0%, transparent 70%)`,
          opacity: 0.3,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Book wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Pages stack */}
        {[0, 1, 2].map((i) => (
          <BookPage key={i} delay={i * 0.15} index={i} />
        ))}

        {/* Spine */}
        <div
          ref={spineRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "12%",
            height: "100%",
            background: `linear-gradient(135deg, ${WARM} 0%, #9C5E1E 100%)`,
            borderRadius: "3px 0 0 3px",
            zIndex: 10,
          }}
        />

        {/* Cover */}
        <div
          ref={coverRef}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(155deg, #3D2010 0%, ${INK} 100%)`,
            borderRadius: "3px 5px 5px 3px",
            zIndex: 5,
            transformOrigin: "left center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: `4px 6px 20px rgba(44,26,14,0.35)`,
          }}
        >
          {/* Cover decoration lines */}
          <div
            style={{
              width: "60%",
              height: "1px",
              background: `${WARM}88`,
            }}
          />
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: WARM,
              fontSize: "clamp(6px, 2vw, 10px)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            B
          </div>
          <div
            style={{
              width: "60%",
              height: "1px",
              background: `${WARM}88`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      style={{
        width: "clamp(180px, 50vw, 320px)",
        height: "3px",
        background: DUST,
        borderRadius: "99px",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${WARM}, #E6A050)`,
          borderRadius: "99px",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
      />
    </div>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: WARM,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        y: [0, -30, -60],
        scale: [1, 0.8, 0],
      }}
      transition={{
        delay,
        duration: 3,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// ─── Decorative lines ─────────────────────────────────────────────────────────
function DecorLines() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <svg
      width="clamp(200px, 60vw, 400px)"
      height="20"
      style={{ overflow: "visible", opacity: 0.35 }}
      aria-hidden="true"
    >
      <line
        ref={lineRef}
        x1="0"
        y1="10"
        x2="100%"
        y2="10"
        stroke={INK}
        strokeWidth="0.5"
        strokeDasharray="6 4"
        strokeDashoffset="60"
      />
    </svg>
  );
}

// ─── Tagline rotator ──────────────────────────────────────────────────────────
function TaglineRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % TAGLINES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: "1.4em", overflow: "hidden", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          style={{
            margin: 0,
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "clamp(10px, 2.8vw, 14px)",
            color: `${INK}99`,
            fontStyle: "italic",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {TAGLINES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function BookifiedLoading({
  onComplete,
  duration = 4000,
}: BookifiedLoadingProps) {
  const [progress, setProgress]   = useState(0);
  const [visible, setVisible]     = useState(true);
  const containerRef              = useRef<HTMLDivElement>(null);
  const logoRef                   = useRef<HTMLDivElement>(null);

  // GSAP entrance for logo text
  useEffect(() => {
    if (!logoRef.current) return;
    const chars = logoRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 18, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "back.out(1.4)",
        delay: 0.3,
      }
    );
  }, []);

  // Progress ticker
  useEffect(() => {
    const step = 100 / (duration / 50);
    const id   = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 400);
          return 100;
        }
        return Math.min(p + step + Math.random() * step * 0.5, 100);
      });
    }, 50);
    return () => clearInterval(id);
  }, [duration, onComplete]);

  const particles = [
    { x: "10%", y: "60%", size: 4, delay: 0 },
    { x: "85%", y: "55%", size: 3, delay: 0.8 },
    { x: "20%", y: "30%", size: 5, delay: 1.6 },
    { x: "75%", y: "25%", size: 3, delay: 0.4 },
    { x: "50%", y: "70%", size: 4, delay: 1.2 },
    { x: "65%", y: "40%", size: 2, delay: 2.0 },
  ];

  const logoText = "BooAI";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: CREAM,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px, 4vw, 28px)",
            fontFamily: "sans-serif",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Background texture dots */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle, ${INK}11 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          {(["0 0", "100% 0", "0 100%", "100% 100%"] as const).map((pos, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: pos.split(" ")[0],
                top: pos.split(" ")[1],
                width: "clamp(32px, 8vw, 56px)",
                height: "clamp(32px, 8vw, 56px)",
                borderTop: i < 2 ? `1.5px solid ${WARM}88` : "none",
                borderBottom: i >= 2 ? `1.5px solid ${WARM}88` : "none",
                borderLeft: i % 2 === 0 ? `1.5px solid ${WARM}88` : "none",
                borderRight: i % 2 === 1 ? `1.5px solid ${WARM}88` : "none",
                transform: `translate(${i % 2 === 1 ? "-100%" : "0"}, ${i >= 2 ? "-100%" : "0"})`,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}

          {/* Floating particles */}
          {particles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}

          {/* Book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "backOut" }}
          >
            <AnimatedBook />
          </motion.div>

          <DecorLines />

          {/* Logo */}
          <div
            ref={logoRef}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
              perspective: "400px",
            }}
          >
            {logoText.split("").map((char, i) => (
              <span
                key={i}
                className="char"
                style={{
                  display: "inline-block",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 9vw, 58px)",
                  fontWeight: 700,
                  color: INK,
                  letterSpacing: "-0.01em",
                  opacity: 0,
                  lineHeight: 1,
                }}
              >
                {char}
              </span>
            ))}

            <motion.span
              style={{
                display: "inline-block",
                width: "clamp(5px, 1.5vw, 9px)",
                height: "clamp(5px, 1.5vw, 9px)",
                borderRadius: "50%",
                background: WARM,
                marginLeft: "3px",
                marginBottom: "clamp(4px, 1.2vw, 8px)",
                flexShrink: 0,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
            />
          </div>

          <motion.p
            style={{
              margin: 0,
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(9px, 2.5vw, 13px)",
              color: `${INK}66`,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Your digital bookshelf
          </motion.p>

          <DecorLines />

          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ProgressBar progress={progress} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Spinning leaf */}
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              >
                <path
                  d="M6 1 C9 1 11 4 11 6 C11 9 8 11 6 11 C3 11 1 8 1 6 C1 4 3 1 6 1Z"
                  fill="none"
                  stroke={SAGE}
                  strokeWidth="1"
                />
                <line x1="6" y1="1" x2="6" y2="11" stroke={SAGE} strokeWidth="0.8" />
              </motion.svg>

              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(10px, 2.5vw, 13px)",
                  color: `${INK}77`,
                  letterSpacing: "0.1em",
                  fontWeight: 500,
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>

            <TaglineRotator />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}