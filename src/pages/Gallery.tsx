import { useState } from 'react';
import { motion } from 'framer-motion';
import { PAINTINGS } from '../data';
import { ImageModal } from '../components/ImageModal';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  const categories = ['All', ...Array.from(new Set(PAINTINGS.map(p => p.cat)))];

  const filteredPaintings = activeFilter === 'All'
    ? PAINTINGS
    : PAINTINGS.filter(p => p.cat === activeFilter);

  return (
    <main className="min-h-screen pb-32" style={{ background: 'var(--bg)' }}>

      {/* ── 1. HEADER ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '7rem',
          paddingBottom: '2rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* ── Label with flanking lines ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-muted)', display: 'block' }} />
          <span
            style={{
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            The Archive
          </span>
          <span style={{ width: '32px', height: '1px', background: 'var(--gold-muted)', display: 'block' }} />
        </motion.div>

        {/* ── Creative split-style heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.15em',
          }}
        >
          <span style={{ color: 'var(--text)' }}>Gall</span>
          <span
            style={{
              color: 'var(--gold)',
              fontStyle: 'italic',
            }}
          >
            ery
          </span>
        </motion.h1>

        {/* ── Decorative dot separator ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '1.25rem 0 1.1rem',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: 'rgba(200,169,110,0.25)' }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.7 }} />
          <span style={{ width: '20px', height: '1px', background: 'rgba(200,169,110,0.25)' }} />
        </motion.div>

        {/* ── Artistic description ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '44rem', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'rgba(240, 236, 228, 0.75)',
              letterSpacing: '0.01em',
            }}
          >
            Every piece starts with a{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 500 }}>feeling</span>
            {' '}— painted with raw{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 500 }}>emotion</span>
            {', bold '}
            <span style={{ color: 'var(--gold)', fontWeight: 500 }}>colour</span>
            {', and living '}
            <span style={{ color: 'var(--gold)', fontWeight: 500 }}>texture</span>.
          </p>
          <p
            style={{
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'rgba(240, 236, 228, 0.3)',
              marginTop: '0.5rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            28 originals &nbsp;·&nbsp; hand-painted &nbsp;·&nbsp; acrylic, watercolour &amp; gouache
          </p>
        </motion.div>
      </section>

      {/* ── 2. CREATIVE FILTER BAR ────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 sm:px-6 mb-8 flex justify-center max-w-full overflow-hidden"
      >
        {/* Pill-row container (Swipeable on mobile, centered wrap on desktop) */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none max-w-full px-2.5 py-1.5 rounded-full md:flex-wrap md:justify-center"
          style={{
            background: 'rgba(30,27,23,0.7)',
            border: '1px solid rgba(225,131,141,0.18)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--bg)' : 'rgba(240,236,228,0.5)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '99px',
                  background: isActive ? 'var(--gold)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(240,236,228,0.8)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.target as HTMLElement).style.color = 'rgba(240,236,228,0.45)';
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ── 3. PINTEREST MASONRY GRID ─────────────────────────────── */}
      <section style={{ padding: '0 0.75rem' }}>
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="pinterest-grid"
        >
          {filteredPaintings.map((painting, i) => (
            <div
              key={painting.id}
              onMouseEnter={() => setHoveredId(painting.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                breakInside: 'avoid',
                marginBottom: '0.75rem',
                display: 'inline-block',
                width: '100%',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'zoom-in',
                background: 'var(--surface-2)',
                animation: `fadeUp 0.5s ${i * 0.04}s both`,
              }}
              onClick={() => setSelectedImage({ src: painting.img, alt: painting.title })}
            >
              {/* Image */}
              <img
                src={painting.img}
                alt={painting.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
                  transform: hoveredId === painting.id ? 'scale(1.045)' : 'scale(1)',
                }}
              />

              {/* Overlay: Subtle ambient metadata visible on mobile, reveal on desktop hover */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-2.5 sm:p-3.5 transition-all duration-300 pointer-events-none ${
                  hoveredId === painting.id ? 'opacity-100' : 'opacity-90 md:opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(to top, rgba(8,7,5,0.92) 0%, rgba(8,7,5,0.45) 45%, transparent 85%)',
                }}
              >
                {/* Status badge — top right */}
                <span
                  className={
                    painting.status === 'Available'
                      ? 'badge-available'
                      : painting.status === 'Waitlist'
                      ? 'badge-waitlist'
                      : 'badge-sold'
                  }
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '0.55rem', padding: '0.15rem 0.45rem' }}
                >
                  {painting.status}
                </span>

                {/* Bottom text */}
                <div
                  className="transition-transform duration-300"
                  style={{
                    transform: hoveredId === painting.id ? 'translateY(0)' : 'translateY(2px)',
                  }}
                >
                  {/* Category dot + label */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '0.3rem',
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'DM Sans, system-ui, sans-serif',
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                      }}
                    >
                      {painting.cat}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                      fontWeight: 500,
                      color: 'var(--text)',
                      lineHeight: 1.2,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {painting.title}
                  </h3>

                  {/* Meta info */}
                  <p
                    style={{
                      fontFamily: 'DM Sans, system-ui, sans-serif',
                      fontSize: '0.62rem',
                      color: 'rgba(240,236,228,0.5)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {painting.medium} &nbsp;·&nbsp; {painting.size}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {filteredPaintings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: 'var(--muted)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
              No works found in this category.
            </p>
          </div>
        )}
      </section>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imgSrc={selectedImage?.src || null} 
        altText={selectedImage?.alt} 
      />
    </main>
  );
};
