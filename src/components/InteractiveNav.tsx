import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GalleryTransition } from './GalleryTransition';

const navItems = [
  {
    id: 'gallery',
    label: 'Gallery',
    path: '/gallery',
    artistImg: '/artist_poses/gallery_pose1.png',
    navImg: '/nav_items/pandas.jpg',
    position: { top: '24%', left: '26%' },
    rotation: -4,
    frameType: 'brush',
    sizeClass: 'w-36 h-36 lg:w-48 lg:h-48'
  },
  {
    id: 'about',
    label: 'About The Artist',
    path: '/about',
    artistImg: '/artist_poses/about_pose1.png',
    navImg: '/nav_items/about.jpg',
    position: { top: '24%', left: '74%' },
    rotation: 5,
    frameType: 'gold',
    sizeClass: 'w-34 h-44 lg:w-46 lg:h-56'
  },
  {
    id: 'review',
    label: 'Collector Stories',
    path: '/stories',
    artistImg: '/artist_poses/review_pose1.png',
    navImg: '/nav_items/custom.jpeg',
    position: { top: '70%', left: '28%' },
    rotation: 3,
    frameType: 'wood',
    sizeClass: 'w-40 h-28 lg:w-52 lg:h-38'
  },
  {
    id: 'custom',
    label: 'Custom Commission',
    path: '/custom-work',
    artistImg: '/artist_poses/custom_order_pose1.png',
    navImg: '/nav_items/easel.png',
    position: { top: '68%', left: '74%' },
    rotation: -5,
    frameType: 'canvas',
    sizeClass: 'w-34 h-44 lg:w-44 lg:h-54'
  },
];

const getFrameStyle = (type: string) => {
  switch (type) {
    case 'gold':
      return {
        border: '5px solid #2a2024',
        outline: '1px solid rgba(225,131,141,0.4)',
        background: 'linear-gradient(135deg, #1f181c 0%, #140f12 100%)',
        padding: '5px',
        boxShadow: '0 14px 32px rgba(0,0,0,0.65), inset 0 0 12px rgba(0,0,0,0.8), 0 0 20px rgba(225,131,141,0.22)',
        borderRadius: '3px',
      };
    case 'brush':
      return {
        WebkitMaskImage: 'url(/brush-mask.svg)',
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: 'url(/brush-mask.svg)',
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.6))',
      };
    case 'wood':
      return {
        border: '7px solid #2d1e25',
        backgroundImage: 'linear-gradient(135deg, #38242e 0%, #22141b 100%)',
        padding: '4px',
        boxShadow: '0 10px 24px rgba(0,0,0,0.55), inset 0 0 8px rgba(0,0,0,0.7)',
        borderRadius: '4px',
      };
    case 'canvas':
      return {
        border: '2px solid #ede8e3',
        background: '#f9f6f2',
        padding: '8px 8px 22px 8px',
        boxShadow: '0 10px 26px rgba(0,0,0,0.3)',
        borderRadius: '1px',
      };
    default:
      return {};
  }
};

const getPlaqueComponent = (type: string, label: string) => {
  switch (type) {
    case 'gold':
      return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e1838d] via-[#f0a3ab] to-[#e1838d] px-3 py-0.5 rounded text-[8px] lg:text-[10px] text-stone-950 font-bold border border-[#b85a66] shadow-lg whitespace-nowrap tracking-widest uppercase font-sans">
          {label}
        </div>
      );
    case 'brush':
      return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] lg:text-[11px] text-white/90 bg-[#0e0d0f]/80 backdrop-blur-sm rounded border border-white/10 font-mono tracking-widest uppercase">
          {label}
        </div>
      );
    case 'wood':
      return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#38242e] px-2.5 py-0.5 rounded text-[8px] lg:text-[10px] text-rose-100 font-semibold border border-[#523342] shadow-md whitespace-nowrap tracking-wide font-sans">
          {label}
        </div>
      );
    case 'canvas':
      return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#fcfbf9] px-2.5 py-0.5 rounded text-[9px] lg:text-[11px] text-stone-800 italic border border-stone-200 shadow-sm whitespace-nowrap font-serif tracking-wider">
          {label}
        </div>
      );
    default:
      return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] lg:text-xs font-display text-[var(--accent)] tracking-widest whitespace-nowrap drop-shadow-sm">
          {label}
        </div>
      );
  }
};

export const InteractiveNav = () => {
  const [hoveredSection, setHoveredSection] = useState('default');

  const currentImg = hoveredSection === 'default'
    ? '/artist_poses/default_pose1.png'
    : navItems.find(item => item.id === hoveredSection)?.artistImg || '/artist_poses/default_pose1.png';

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--bg)] border-y border-[rgba(225,131,141,0.12)] overflow-hidden relative min-h-[700px] flex items-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center relative z-10 h-full">

        {/* Left Side: Character Image (The Artist) */}
        <div className="w-full md:w-5/12 flex flex-col items-center justify-center relative z-20">
          <div className="relative w-full h-[400px] md:h-[620px] flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={hoveredSection}
                src={currentImg}
                alt="The Artist"
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, x: -20, filter: 'blur(5px)', scaleX: (hoveredSection === 'about' || hoveredSection === 'review') ? -1 : 1 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scaleX: (hoveredSection === 'about' || hoveredSection === 'review') ? -1 : 1 }}
                exit={{ opacity: 0, x: 20, filter: 'blur(5px)', scaleX: (hoveredSection === 'about' || hoveredSection === 'review') ? -1 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent)] uppercase">
              Meet Awanti · The Atelier
            </p>
          </div>
        </div>

        {/* Right Side: Gallery Wall Navigation Menu */}
        <div className="w-full md:w-7/12 relative h-[500px] md:h-[650px] hidden md:flex">
          {navItems.map((item) => {
            const sharedStyle = {
              position: 'absolute' as const,
              left: item.position.left,
              top: item.position.top,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              zIndex: hoveredSection === item.id ? 50 : 10,
            };

            // gallery item handles its own paint wash transition
            if (item.id === 'gallery') {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  onMouseLeave={() => setHoveredSection('default')}
                  style={sharedStyle}
                >
                  <GalleryTransition targetPath={item.path} rotation={item.rotation} imgSrc={item.navImg}>
                    <motion.div
                      className={`relative group ${item.sizeClass} flex items-center justify-center cursor-pointer overflow-hidden`}
                      style={getFrameStyle(item.frameType)}
                      whileHover={{
                        scale: 1.07,
                        rotate: item.rotation + (item.rotation > 0 ? 2 : -2)
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    >
                      <img
                        src={item.navImg}
                        alt={item.label}
                        className="w-full h-full object-cover rounded-[2px] transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="rgba(200,169,110,0.1)" rx="20"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(200,169,110,0.8)" font-family="sans-serif" font-size="12">Image</text></svg>';
                        }}
                      />
                      {/* Canvas glaze overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-40 mix-blend-overlay z-10" />

                      {/* Specular light sweep on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />

                      {getPlaqueComponent(item.frameType, item.label)}
                    </motion.div>
                  </GalleryTransition>
                </div>
              );
            }

            // All other items (About, Review, Custom Order) use standard Link with museum-grade frames & light sweep
            return (
              <Link
                key={item.id}
                to={item.path}
                onMouseEnter={() => setHoveredSection(item.id)}
                onMouseLeave={() => setHoveredSection('default')}
                style={sharedStyle}
              >
                <motion.div
                  className={`relative group ${item.sizeClass} flex items-center justify-center cursor-pointer overflow-hidden`}
                  style={getFrameStyle(item.frameType)}
                  whileHover={{
                    scale: 1.07,
                    rotate: item.rotation + (item.rotation > 0 ? 2 : -2)
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  <img
                    src={item.navImg}
                    alt={item.label}
                    className="w-full h-full object-cover rounded-[2px] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="rgba(200,169,110,0.1)" rx="20"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(200,169,110,0.8)" font-family="sans-serif" font-size="12">Image</text></svg>';
                    }}
                  />
                  {/* Canvas glaze overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-40 mix-blend-overlay z-10" />

                  {/* Specular light sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />

                  {getPlaqueComponent(item.frameType, item.label)}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View: Fallback to vertical stack */}
        <div className="w-full flex md:hidden flex-col gap-8 items-center mt-12 relative z-30">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.id}`}
              to={item.path}
              className="group flex flex-col items-center"
            >
              <div className="w-36 h-36 mb-4">
                <img src={item.navImg} alt={item.label} className="w-full h-full object-contain rounded-md shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="rgba(200,169,110,0.1)" rx="20"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(200,169,110,0.8)" font-family="sans-serif" font-size="12">Image</text></svg>';
                  }} />
              </div>
              <span className="font-display text-xl text-[var(--gold)]">{item.label}</span>
            </Link>
          ))}
        </div>

      </div>

      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[130px] opacity-10"
        style={{ background: 'radial-gradient(circle, #2ba3a7, transparent 75%)' }}
      />
    </section>
  );
};
