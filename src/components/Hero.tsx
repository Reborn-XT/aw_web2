import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_PAINTINGS } from '../data';

const SLIDE_DURATION = 6000;

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent(p => (p + 1) % HERO_PAINTINGS.length),
    []
  );
  const prev = useCallback(
    () => setCurrent(p => (p - 1 + HERO_PAINTINGS.length) % HERO_PAINTINGS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next, paused]);

  const painting = HERO_PAINTINGS[current];
  const kenName = `ken-${'abcdef'[current % 6]}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col"
      style={{ height: '100svh', minHeight: '600px', background: '#0c0b09' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Painting Background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute top-0 bottom-0 right-0 w-full md:w-5/6 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <img
            src={painting.img}
            alt={painting.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: `${kenName} 7s linear forwards`,
              transformOrigin: 'center center',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Golden Ratio Gradients ── */}
      {/* Left to right gradient for the main typography block */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(12,11,9,1) 0%, rgba(12,11,9,1) 16.66%, rgba(12,11,9,0.7) 35%, rgba(12,11,9,0) 65%)'
        }}
      />

      {/* Subtle bottom gradient to ensure HUD readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(12,11,9,0.8) 0%, rgba(12,11,9,0) 25%)'
        }}
      />

      {/* ── Main Layout Wrapper ── */}
      <div className="relative z-10 w-full h-full pointer-events-none px-6 md:px-0">

        {/* ── MIDDLE-LEFT: Pure Editorial Typography ── */}
        <div className="absolute top-0 bottom-0 left-6 md:left-16 flex flex-col justify-center text-left pointer-events-auto z-10 w-full max-w-2xl pr-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cat-${current}`}
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              <span className="atelier-stamp">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                № {String(current + 1).padStart(2, '0')} · {painting.cat}
              </span>
              <span className="font-hand text-xl text-[var(--accent-light)] rotate-[-4deg] tracking-wide hidden sm:inline-block">
                ~ handmade original
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`title-wrap-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.h1
                className="font-editorial text-white leading-[1.08] sm:leading-[1.04] mb-5 select-none"
                style={{
                  fontSize: 'clamp(3.2rem, 6vw, 6.2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                {painting.title}
              </motion.h1>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.9 }}
          >
            <div style={{ width: 45, height: 1, background: 'var(--accent)' }} />
            <p
              style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                wordSpacing: '0.08em',
                lineHeight: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(240,236,228,0.75)',
              }}
            >
              Awanti Atelier · Pigment on Archival Canvas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <a href="/gallery" className="btn-gold group">
              <span>Explore Gallery</span>
            </a>
            <a href="/custom-work" className="btn-ghost">
              Commission Bespoke
            </a>
          </motion.div>
        </div>

        {/* ── BOTTOM-RIGHT: HUD Controls ── */}
        <motion.div
          className="absolute bottom-10 md:bottom-16 right-6 md:right-16 flex flex-col items-end gap-6 pointer-events-auto z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={`author-${current}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
              className="hidden md:block"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
              }}
            >
              By Awanti
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-6 md:gap-8">
            {/* Minimal Counter */}
            <div className="flex items-end gap-3 mr-2">
              <span className="text-white font-mono tabular-nums leading-none" style={{ fontSize: '1.4rem' }}>
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="text-white/20 font-mono text-xl leading-none font-light">/</span>
              <span className="text-white/40 font-mono tabular-nums leading-none pb-0.5" style={{ fontSize: '0.85rem' }}>
                {String(HERO_PAINTINGS.length).padStart(2, '0')}
              </span>
            </div>

            {/* Minimal Dots (Lines) */}
            <div className="hidden md:flex items-center gap-3">
              {HERO_PAINTINGS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === current ? 32 : 8,
                    height: 1,
                    background: i === current ? 'var(--gold)' : 'rgba(240,236,228,0.2)',
                    transition: 'width 400ms cubic-bezier(0.23, 1, 0.32, 1), background 300ms ease',
                  }}
                />
              ))}
            </div>

            {/* Bare Arrows */}
            <div className="flex gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-[rgba(225,131,141,0.2)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all text-white/50 hover:text-white"
              >
                <ChevronLeft size={20} strokeWidth={1} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-[rgba(225,131,141,0.2)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all text-white/50 hover:text-white"
              >
                <ChevronRight size={20} strokeWidth={1} />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Progress bar (top edge) ── */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(225,131,141,0.08)', zIndex: 30 }}>
        <motion.div
          key={`bar-${current}`}
          className="h-full"
          style={{ background: 'var(--accent)', transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: paused ? undefined : 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
        />
      </div>
    </section>
  );
};
