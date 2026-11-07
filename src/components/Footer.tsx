import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { INSTAGRAM_URL } from '../data';
import { asset } from '../utils/asset';

const NAV = [
  { to: '/gallery',     label: 'Gallery'     },
  { to: '/shop',        label: 'Shop'        },
  { to: '/custom-work', label: 'Custom Work' },
  { to: '/stories',     label: 'Stories'     },
  { to: '/about',       label: 'About'       },
  { to: '/contact',     label: 'Contact'     },
];

export const Footer = () => (
  <footer
    className="relative pt-16 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 overflow-hidden"
    style={{
      background: '#09080b',
      borderTop: '1px solid rgba(225,131,141,0.12)',
    }}
  >
    {/* Ambient rose glow */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] h-[180px] pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse, rgba(225,131,141,0.06) 0%, transparent 70%)',
      }}
    />

    <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center gap-8 sm:gap-10">

      {/* Logo with ambient faint glow */}
      <Link to="/" className="relative flex flex-col items-center group py-2">
        {/* Ambient faint glow backdrop */}
        <div
          aria-hidden="true"
          className="absolute top-2 w-36 h-14 rounded-full pointer-events-none transition-opacity duration-500 opacity-75 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245, 235, 225, 0.2) 0%, rgba(225, 131, 141, 0.18) 45%, rgba(225, 131, 141, 0.04) 75%, transparent 100%)',
            filter: 'blur(10px)',
            transform: 'scale(1.2)',
          }}
        />
        <img
          src={asset('/logok.svg')}
          alt="Awanti"
          className="h-12 md:h-14 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
          style={{
            filter: 'drop-shadow(0px 0px 5px rgba(245,242,237,0.4)) drop-shadow(0px 0px 18px rgba(225,131,141,0.5))'
          }}
        />
        <span className="font-hand text-xl text-[var(--accent-light)] mt-2 relative z-10">
          ~ atelier d'artisan
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex flex-wrap justify-center gap-x-5 sm:gap-x-8 gap-y-2.5">
        {NAV.map(({ to, label }) => (
          <Link key={to} to={to} className="footer-link hover:text-[var(--accent)] font-mono text-xs tracking-wider">
            {label}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="w-full" style={{ height: '1px', background: 'rgba(225,131,141,0.1)' }} />

      {/* Social + copyright */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={17} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:awanti@example.com"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300"
            aria-label="Email"
          >
            <Mail size={17} strokeWidth={1.5} />
          </a>
        </div>

        <p
          className="text-[11px] sm:text-xs tracking-wider uppercase text-white/50 text-center px-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          © 2026 Awanti Atelier. All original works hand-painted in India.
        </p>
      </div>
    </div>
  </footer>
);
