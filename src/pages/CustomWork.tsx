import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CustomWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission for aesthetic purposes
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen relative bg-[var(--bg)]">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/products/custom/ghibli-beach-portrait.jpg" 
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
            From initial concept to the final varnish, every step is a dedicated exploration of aesthetic and emotion.
          </p>
          <div className="mt-10">
            <a href="#inquire" className="btn-gold" onClick={(e) => {
              e.preventDefault();
              document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>Start an Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-32 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16">
          <div className="text-center mb-24 fade-up">
            <span className="gold-line mb-8" />
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">The Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { num: '01', title: 'Consultation', desc: 'We discuss your vision, space, color palette, and preferred size. We can reference past works to find the perfect direction.' },
              { num: '02', title: 'Concept & Sketch', desc: 'Initial compositional sketches and color studies are presented for your review to ensure our visions align before painting begins.' },
              { num: '03', title: 'Creation', desc: 'The painting process takes 4-8 weeks. Progress updates are shared, allowing for minor adjustments along the way.' },
              { num: '04', title: 'Delivery', desc: 'Once the final varnish cures, the artwork is carefully packaged and shipped securely to your door, ready to hang.' }
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

      {/* Pricing & Sizing Guide */}
      <section className="py-32 bg-[var(--surface)]">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16">
          <div className="text-center mb-24 fade-up">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wide">Investment & Sizing</h2>
            <p className="text-[var(--muted)] text-sm tracking-wide uppercase">Base pricing for standard canvas sizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 fade-up">
            {[
              { size: 'Small', dim: '16" × 20"', price: 'Starting at $500', desc: 'Perfect for intimate spaces or creating a gallery wall.' },
              { size: 'Medium', dim: '24" × 36"', price: 'Starting at $1,200', desc: 'Ideal for dining areas, bedrooms, or above a credenza.', popular: true },
              { size: 'Large', dim: '36" × 48"+', price: 'Starting at $2,500', desc: 'A statement piece for living rooms or grand entryways.' }
            ].map((tier, i) => (
              <div key={i} className={`p-10 lg:p-12 border ${tier.popular ? 'border-[var(--gold)] bg-[var(--surface-2)] shadow-[0_0_40px_rgba(200,169,110,0.08)] transform lg:-translate-y-4' : 'border-[var(--border)] bg-[var(--bg)]'} flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2`}>
                {tier.popular && <span className="section-label mb-6 block">Most Popular</span>}
                <h3 className="font-display text-3xl text-white mb-2">{tier.size}</h3>
                <p className="text-[var(--gold)] text-sm tracking-widest mb-6 font-mono">{tier.dim}</p>
                <p className="text-[var(--muted)] text-sm leading-loose mb-12 flex-grow max-w-[250px]">{tier.desc}</p>
                <div className="pt-8 border-t border-[rgba(200,169,110,0.1)] w-full">
                  <p className="font-display text-2xl text-white tracking-wide">{tier.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form & FAQ */}
      <section id="inquire" className="py-32 bg-[var(--bg)] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* FAQ Column */}
          <div className="lg:col-span-5 space-y-16 fade-up">
            <div>
              <h2 className="font-display text-4xl text-white mb-10 tracking-wide">FAQ</h2>
              <div className="space-y-10">
                {[
                  { q: 'How long does a custom piece take?', a: 'Typically 4 to 8 weeks depending on the size and complexity of the piece, as well as current waitlist times.' },
                  { q: 'Do you require a deposit?', a: 'Yes, a 50% non-refundable deposit is required to begin the concept phase and secure your spot on the calendar. The remaining balance is due prior to shipping.' },
                  { q: 'Can I request changes during the process?', a: 'Absolutely. You will receive updates during the sketching phase and early painting stages, allowing for minor compositional or color adjustments.' }
                ].map((faq, i) => (
                  <div key={i}>
                    <h4 className="text-white text-base font-medium mb-3 font-display tracking-wide">{faq.q}</h4>
                    <p className="text-[var(--muted)] text-sm leading-loose">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold-dim)] transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-[var(--gold)] w-5 h-5" />
                <h3 className="font-display text-2xl text-white">Direct Contact</h3>
              </div>
              <p className="text-[var(--muted)] text-sm mb-6 leading-loose">Prefer to email directly instead of using the form?</p>
              <a href="mailto:studio@awanti.com" className="text-[var(--gold)] text-sm tracking-widest uppercase hover:text-white transition-colors font-mono">studio@awanti.com</a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 fade-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-display text-4xl text-white mb-10 tracking-wide">Start Your Inquiry</h2>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 border border-[var(--gold-dim)] bg-[var(--surface-2)] text-center flex flex-col items-center justify-center min-h-[500px]"
              >
                <CheckCircle2 className="w-16 h-16 text-[var(--gold)] mb-8" />
                <h3 className="font-display text-4xl text-white mb-6">Inquiry Received</h3>
                <p className="text-[var(--muted)] text-sm max-w-md mx-auto leading-loose mb-10">
                  Thank you for your interest in a custom piece. I will review your details and get back to you within 2-3 business days to discuss the next steps.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="btn-ghost"
                >
                  <span>Submit Another</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <label htmlFor="name" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Full Name *</label>
                    <input 
                      required
                      type="text" 
                      id="name"
                      className="w-full bg-transparent border-b border-[var(--border)] py-2 text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-base font-display tracking-wide"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      id="email"
                      className="w-full bg-transparent border-b border-[var(--border)] py-2 text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-base font-display tracking-wide"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <label htmlFor="size" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Desired Size</label>
                    <select 
                      id="size"
                      className="w-full bg-transparent border-b border-[var(--border)] py-2 text-[var(--muted)] focus:text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-base font-display tracking-wide appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[var(--surface-2)]">Select...</option>
                      <option value="small" className="bg-[var(--surface-2)] text-white">Small (16"x20")</option>
                      <option value="medium" className="bg-[var(--surface-2)] text-white">Medium (24"x36")</option>
                      <option value="large" className="bg-[var(--surface-2)] text-white">Large (36"x48"+)</option>
                      <option value="custom" className="bg-[var(--surface-2)] text-white">Custom Size</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label htmlFor="budget" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Budget Range</label>
                    <select 
                      id="budget"
                      className="w-full bg-transparent border-b border-[var(--border)] py-2 text-[var(--muted)] focus:text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-base font-display tracking-wide appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[var(--surface-2)]">Select...</option>
                      <option value="500-1000" className="bg-[var(--surface-2)] text-white">$500 - $1,000</option>
                      <option value="1000-2000" className="bg-[var(--surface-2)] text-white">$1,000 - $2,000</option>
                      <option value="2000-5000" className="bg-[var(--surface-2)] text-white">$2,000 - $5,000</option>
                      <option value="5000+" className="bg-[var(--surface-2)] text-white">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div className="relative pt-4">
                  <label htmlFor="message" className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">Tell me about your vision *</label>
                  <textarea 
                    required
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--border)] py-2 text-white focus:outline-none focus:border-[var(--gold)] transition-colors text-base font-display tracking-wide resize-none"
                    placeholder="Describe your ideas, color preferences..."
                  />
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="btn-gold w-full md:w-auto"
                  >
                    <span>{formStatus === 'submitting' ? 'Sending...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
