import React, { useState } from 'react';
import { Box, RotateCw, ExternalLink, Sparkles, Layers, Eye, ShieldCheck } from 'lucide-react';
import { asset } from '../utils/asset';

interface Interactive3DViewerProps {
  modelId?: string;
  title?: string;
  authorName?: string;
  authorUrl?: string;
  modelUrl?: string;
  heightClass?: string;
  showControlsHint?: boolean;
  className?: string;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  modelId = '7d39ef80acc24a3db30155b978010ac4',
  title = 'Chibi artist holding paintbrush and palette',
  authorName = 'LiquidRaven1346',
  authorUrl = 'https://sketchfab.com/LiquidRaven1346',
  modelUrl = 'https://sketchfab.com/3d-models/chibi-artist-holding-paintbrush-and-palette-7d39ef80acc24a3db30155b978010ac4',
  heightClass = 'h-[300px] sm:h-[400px] md:h-[520px]',
  showControlsHint = true,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  // Embed URL with optimized parameters: dark theme, transparent background, high performance, controls enabled
  const embedSrc = `https://sketchfab.com/models/${modelId}/embed?autostart=1&preload=1&transparent=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_controls=1&ui_hint=2`;

  return (
    <div className={`relative flex flex-col bg-[#141016] border border-[rgba(225,131,141,0.25)] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] ${className}`}>
      
      {/* ── Top Viewport Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0c10] border-b border-white/10 select-none">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="font-mono text-[10px] md:text-[11px] tracking-wider uppercase text-[var(--accent)] font-semibold flex items-center gap-1.5">
            <Box size={13} />
            <span>Interactive 3D Viewport</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle between 3D and Photo */}
          <div className="bg-[#1b151e] p-0.5 rounded-xs border border-white/10 flex items-center text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-2.5 py-1 rounded-xs transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[var(--accent)] text-[#0e0c10] font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <RotateCw size={11} className={viewMode === '3d' ? 'animate-spin-slow' : ''} />
              <span>3D Orbit</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('photo')}
              className={`px-2.5 py-1 rounded-xs transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'photo'
                  ? 'bg-[var(--accent)] text-[#0e0c10] font-bold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Eye size={11} />
              <span>Stills</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Viewport Container ── */}
      <div className={`relative w-full ${heightClass} bg-[#0c0a0e] overflow-hidden`}>
        
        {/* Loading Spinner Skeleton */}
        {viewMode === '3d' && !isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0a0e] z-10">
            <div className="w-12 h-12 rounded-full border-2 border-[rgba(225,131,141,0.2)] border-t-[var(--accent)] animate-spin mb-3" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              Loading 3D Miniature...
            </span>
            <span className="font-editorial text-xs text-[var(--accent-light)] mt-1 italic">
              Archival figurine prototype
            </span>
          </div>
        )}

        {/* 3D Sketchfab Iframe */}
        {viewMode === '3d' ? (
          <iframe
            title={title}
            src={embedSrc}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; xr-spatial-tracking; web-share"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div className="w-full h-full relative group">
            <img
              src={asset('/products/3d-mini-portrait.jpg')}
              alt="Hand-Painted 3D Mini Portrait"
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="atelier-stamp text-[9px] mb-2 inline-block">HAND-PAINTED SCULPT</span>
                <h4 className="font-editorial text-2xl text-white">Chibi Artist Prototype</h4>
                <p className="text-white/70 font-sans text-xs mt-1 max-w-md">
                  Demonstrating fine paintbrush details, hand-blended face gradients, and miniature palette colors.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Controls Overlay Hint */}
        {showControlsHint && viewMode === '3d' && isLoaded && (
          <div className="pointer-events-none absolute bottom-3 left-3 bg-[#0e0c10]/85 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xs border border-white/10 text-[9px] sm:text-[10px] font-mono text-white/70 flex items-center gap-2 shadow-lg">
            <RotateCw size={11} className="text-[var(--accent)] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Drag to rotate 360° • Scroll to zoom</span>
            <span className="sm:hidden">Touch & drag to rotate 360°</span>
          </div>
        )}

        {/* Corner Atelier Badge */}
        <div className="pointer-events-none absolute top-3 left-3 bg-[#0b0a0c]/85 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[rgba(225,131,141,0.3)] text-[9px] font-mono tracking-widest text-[var(--accent)] uppercase flex items-center gap-1.5">
          <Sparkles size={11} />
          <span>Awanti 3D Prototype</span>
        </div>
      </div>

      {/* ── Elegant Attribution & Specs Footer ── */}
      <div className="px-4 py-3 bg-[#0f0c12] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>Base 3D Model:</span>
          <a
            href={modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-light)] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>{title}</span>
            <ExternalLink size={11} />
          </a>
          <span>by</span>
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-[var(--accent)] underline"
          >
            {authorName}
          </a>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-white/40">
          <span className="flex items-center gap-1">
            <Layers size={11} className="text-[var(--accent)]" />
            <span>0.05mm SLA Resin</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-[var(--accent)]" />
            <span>Archival Acrylic</span>
          </span>
        </div>
      </div>
    </div>
  );
};

