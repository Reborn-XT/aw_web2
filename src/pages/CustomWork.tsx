import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Instagram, ExternalLink, Copy, Check, Sparkles, FileText, MessageCircle } from 'lucide-react';
import { INSTAGRAM_URL, asset } from '../data';

// ── GOOGLE FORM CONFIGURATION ─────────────────────────────────────────────
// Replace this with your Google Form embed URL (ensure it ends with /viewform?embedded=true)
export const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc_awanti_art_custom_commissions/viewform?embedded=true';

export const CustomWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [copiedDm, setCopiedDm] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleCopyDmMessage = () => {
    const template = `Hi Awanti! I'd love to discuss a custom commission. I have a reference photo ready to share!`;
    navigator.clipboard.writeText(template).then(() => {
      setCopiedDm(true);
      setTimeout(() => setCopiedDm(false), 2500);
      setTimeout(() => {
        window.open(INSTAGRAM_URL, '_blank');
      }, 500);
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen relative bg-[var(--bg)]">
      {/* ── 1. Hero Section ───────────────────────────────────────────── */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src={asset('/products/custom/ghibli-beach-portrait.jpg')}
            alt="Custom Artwork Commission"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)] opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[var(--bg)] opacity-60" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto fade-up">
          <p className="section-label mb-6">Bespoke Artworks</p>
          <h1 className="section-title mb-6">Commission Your Vision</h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Collaborate directly with the artist to create a unique piece that resonates with your space and story.
            From initial concept to final varnish, every brushstroke is dedicated to capturing memory and emotion.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#inquire"
              className="btn-gold"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Fill Commission Form</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[rgba(225,131,141,0.3)] hover:border-[var(--accent)] text-white/90 hover:text-white text-xs font-mono uppercase tracking-wider transition-all rounded-sm flex items-center gap-2 bg-[#17121b]/80 backdrop-blur-sm"
            >
              <Instagram size={15} className="text-[var(--accent)]" />
              <span>DM on Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Process Section ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 md:py-32 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-20 md:mb-24 fade-up">
            <span className="gold-line mb-6 sm:mb-8" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">The Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { num: '01', title: 'Consultation', desc: 'Share your reference photo or memory via Google Form or directly on Instagram DM. We discuss size, medium, and aesthetic.' },
              { num: '02', title: 'Concept & Sketch', desc: 'Initial compositional sketches and color studies are shared for your feedback before painting begins.' },
              { num: '03', title: 'Creation', desc: 'Your piece is painted layer by layer. Periodic progress photos are sent so you can watch your artwork come to life.' },
              { num: '04', title: 'Delivery', desc: 'Cured and sealed with archival satin varnish, packed in protective wooden casing, and shipped safely across India.' }
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="text-[var(--gold-dim)] font-display text-7xl md:text-8xl mb-6 group-hover:text-[var(--gold)] transition-colors duration-700 leading-none">{step.num}</div>
                <h3 className="font-display text-2xl text-white mb-4 tracking-wide">{step.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-loose max-w-[280px]">{step.desc}</p>

                {/* Connector line for large screens */}
                {idx !== 3 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent z-[-1]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Pricing & Sizing Guide ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 md:py-32 bg-[var(--surface)]">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-14 sm:mb-20 md:mb-24 fade-up">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 tracking-wide">Investment & Sizing</h2>
            <p className="text-[var(--muted)] text-xs sm:text-sm tracking-wide uppercase">Starting guide for custom originals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 fade-up">
            {[
              { size: 'Miniature / Pet', dim: '4" × 4" to 6" × 8"', price: 'Starting at ₹1,499', desc: 'Perfect for desk easels, bedside tables, or intimate gifts.' },
              { size: 'Medium Portrait', dim: '8" × 10" to 10" × 12"', price: 'Starting at ₹2,999', desc: 'Ideal for couple portraits, Ghibli-style memories, and study walls.', popular: true },
              { size: 'Masterpiece Canvas', dim: '12" × 16" to 18" × 24"+', price: 'Starting at ₹4,999', desc: 'A grand statement artwork with heavy textural detail and archival linen.' }
            ].map((tier, i) => (
              <div key={i} className={`p-6 sm:p-10 lg:p-12 border ${tier.popular ? 'border-[var(--gold)] bg-[var(--surface-2)] shadow-[0_0_40px_rgba(225,131,141,0.08)] transform lg:-translate-y-4' : 'border-[var(--border)] bg-[var(--bg)]'} flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2 rounded-sm`}>
                {tier.popular && <span className="section-label mb-6 block">Most Popular</span>}
                <h3 className="font-display text-3xl text-white mb-2">{tier.size}</h3>
                <p className="text-[var(--gold)] text-sm tracking-widest mb-6 font-mono">{tier.dim}</p>
                <p className="text-[var(--muted)] text-sm leading-loose mb-12 flex-grow max-w-[250px]">{tier.desc}</p>
                <div className="pt-8 border-t border-[rgba(225,131,141,0.15)] w-full">
                  <p className="font-display text-2xl text-white tracking-wide">{tier.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Inquiry Section: Google Form & Instagram DM ───────────── */}
      <section id="inquire" className="py-16 sm:py-24 md:py-32 bg-[var(--bg)] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Column: Direct Instagram DM & FAQ */}
          <div className="lg:col-span-5 space-y-10 fade-up">

            {/* Direct Contact Card (Instagram DM) */}
            <div className="p-8 border border-[rgba(225,131,141,0.3)] bg-gradient-to-br from-[#1b1520] via-[#151119] to-[#0e0c10] rounded-sm relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle,rgba(225,131,141,0.18)_0%,transparent_70%)] pointer-events-none" />

              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-11 h-11 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center flex-shrink-0 border border-[var(--accent)]/20">
                  <Instagram size={22} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold flex items-center gap-1">
                    <Sparkles size={11} />
                    Instant Direct Chat
                  </span>
                  <h3 className="font-editorial text-2xl text-white">DM on Instagram</h3>
                </div>
              </div>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 relative z-10">
                Prefer to chat directly instead of filling out a form? Send reference photos, ask for sizing advice, or discuss your budget in real-time with Awanti.
              </p>

              <div className="space-y-3 relative z-10">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-xs font-mono uppercase tracking-wider shadow-lg hover:shadow-[var(--accent)]/20"
                >
                  <Instagram size={16} />
                  <span>Open Instagram DM</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyDmMessage}
                  className="w-full py-2.5 px-4 border border-white/10 hover:border-[var(--accent)]/40 text-white/70 hover:text-white text-[11px] font-mono uppercase tracking-wider transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer bg-white/[0.03]"
                >
                  {copiedDm ? (
                    <>
                      <Check size={14} className="text-[var(--accent)]" />
                      <span>Copied! Opening Instagram...</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Inquiry & Open DM</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Direct handle:</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline font-semibold"
                >
                  @artsyauraa_
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="font-display text-3xl text-white mb-6 tracking-wide">Frequently Asked</h3>
              <div className="space-y-8">
                {[
                  {
                    q: 'How long does a custom commission take?',
                    a: 'Typically 2 to 4 weeks depending on the canvas size and detail. Rush orders for birthdays or anniversaries can be arranged on Instagram DM.'
                  },
                  {
                    q: 'How do I send my reference photo?',
                    a: 'You can upload it directly through the Google Form on the right, or simply message it to @artsyauraa_ on Instagram DM.'
                  },
                  {
                    q: 'Can I request adjustments during the painting phase?',
                    a: 'Yes! We send progress photos during the initial sketch and early color blocking so you can review and suggest minor adjustments before final varnish.'
                  },
                  {
                    q: 'Do you ship pan-India?',
                    a: 'Yes, every artwork is securely packed with corner guards and moisture-resistant wrapping to ensure pristine delivery.'
                  }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-white/5 pb-5">
                    <h4 className="text-white text-base font-medium mb-2 font-display tracking-wide">{faq.q}</h4>
                    <p className="text-[var(--muted)] text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Google Form */}
          <div className="lg:col-span-7 fade-up" style={{ animationDelay: '0.2s' }}>

            {/* Form Title & Fullscreen Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="atelier-stamp text-[9px]">
                    <FileText size={11} className="text-[var(--accent)]" />
                    INTAKE FORM
                  </span>
                  <span className="font-mono text-[10px] text-[var(--accent-light)] uppercase tracking-wider">
                    Takes ~2 Minutes
                  </span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-white">Start Your Commission</h2>
              </div>

              <a
                href={GOOGLE_FORM_EMBED_URL.replace('?embedded=true', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto py-1"
              >
                <span>Open in full tab</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Embedded Google Form Card */}
            <div className="relative border border-[rgba(225,131,141,0.25)] bg-[#140f17] rounded-sm overflow-hidden shadow-2xl">

              {/* Form Frame Header Bar */}
              <div className="px-4 py-3 bg-[#0d0a10] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block" />
                  <span className="text-[11px] uppercase tracking-wider text-white/80">Google Form Intake</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span>Or DM on IG</span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    <span>@artsyauraa_</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Iframe Viewport */}
              <div className="relative w-full min-h-[580px] sm:min-h-[720px] md:min-h-[820px] bg-[#120e15] flex flex-col items-center justify-center">

                {/* Loading state indicator */}
                {!isIframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#120e15] z-10 text-center p-6">
                    <div className="w-10 h-10 rounded-full border-2 border-[rgba(225,131,141,0.2)] border-t-[var(--accent)] animate-spin mb-3" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                      Loading Commission Form...
                    </span>
                    <span className="font-editorial text-xs text-white/40 mt-1 italic">
                      Google Forms secure connection
                    </span>
                  </div>
                )}

                <iframe
                  src={GOOGLE_FORM_EMBED_URL}
                  title="Awanti Art Custom Commission Google Form"
                  className="w-full min-h-[580px] sm:min-h-[720px] md:min-h-[820px] border-0"
                  onLoad={() => setIsIframeLoaded(true)}
                >
                  Loading Google Form…
                </iframe>
              </div>

              {/* Bottom helper bar */}
              <div className="p-4 bg-[#0d0a10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-white/50">
                <div className="flex items-center gap-2">
                  <MessageCircle size={13} className="text-[var(--accent)]" />
                  <span>Have questions before submitting?</span>
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-white transition-colors underline flex items-center gap-1"
                >
                  <span>Chat directly with Awanti on Instagram</span>
                  <ArrowRight size={11} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
