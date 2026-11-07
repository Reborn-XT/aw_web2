import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string | null;
  altText?: string;
}

export const ImageModal = ({ isOpen, onClose, imgSrc, altText = 'Artwork' }: ImageModalProps) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScale(1);
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

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(s => Math.min(s + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(s => Math.max(s - 0.5, 0.5));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setScale(s => Math.min(s + 0.1, 4));
    } else {
      setScale(s => Math.max(s - 0.1, 0.5));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && imgSrc && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 overflow-hidden"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md z-20 cursor-pointer"
            style={{ transition: 'color 0.2s ease, background 0.2s ease, transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)' }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={e => (e.currentTarget.style.transform = '')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
            aria-label="Close image"
          >
            <X size={24} />
          </button>
          
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md px-4 py-2 rounded-full z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleZoomOut} className="text-white/70 hover:text-white p-2 transition-colors cursor-pointer" aria-label="Zoom Out">
              <ZoomOut size={20} />
            </button>
            <span className="text-white/70 font-mono text-sm min-w-[3.5rem] text-center select-none">
              {Math.round(scale * 100)}%
            </span>
            <button onClick={handleZoomIn} className="text-white/70 hover:text-white p-2 transition-colors cursor-pointer" aria-label="Zoom In">
              <ZoomIn size={20} />
            </button>
          </div>
          
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
          >
            <motion.img
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.08}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                scale: { type: 'spring', duration: 0.4, bounce: 0.15 } 
              }}
              src={imgSrc}
              alt={altText}
              className="max-w-full max-h-[90vh] md:max-h-full object-contain shadow-2xl rounded-sm pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                if (scale === 1) {
                  setScale(2);
                } else {
                  setScale(1);
                }
              }}
              onWheel={handleWheel}
              whileDrag={{ cursor: 'grabbing' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
