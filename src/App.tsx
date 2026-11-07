import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';

import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Shop } from './pages/Shop';
import { CustomWork } from './pages/CustomWork';

/* ── Stub pages (will be replaced in future sprints) ─────────────── */
const ComingSoon = ({ title }: { title: string }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ paddingTop: '5rem' }}
  >
    <p className="section-label mb-4">Coming Soon</p>
    <h1
      className="font-display text-white"
      style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 400 }}
    >
      {title}
    </h1>
    <p
      className="mt-6 max-w-sm"
      style={{
        fontFamily: 'DM Sans, system-ui, sans-serif',
        fontSize: '0.9rem',
        color: 'var(--muted)',
        lineHeight: 1.75,
      }}
    >
      This page is being crafted with care. Check back soon.
    </p>
  </div>
);

/* ── Page transition wrapper ─────────────────────────────────────── */
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  /* Smooth scroll via Lenis — only after preloader */
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  /* Scroll to top on route change */
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Noise overlay */}
      <div className="noise" />

      {/* Preloader — first visit */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Custom cursor — desktop */}
      <CustomCursor />

      {/* Navbar — always visible */}
      <Navbar />

      {/* Page content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
          <Route path="/gallery"     element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/shop"        element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/custom-work" element={<PageTransition><CustomWork /></PageTransition>} />
          <Route path="/reviews"     element={<PageTransition><ComingSoon title="Reviews" /></PageTransition>} />
          <Route path="/about"       element={<PageTransition><ComingSoon title="About" /></PageTransition>} />
          <Route path="/contact"     element={<PageTransition><ComingSoon title="Contact" /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
