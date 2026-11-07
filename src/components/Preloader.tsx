import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { asset } from '../utils/asset';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading');

  /* Hard-capped at 1200 ms — deterministic, no randomness */
  useEffect(() => {
    const TOTAL = 1200;
    const TICK = 30;
    const increment = 100 / (TOTAL / TICK);
    let current = 0;

    const id = setInterval(() => {
      current = Math.min(current + increment, 100);
      setProgress(current);
      if (current >= 100) {
        clearInterval(id);
        setTimeout(() => setPhase('exit'), 200);
      }
    }, TICK);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <>
          {/* Top curtain */}
          <motion.div
            className="fixed top-0 left-0 w-full h-1/2 z-[200] flex items-end justify-center pb-0 overflow-hidden"
            style={{ background: '#0c0b09' }}
            animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom curtain */}
          <motion.div
            className="fixed bottom-0 left-0 w-full h-1/2 z-[200] flex items-start justify-center pt-0 overflow-hidden"
            style={{ background: '#0c0b09' }}
            animate={phase === 'exit' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <motion.div
            className="fixed inset-0 z-[201] flex flex-col items-center justify-center pointer-events-none"
            animate={phase === 'exit' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Logo */}
            <motion.img
              src={asset('/logok.svg')}
              alt="Awanti"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 md:w-72 h-auto object-contain mb-5"
              style={{
                filter: 'drop-shadow(0px 0px 12px rgba(255,255,255,0.9)) drop-shadow(0px 0px 24px rgba(200,169,110,0.8)) drop-shadow(0px 0px 40px rgba(200,169,110,0.5))'
              }}
            />

            {/* Brand name — entrance only via opacity + translate (no letterSpacing: non-GPU) */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400 }}
              className="text-xl text-white tracking-[0.2em] uppercase"
            >
              AWANTI
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="mt-3 text-[0.65rem] tracking-[0.18em] uppercase text-white/50"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
            >
              Hand Painted Originals
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '140px' }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-10 h-px relative overflow-hidden"
              style={{ background: 'rgba(200,169,110,0.15)' }}
            >
              <div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${progress}%`,
                  transition: 'width 75ms linear',
                  background: 'linear-gradient(90deg, #c8a96e, rgba(240,236,228,0.8))',
                }}
              />
            </motion.div>

            {/* Percent */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-[0.55rem] tracking-widest font-mono text-white/40"
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
