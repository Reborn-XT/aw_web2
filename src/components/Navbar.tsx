import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Instagram, X, Menu } from 'lucide-react';
import { INSTAGRAM_URL } from '../data';

const NAV_LINKS = [
  { to: '/',            label: 'Home'        },
  { to: '/gallery',     label: 'Gallery'     },
  { to: '/shop',        label: 'Shop'        },
  { to: '/custom-work', label: 'Custom Work' },
  { to: '/stories',     label: 'Stories'     },
  { to: '/about',       label: 'About'       },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  /* Close drawer on route change */
  useEffect(() => { setOpen(false); }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(14,13,15,0.92)'
            : 'linear-gradient(to bottom, rgba(14,13,15,0.7), transparent)',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(225,131,141,0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">

          {/* Logo with faint ambient glow */}
          <Link to="/" className="relative flex items-center group py-2">
            {/* Ambient soft glow backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto w-32 h-12 rounded-full pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(245, 235, 225, 0.22) 0%, rgba(225, 131, 141, 0.2) 45%, rgba(225, 131, 141, 0.05) 75%, transparent 100%)',
                filter: 'blur(10px)',
                transform: 'scale(1.2)',
              }}
            />
            <img
              src="/logok.svg"
              alt="Awanti"
              className="h-10 md:h-12 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              style={{
                filter: 'drop-shadow(0px 0px 5px rgba(245,242,237,0.45)) drop-shadow(0px 0px 16px rgba(225,131,141,0.55)) drop-shadow(0px 0px 30px rgba(225,131,141,0.25))'
              }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[var(--gold)] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden text-white/60 hover:text-white transition-colors"
              style={{ transition: 'color 0.2s, transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)' }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.88)')}
              onMouseUp={e => (e.currentTarget.style.transform = '')}
              onMouseLeave={e => (e.currentTarget.style.transform = '')}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col pt-24 pb-12 px-10 gap-8 md:hidden"
              style={{ background: '#141210', borderLeft: '1px solid rgba(200,169,110,0.1)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white"
              >
                <X size={22} />
              </button>

              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-2xl leading-none transition-colors duration-300 ${
                        isActive
                          ? 'text-[var(--gold)]'
                          : 'text-white/50 hover:text-white'
                      }`
                    }
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-3 text-white/30 hover:text-[var(--gold)] transition-colors text-xs tracking-widest uppercase"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span>Instagram</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
