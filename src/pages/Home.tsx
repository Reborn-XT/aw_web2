import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Palette,
  CheckCircle2,
  ArrowRight,
  Star,
  Instagram,
  Maximize2,
  ShieldCheck,
  Flame,
  Box,
  Check,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { InteractiveNav } from '../components/InteractiveNav';
import { Interactive3DViewer } from '../components/Interactive3DViewer';
import { ThreeDModal } from '../components/ThreeDModal';
import { PAINTINGS, STORIES, INSTAGRAM_URL, asset } from '../data';

export const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'landscape' | 'pop' | 'mini'>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<typeof PAINTINGS[0] | null>(null);
  const [copied3DWaitlist, setCopied3DWaitlist] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);

  const handleJoin3DWaitlist = () => {
    const message = `Hi Awanti! I saw the sneak peek of the 3D Mini Portraits on your website. Please add me to the early access waitlist when commissions open!`;
    navigator.clipboard.writeText(message).then(() => {
      setCopied3DWaitlist(true);
      setTimeout(() => setCopied3DWaitlist(false), 2500);
      setTimeout(() => {
        window.open(INSTAGRAM_URL, '_blank');
      }, 600);
    });
  };

  const filteredPaintings = PAINTINGS.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'landscape') return p.cat.toLowerCase().includes('landscape') || p.cat.toLowerCase().includes('seascape');
    if (activeCategory === 'pop') return p.cat.toLowerCase().includes('pop') || p.cat.toLowerCase().includes('cute');
    if (activeCategory === 'mini') return p.cat.toLowerCase().includes('mini');
    return true;
  }).slice(0, 8);

  return (
    <main className="relative bg-[#0b0a0c] text-[#f5f2ed] overflow-hidden selection:bg-[#e1838d] selection:text-[#0b0a0c]">

      {/* ══════════════════════════════════════════════════════════
          1. HERO HEADER SECTION
      ══════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ══════════════════════════════════════════════════════════
          2. THE ARTIST'S INTERACTIVE ATELIER (Pose Navigation)
      ══════════════════════════════════════════════════════════ */}
      <InteractiveNav />

      {/* ══════════════════════════════════════════════════════════
          3. ARTISAN STUDIO STATS TICKER
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-[rgba(225,131,141,0.15)] bg-[#120f14] py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="font-editorial text-3xl md:text-4xl text-white font-normal">100%</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] mt-1.5">
              Handcrafted in India
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-editorial text-3xl md:text-4xl text-white font-normal">500+</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] mt-1.5">
              Collector Homes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-editorial text-3xl md:text-4xl text-white font-normal">Archival</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] mt-1.5">
              Cotton & Heavy Pigments
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-editorial text-3xl md:text-4xl text-white font-normal">Safe Pan-India</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] mt-1.5">
              Wooden Crate Delivery
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. CURATED ARTWORK EXHIBITION (Masonry / Editorial Grid)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="atelier-stamp">
                <Sparkles size={12} className="text-[var(--accent)]" />
                EXHIBITION 2026
              </span>
              <span className="font-hand text-xl text-[var(--accent-light)] rotate-[-3deg]">
                ~ original works
              </span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl text-white leading-[1.12]">
              Curated Studio Pieces
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'landscape', label: 'Landscapes' },
              { id: 'pop', label: 'Pop & Cute' },
              { id: 'mini', label: 'Minis' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 rounded-sm cursor-pointer ${activeCategory === tab.id
                    ? 'bg-[var(--accent)] text-[#0b0a0c] font-bold shadow-[0_0_15px_rgba(225,131,141,0.4)]'
                    : 'bg-[#18141b] text-white/60 hover:text-white border border-white/5 hover:border-[var(--accent)]/40'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Art Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPaintings.map((painting, idx) => (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group bg-[#141016] border border-[rgba(225,131,141,0.14)] hover:border-[var(--accent)] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Painting Frame Box */}
              <div className="relative aspect-[4/5] bg-[#0c0a0e] overflow-hidden p-3 flex items-center justify-center">
                <img
                  src={painting.img}
                  alt={painting.title}
                  className="w-full h-full object-cover rounded-xs transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Status tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={painting.status === 'Available' ? 'badge-available text-[9px]' : 'badge-sold text-[9px]'}>
                    {painting.status}
                  </span>
                </div>

                {/* Quick overlay buttons */}
                <div className="absolute inset-0 bg-[#0c0a0e]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedArtwork(painting)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--accent)] hover:text-[#0b0a0c] text-white flex items-center justify-center transition-all duration-300"
                    title="Zoom View"
                  >
                    <Maximize2 size={16} />
                  </button>
                  <Link
                    to="/shop"
                    className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-[var(--accent)] text-[#0b0a0c] font-bold rounded-sm hover:scale-105 transition-transform"
                  >
                    Enquire
                  </Link>
                </div>
              </div>

              {/* Artwork Info & Specs */}
              <div className="p-4 border-t border-white/5 bg-[#17121a]">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase mb-1">
                  <span>{painting.medium}</span>
                  <span className="text-white/40">{painting.size}</span>
                </div>
                <h3 className="font-editorial text-lg text-white group-hover:text-[var(--accent-light)] transition-colors truncate">
                  {painting.title}
                </h3>
                <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="font-mono text-base text-white font-medium">
                    ₹{painting.price.toLocaleString()}
                  </span>
                  <Link
                    to="/shop"
                    className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Full Collection CTA Banner */}
        <div className="mt-16 text-center">
          <Link to="/gallery" className="btn-gold">
            <span>Explore All 20+ Artworks</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4.5 ATELIER SNEAK PEEK: 3D HAND-PAINTED MINI PORTRAITS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-[#0b0a0c] via-[#151018] to-[#0b0a0c] border-y border-[rgba(225,131,141,0.2)] relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(225,131,141,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Interactive 3D Canvas */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative">
                {/* Washi tape aesthetic accents */}
                <div className="washi-tape -top-3 left-6 -rotate-3" />
                <Interactive3DViewer
                  heightClass="h-[380px] sm:h-[460px] md:h-[500px]"
                />
              </div>
            </div>

            {/* Right: Teaser Story & VIP Waitlist */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="atelier-stamp">
                  <Sparkles size={12} className="text-[var(--accent)]" />
                  ATELIER SNEAK PEEK
                </span>
                <span className="font-hand text-2xl text-[var(--accent-light)] rotate-[-1deg]">
                  something new is in the works
                </span>
              </div>

              <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white leading-[1.12]">
                Taking Slow Art into the Third Dimension.
              </h2>

              <p className="mt-6 text-white/75 font-sans text-sm md:text-base leading-relaxed">
                We are developing an intimate new art format: custom <strong className="text-white font-medium">3D-printed miniature portraits</strong>, sculpted with 50-micron precision and <strong className="text-white font-medium">individually hand-painted by Awanti</strong> with fine acrylics, micro-shading, and an archival finish.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-sm bg-[#18131c] border border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">Phase 01</span>
                  <h5 className="font-editorial text-base text-white mt-1">3D Sculpt</h5>
                  <p className="text-white/50 text-xs mt-1">From reference photos to high-res resin model.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#18131c] border border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">Phase 02</span>
                  <h5 className="font-editorial text-base text-white mt-1">Hand-Painted</h5>
                  <p className="text-white/50 text-xs mt-1">Micro-brush acrylic layers and delicate gradients.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#18131c] border border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">Phase 03</span>
                  <h5 className="font-editorial text-base text-white mt-1">Archival Seal</h5>
                  <p className="text-white/50 text-xs mt-1">Protective satin UV coat on solid wood mount.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleJoin3DWaitlist}
                  className="btn-gold cursor-pointer"
                >
                  {copied3DWaitlist ? (
                    <>
                      <Check size={15} />
                      <span>Copied! Opening Instagram...</span>
                    </>
                  ) : (
                    <>
                      <Instagram size={15} />
                      <span>Join Early Access Waitlist</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIs3DModalOpen(true)}
                  className="px-5 py-3 border border-white/20 hover:border-[var(--accent)] text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-all rounded-sm flex items-center gap-2 cursor-pointer"
                >
                  <Box size={14} className="text-[var(--accent)]" />
                  <span>Full Viewport</span>
                </button>
              </div>

              <p className="mt-4 text-[11px] font-mono text-white/40">
                ✦ Prototypes currently spinning in studio • Commissions opening soon
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. BEFORE & AFTER / ARTISAN PROCESS INTERACTIVE SHOWCASE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#120f15] border-y border-[rgba(225,131,141,0.15)] relative overflow-hidden">

        {/* Background decorative typography */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] md:text-[22rem] font-editorial text-white/[0.015] select-none pointer-events-none leading-none">
          CRAFT
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Atelier Story */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="atelier-stamp">
                <Palette size={12} className="text-[var(--accent)]" />
                HOW IT'S MADE
              </span>
              <span className="font-hand text-xl text-[var(--accent-light)] rotate-[-2deg]">
                pure tactile painting
              </span>
            </div>

            <h2 className="font-editorial text-4xl md:text-5xl text-white leading-[1.2]">
              Slow Art in a Fast World. No AI, No Prints. Just Real Pigment.
            </h2>

            <p className="mt-5 text-white/70 font-sans text-sm md:text-base leading-relaxed">
              Every canvas starts with rough graphite strokes on stretched linen. We custom mix our pigments
              using fine artist-grade acrylics and gouache, layering colors 12 to 20 times to achieve light refraction
              that digital prints simply cannot reproduce.
            </p>

            {/* Atelier Steps */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#18131c] border border-white/5">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white">Underdrawing & Value Sketching</h4>
                  <p className="text-white/50 text-xs mt-1">Establishing shadows and perspective with raw burnt umber.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#18131c] border border-white/5">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white">Heavy Impasto & Textured Glazes</h4>
                  <p className="text-white/50 text-xs mt-1">Building tactile thickness so strokes pop off the wall.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#18131c] border border-white/5">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white">UV Satin Archival Varnish</h4>
                  <p className="text-white/50 text-xs mt-1">Sealed against sunlight and humidity to last for generations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tactile Artwork Showcase Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Washi tape decor */}
              <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-1" />

              <div className="bg-[#1b161f] border border-[rgba(225,131,141,0.25)] p-4 sm:p-6 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-square overflow-hidden rounded-xs bg-black">
                  <img
                    src={asset('/products/Italian-style town.jpg')}
                    alt="Italian Town Masterpiece"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#0b0a0c]/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-xs font-mono text-white/90">
                    Featured Masterpiece · 6×8 in
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-editorial text-2xl text-white">Italian Old Town</h3>
                    <p className="font-mono text-xs text-[var(--accent)] mt-0.5">Heavy Acrylic on Canvas Board</p>
                  </div>
                  <span className="badge-sold">Sold to Private Collector</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. BESPOKE COMMISSIONS CALLOUT (Interactive Custom Orders)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#18131c] via-[#140f16] to-[#0c0a0e] border border-[rgba(225,131,141,0.25)] rounded-sm p-8 md:p-14 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)]">

          {/* Subtle rose light bloom */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(225,131,141,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Text & Actions */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="atelier-stamp">
                  <Flame size={12} className="text-[var(--accent)]" />
                  CUSTOM COMMISSIONS
                </span>
                <span className="font-hand text-xl text-[var(--accent-light)] rotate-[-2deg]">
                  ~ slots open for this month
                </span>
              </div>

              <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white leading-[1.12]">
                Have a Memory, Place, or Pet You Want Immortalized in Paint?
              </h2>

              <p className="mt-6 text-white/75 font-sans text-sm md:text-base leading-relaxed max-w-xl">
                We paint custom portraits, anime/Ghibli scenes, landscape memories, and couple gifts.
                Share your reference photo and Awanti will handcraft an original painting tailored to your space.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/custom-work" className="btn-gold">
                  <span>Start Your Custom Commission</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 hover:border-[var(--accent)] text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-all rounded-sm flex items-center gap-2"
                >
                  <Instagram size={15} />
                  <span>Chat on Instagram</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[var(--accent)] flex-shrink-0" />
                  <span>Review progress photo before shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[var(--accent)] flex-shrink-0" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Showcase Card filling the previous empty space */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm">
                <div className="washi-tape -top-3 right-8 rotate-2" />
                <div className="bg-[#1b1620] border border-[rgba(225,131,141,0.3)] p-4 rounded-sm shadow-2xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xs bg-black">
                    <img
                      src={asset('/products/custom/ghibli-beach-portrait.jpg')}
                      alt="Custom Ghibli Style Commission"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#0b0a0c]/85 backdrop-blur-md px-2.5 py-1 rounded-xs border border-white/10 text-[10px] font-mono tracking-wider text-[var(--accent)] uppercase">
                      Bespoke Order
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-lg text-white">Ghibli Style Portrait</h4>
                      <p className="font-mono text-[11px] text-white/50 mt-0.5">Custom Reference Photo</p>
                    </div>
                    <span className="badge-waitlist text-[9px]">Custom Commission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. COLLECTOR STORIES & PRAISE WALL
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 bg-[#0e0c10] border-t border-[rgba(225,131,141,0.12)]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="atelier-stamp">COLLECTOR STORIES</span>
            <h2 className="font-editorial text-4xl md:text-5xl text-white mt-3">
              Cherished in Real Homes
            </h2>
            <p className="text-white/60 font-mono text-xs uppercase tracking-wider mt-2.5">
              Stories from collector homes across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORIES.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="bg-[#141016] border border-[rgba(225,131,141,0.12)] hover:border-[rgba(225,131,141,0.35)] p-6 rounded-sm flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--accent)" stroke="none" />
                    ))}
                  </div>
                  <p className="font-editorial text-lg text-white/90 italic leading-relaxed">
                    "{story.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-mono text-xs text-white font-bold">{story.user}</h4>
                    <span className="text-[10px] text-white/40 uppercase font-mono">{story.role}</span>
                  </div>
                  <span className="text-[10px] text-[var(--accent)] font-mono">{story.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/stories"
              className="text-xs font-mono tracking-wider text-[var(--accent)] hover:underline uppercase inline-flex items-center gap-2"
            >
              <span>Read All Collector Stories</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ARTWORK LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#151118] border border-[var(--accent)]/40 p-6 rounded-sm shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white font-mono text-sm"
              >
                [CLOSE ✕]
              </button>

              <div className="aspect-square sm:aspect-[4/3] bg-black rounded-xs overflow-hidden mb-6">
                <img
                  src={selectedArtwork.img}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-3xl text-white">{selectedArtwork.title}</h3>
                  <p className="font-mono text-xs text-[var(--accent)] mt-1">
                    {selectedArtwork.medium} · {selectedArtwork.size} · {selectedArtwork.cat}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl text-white font-bold">₹{selectedArtwork.price.toLocaleString()}</p>
                  <Link
                    to="/shop"
                    className="btn-gold text-xs mt-2"
                    onClick={() => setSelectedArtwork(null)}
                  >
                    <span>Enquire</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Atelier Sneak Peek Modal */}
      <ThreeDModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
      />

    </main>
  );
};
