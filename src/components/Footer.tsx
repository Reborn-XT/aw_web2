import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { INSTAGRAM_URL } from '../data';

const NAV = [
  { to: '/gallery',     label: 'Gallery'     },
  { to: '/shop',        label: 'Shop'        },
  { to: '/custom-work', label: 'Custom Work' },
  { to: '/reviews',     label: 'Reviews'     },
  { to: '/about',       label: 'About'       },
  { to: '/contact',     label: 'Contact'     },
];

export const Footer = () => (
  <footer
    className="relative pt-24 pb-12 px-6 overflow-hidden"
    style={{
      background: '#09080b',
      borderTop: '1px solid rgba(225,131,141,0.12)',
    }}
  >
    {/* Ambient rose glow */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse, rgba(225,131,141,0.06) 0%, transparent 70%)',
      }}
    />

    <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center gap-10">

      {/* Logo */}
      <Link to="/" className="flex flex-col items-center group">
        <img
          src="/logok.svg"
          alt="Awanti"
          className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          style={{
            filter: 'drop-shadow(0px 0px 14px rgba(225,131,141,0.3))'
          }}
        />
        <span className="font-hand text-xl text-[var(--accent-light)] mt-2">
          ~ atelier d'artisan
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
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
          className="text-xs tracking-wider uppercase text-white/50"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          © 2026 Awanti Atelier. All original works hand-painted in India.
        </p>
      </div>
    </div>
  </footer>
);
