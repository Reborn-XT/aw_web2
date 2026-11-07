import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAINTINGS, INSTAGRAM_URL } from '../data';
import { Instagram, Check } from 'lucide-react';
import { ImageModal } from '../components/ImageModal';

// Hand-drawn underline SVG for the active filter
const RoughUnderline = () => (
  <motion.svg
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    width="100%"
    height="8"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    className="absolute -bottom-2 left-0 pointer-events-none"
    style={{ color: 'var(--gold)' }}
  >
    <motion.path
      d="M 2 5 Q 30 2, 60 6 T 98 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);

  const filters = ['All', 'Available', 'Sold Out'];

  // Base items for the shop: exclude Custom/Commission and Portrait
  const shopPaintings = PAINTINGS.filter(p => p.cat !== 'Commission' && p.cat !== 'Portrait');

  const filteredPaintings = shopPaintings.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Available') return p.status === 'Available';
    if (activeFilter === 'Sold Out') return p.status === 'Sold Out';
    return true;
  }).sort((a, b) => {
    if (a.status === 'Available' && b.status !== 'Available') return -1;
    if (a.status !== 'Available' && b.status === 'Available') return 1;
    if (a.status === 'Waitlist' && b.status === 'Sold Out') return -1;
    if (a.status === 'Sold Out' && b.status === 'Waitlist') return 1;
    return 0;
  });

  const getDiscountedPrice = (title: string, price: number) => {
    const t = title.toLowerCase();
    if (t.includes('fairytale') || t.includes('peaceful evening') || t.includes('italian')) {
      return Math.round(price * 0.9);
    }
    return null;
  };

  const handleEnquire = (paintingTitle: string, price: number, discountedPrice: number | null, id: number) => {
    const finalPrice = discountedPrice || price;
    const message = `Hi! I'm interested in the painting "${paintingTitle}" (listed for ₹${finalPrice.toLocaleString()}). Is it still available?`;
    navigator.clipboard.writeText(message).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
      setTimeout(() => {
        window.open(INSTAGRAM_URL, '_blank');
      }, 600);
    });
  };

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span style={{ width: '40px', height: '1px', background: 'var(--gold-muted)' }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            Studio Collection
          </span>
          <span style={{ width: '40px', height: '1px', background: 'var(--gold-muted)' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: 'var(--text)' }}>Original </span>
          <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Works</span>
        </motion.h1>
      </section>

      {/* ── 2. ARTISTIC FILTER BAR ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 mb-16 flex justify-center"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative px-2 py-2 group cursor-pointer"
                style={{ background: 'transparent', border: 'none' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: isActive ? 'var(--gold)' : 'rgba(240,236,228,0.4)',
                    transition: 'color 0.3s ease',
                  }}
                  className="group-hover:text-[var(--gold)]"
                >
                  {filter}
                </span>
                {isActive && <RoughUnderline />}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ── 3. ARTWORK GRID ───────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPaintings.map((painting) => {
              const discountedPrice = getDiscountedPrice(painting.title, painting.price);
              return (
                <div
                  key={painting.id}
                  className="group"
                >
                  {/* Artwork Card (Canvas look) */}
                  <div
                    className="flex flex-col gap-4 p-3 md:p-4 transition-colors duration-500 h-full"
                    style={{ background: 'var(--surface)' }}
                  >
                    <div className="relative overflow-hidden w-full aspect-[4/5]">
                      {/* Image - raw corners, no rounded edges */}
                      <img
                        src={painting.img}
                        alt={painting.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02] cursor-zoom-in"
                        onClick={() => setSelectedImage({ src: painting.img, alt: painting.title })}
                      />
                      
                      {/* Artistic Status Tag */}
                      {painting.status !== 'Available' && painting.status !== 'Waitlist' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              border: '1px solid rgba(240,236,228,0.5)',
                              color: 'rgba(240,236,228,0.8)',
                            }}
                            className="px-3 py-1 text-[0.65rem] tracking-widest uppercase bg-black/60 rotate-[-2deg]"
                          >
                            Sold Out
                          </span>
                        </div>
                      )}
                      
                      {painting.status === 'Available' && (
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            background: 'var(--gold)',
                            color: 'var(--bg)',
                          }}
                          className="absolute top-3 left-3 px-2 py-1 text-[0.6rem] tracking-widest uppercase font-bold rotate-[1deg]"
                        >
                          Available
                        </span>
                      )}
                      
                      {discountedPrice && (
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            background: '#c0695a',
                            color: '#fff',
                            border: '1px dashed rgba(255,255,255,0.4)'
                          }}
                          className="absolute top-3 right-3 px-2 py-1 text-[0.6rem] tracking-widest uppercase rotate-[-3deg]"
                        >
                          10% OFF
                        </span>
                      )}
                    </div>

                    {/* Artwork Metadata (Typewriter feel) */}
                    <div className="flex flex-col gap-3 px-1 pb-2 mt-auto">
                      <div className="flex justify-between items-start gap-4">
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.4rem',
                            fontWeight: 400,
                            color: 'var(--text)',
                            lineHeight: 1.1,
                          }}
                        >
                          {painting.title}
                        </h3>
                        {discountedPrice ? (
                          <div className="flex flex-col items-end flex-shrink-0">
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: '0.65rem',
                                color: 'rgba(240,236,228,0.4)',
                                textDecoration: 'line-through',
                              }}
                            >
                              ₹{painting.price.toLocaleString()}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: '0.9rem',
                                color: 'var(--gold)',
                              }}
                            >
                              ₹{discountedPrice.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: '0.9rem',
                              color: 'var(--gold)',
                              flexShrink: 0,
                            }}
                          >
                            ₹{painting.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.6rem',
                          color: 'rgba(240,236,228,0.45)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {painting.cat} // {painting.medium} // {painting.size}
                      </p>

                      <div className="mt-1">
                        <button
                          onClick={() => handleEnquire(painting.title, painting.price, discountedPrice, painting.id)}
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            padding: '0.75rem',
                            fontSize: '0.65rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: (painting.status === 'Available' || painting.status === 'Waitlist') ? 'rgba(200,169,110,0.05)' : 'transparent',
                            border: (painting.status === 'Available' || painting.status === 'Waitlist') ? '1px solid var(--gold-muted)' : '1px solid rgba(240,236,228,0.1)',
                            color: (painting.status === 'Available' || painting.status === 'Waitlist') ? 'var(--gold)' : 'rgba(240,236,228,0.3)',
                            opacity: (painting.status === 'Available' || painting.status === 'Waitlist') ? 1 : 0.5,
                            cursor: (painting.status === 'Available' || painting.status === 'Waitlist') ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease'
                          }}
                          className={`w-full flex items-center justify-center gap-2 relative overflow-hidden ${(painting.status === 'Available' || painting.status === 'Waitlist') ? 'hover:bg-[var(--gold)] hover:text-[var(--bg)]' : ''}`}
                          disabled={painting.status !== 'Available' && painting.status !== 'Waitlist'}
                        >
                          <AnimatePresence mode="wait">
                            {copiedId === painting.id ? (
                              <motion.div
                                key="copied"
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <Check size={14} />
                                <span>Copied! Redirecting...</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="default"
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                {painting.status === 'Available' || painting.status === 'Waitlist' ? <Instagram size={14} /> : null}
                                <span>
                                  {painting.status === 'Available' || painting.status === 'Waitlist' ? 'Enquire on Instagram' : 'Artwork Sold'}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPaintings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(240,236,228,0.4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              No works found in this collection.
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
