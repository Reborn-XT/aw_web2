# Awanti Art — Atelier Hand-Painted Originals

Official web showcase and digital atelier for **Awanti Art**, celebrating slow, tactile craftsmanship. Hand-painted acrylics, watercolours, fantasy landscapes, and bespoke portrait commissions crafted with archival-grade pigments in India.

---

## 🎨 Tech Stack & Architecture

- **Runtime & Bundler:** [Vite 7](https://vite.dev/) (React 19 + TypeScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Animations & Interactions:** [Framer Motion 12](https://motion.dev/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **3D & Canvas Graphics:** [Three.js](https://threejs.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or v24+
- **npm**: v10+

### Installation & Run

```bash
# 1. Clone repository
git clone git@github.com:Reborn-XT/aw_web2.git
cd aw_web2

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

The dev server will run locally at `http://localhost:5173/`.

---

## 📁 Project Directory Structure

```text
awanti-web/
├── public/
│   ├── artist_poses/      # Character illustration poses for InteractiveNav
│   ├── hero/              # High-res canvas slides featured in Hero slideshow
│   ├── nav_items/         # Framed navigation thumbnails
│   ├── products/          # Full painting archive images & /custom/ commission works
│   └── logok.svg          # Atelier brand monogram
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx       # Smooth dual-ring cursor tracking pointer on desktop
│   │   ├── Footer.tsx             # Atelier footer, social links & copyright
│   │   ├── GalleryTransition.tsx  # Dynamic fluid paint wash transition on page switch
│   │   ├── Hero.tsx               # Editorial split-screen canvas hero with Ken Burns fx
│   │   ├── ImageModal.tsx         # Fullscreen artwork inspection modal
│   │   ├── InteractiveNav.tsx     # Character pose navigation wall menu
│   │   ├── Navbar.tsx             # Floating backdrop-blur navigation bar & mobile drawer
│   │   └── Preloader.tsx          # Initial brand entrance curtain preloader
│   ├── pages/
│   │   ├── Home.tsx               # Landing page (Hero, Atelier, Grid, Process, Commissions, Reviews)
│   │   ├── Gallery.tsx            # Full categorized exhibition archive
│   │   ├── Shop.tsx               # Direct art acquisition & Instagram enquiry checkout
│   │   └── CustomWork.tsx         # Bespoke commission storytelling & order process
│   ├── data.ts                    # Central database for paintings, reviews, and social URLs
│   ├── index.css                  # Design tokens, palette vars, Tailwind v4 layers & typography
│   ├── App.tsx                    # Route definitions, Lenis initialization & Page transitions
│   └── main.tsx                   # React root mount
├── index.html                     # HTML entry point, Google Fonts preconnects & SEO metadata
├── vite.config.ts                 # Vite bundler plugins & server config
├── package.json                   # Dependencies & npm build scripts
└── tsconfig.json                  # TypeScript compiler options
```

---

## 🖋️ Design System & Critical Developer Guidelines

### 1. Atelier Rose & Obsidian Palette (CSS Variables)
Defined in `src/index.css`:
- `--bg`: `#0e0d0f` (Deep Obsidian)
- `--surface`: `#171419`
- `--surface-2`: `#221d25`
- `--accent`: `#e1838d` (Atelier Rose)
- `--accent-light`: `#f0a3ab`
- `--accent-dim`: `rgba(225, 131, 141, 0.16)`
- `--gold`: `var(--accent)`
- `--text`: `#f5f2ed` (Warm linen paper)
- `--muted`: `#8d8480`

### 2. Typography Hierarchy
Google Fonts loaded in `index.html`:
- **Display Serif:** `Cormorant Garamond` (Classic luxury titles & captions)
- **Editorial Serif:** `Playfair Display` (Article & exhibition headings)
- **Handwritten:** `Reenie Beanie` (Personal artist annotations & stamps)
- **Body:** `DM Sans` (Clean, legible geometric sans-serif)
- **Monospace:** `Space Mono` (Artwork specs, serial numbers, tags)

> [!IMPORTANT]
> **Tailwind CSS v4 Layer Precedence Rule:**
> In Tailwind CSS v4, any unlayered CSS rule outside `@layer` takes priority over `@layer utilities`. All global CSS resets and body defaults **must remain inside `@layer base`** in `src/index.css`. Never place unlayered universal resets like `* { margin: 0; padding: 0; }` outside `@layer base`, as this crushes Tailwind's `mx-auto`, `p-*`, and `m-*` utility classes.

### 3. Text Spacing Standards
- **Monospace uppercase labels:** Keep tracking restrained to `tracking-[0.1em]` to `tracking-[0.12em]`. Overly high letter spacing (`> 0.25em`) eliminates distinct space between words.
- **Display Headings:** Maintain line heights of `leading-[1.05]` to `leading-[1.2]` on multiline serif titles to avoid vertical character collisions.

### 4. Layout & Viewport Boundaries
- Both `html` and `body` must maintain `overflow-x: hidden; max-width: 100vw;` to prevent horizontal overflow and right-side whitespace gaps on ultra-wide screens.
- Use `max-w-7xl mx-auto` for content containers to ensure uniform horizontal centering across desktop resolutions.

---

## 🖼️ How to Add or Update Artworks

To add a new painting to the website:

1. Place the artwork image in `public/products/`.
2. Open `src/data.ts`.
3. Add a new entry to the `PAINTINGS` array:

```ts
{
  id: 29,
  title: 'Your Painting Title',
  price: 1999,
  size: '8×10 in',
  medium: 'Acrylic',
  cat: 'Landscape', // 'Mini' | 'Landscape' | 'Cute' | 'Fantasy' | 'Statement' | 'Pop' | 'Masterpiece' | 'Portrait' | 'Commission'
  status: 'Available', // 'Available' | 'Sold Out' | 'Waitlist'
  img: '/products/your-image.jpg',
  featured: true // optional: true to feature on hero/editorial highlights
}
```

The Gallery and Shop will automatically parse, sort, filter, and display the new artwork.

---

## 📦 Deployment

The project builds to a fully static distribution folder (`dist/`) and can be deployed directly to:
- **Vercel**: Connect repository, framework preset `Vite`, build command `npm run build`, output directory `dist`.
- **Netlify**: Build command `npm run build`, publish directory `dist`.
- **GitHub Pages / Cloudflare Pages**: Connect `main` branch with `dist/` output.
