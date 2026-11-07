import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, Instagram, Check, Sparkles, Layers, ShieldCheck, ArrowRight, Palette, Clock } from 'lucide-react';
import { Interactive3DViewer } from './Interactive3DViewer';
import { INSTAGRAM_URL, UPCOMING_3D_PROJECT } from '../data';

interface ThreeDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreeDModal: React.FC<ThreeDModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleJoinWaitlist = () => {
    const message = `Hi Awanti! I saw the sneak peek of the Hand-Painted 3D Mini Portraits coming soon. Please add me to the early access waitlist!`;
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => {
        window.open(INSTAGRAM_URL, '_blank');
      }, 600);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 md:top-6 md:right-6 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 border border-white/10 rounded-full backdrop-blur-md z-[120] cursor-pointer transition-all"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#120f16] border border-[rgba(225,131,141,0.3)] rounded-sm overflow-hidden shadow-2xl my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* 3D Viewport Column */}
              <div className="lg:col-span-7 bg-[#0c0a0e] flex flex-col justify-center">
                <Interactive3DViewer
                  heightClass="h-[280px] sm:h-[380px] md:h-[460px] lg:h-[540px]"
                  className="border-0 rounded-none shadow-none"
                />
              </div>

              {/* Teaser Info & Waitlist Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#16121a]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="atelier-stamp text-[9px]">
                      <Sparkles size={11} className="text-[var(--accent)]" />
                      COMING SOON
                    </span>
                    <span className="font-mono text-[10px] text-[var(--accent-light)] uppercase tracking-widest flex items-center gap-1">
                      <Clock size={11} />
                      Atelier Sneak Peek
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-white leading-tight">
                    {UPCOMING_3D_PROJECT.title}
                  </h3>

                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                    <span className="font-mono text-[11px] text-[var(--accent)] font-semibold uppercase tracking-wider">
                      Currently in Prototyping
                    </span>
                  </div>

                  <p className="mt-4 text-white/70 font-sans text-xs sm:text-sm leading-relaxed">
                    {UPCOMING_3D_PROJECT.desc} We are merging precision 3D miniature crafting with the delicate warmth of traditional hand-painted acrylics.
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 space-y-2.5 pt-5 border-t border-white/10 text-xs font-mono text-white/75">
                    <div className="flex items-start gap-2.5">
                      <Layers size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span><strong>The Base:</strong> 3D-modeled & resin printed with 0.05mm precision</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Palette size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span><strong>The Artistry:</strong> 100% hand-painted by Awanti using micro-acrylics</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Box size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span><strong>The Format:</strong> Pocket-sized 4–5 inch desktop sculpture</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck size={14} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span><strong>The Seal:</strong> Matte UV archival coating on solid display pedestal</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Notice */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={handleJoinWaitlist}
                    className="w-full btn-gold py-3 px-6 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[var(--accent)]/20"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied! Opening Instagram...</span>
                      </>
                    ) : (
                      <>
                        <Instagram size={16} />
                        <span>Join Early Access on Instagram</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <p className="mt-2 text-center text-[10px] font-mono text-white/40">
                    Be the first to know when 3D commission slots open
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


