
export type Painting = {
  id: number;
  title: string;
  price: number;
  size: string;
  medium: string;
  cat: string;
  status: 'Available' | 'Sold Out' | 'Waitlist';
  img: string;
  featured?: boolean;
};

export type Review = {
  id: number;
  user: string;
  role: string;
  text: string;
  rating: number;
  date: string;
};

/* ── Hero slideshow — 7 best paintings ───────────────────────────── */
export const HERO_PAINTINGS = [
  { img: '/hero/serene-nature.jpg',   title: 'Blossom & Flight',    cat: 'Nature' },
  { img: '/hero/showcase-1.jpeg',     title: 'Every Second Counts', cat: 'Commission' },
  { img: '/hero/showcase-2.jpeg',     title: 'Golden Horizon',      cat: 'Seascape' },
  { img: '/hero/showcase-01.jpeg',    title: 'Affection',           cat: 'Illustration' },
  { img: '/hero/showcase-3.jpeg',     title: 'Guiding Light',       cat: 'Silhouette' },
  { img: '/hero/showcase-4.jpeg',     title: 'Coastal Memories',    cat: 'Portrait' },
  { img: '/hero/showcase-5.jpeg',     title: 'Sisters in Bloom',    cat: 'Portrait' },
];

/* ── Full painting inventory ─────────────────────────────────────── */
export const PAINTINGS: Painting[] = [
  { id: 1,  title: 'Serene Nature',       price: 249,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Mini',       status: 'Available',  img: '/products/Serene Nature Art.jpg',          featured: false },
  { id: 2,  title: 'Sunset Silhouette',   price: 299,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Mini',       status: 'Sold Out',   img: '/products/Sunset Silhouette Art.jpg',      featured: false },
  { id: 3,  title: 'Twilight Landscape',  price: 299,  size: '4×4 in',  medium: 'Watercolour', cat: 'Mini',       status: 'Sold Out',   img: '/products/Twilight Landscape Art.jpg',     featured: false },
  { id: 4,  title: 'Panda & Bamboo',      price: 450,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Cute',       status: 'Sold Out',   img: '/products/Cute  Animal Art.jpg',           featured: false },
  { id: 5,  title: 'Urban Cityscape',     price: 449,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Mini',       status: 'Available',  img: '/products/Cityscape.jpg',                  featured: false },
  { id: 6,  title: 'Magical World',       price: 349,  size: '4×4 in',  medium: 'Gouache',     cat: 'Fantasy',    status: 'Sold Out',   img: '/products/Magical world Art.jpg',          featured: false },
  { id: 7,  title: 'Flamingo Queen',      price: 799,  size: '8×8 in',  medium: 'Acrylic',     cat: 'Statement',  status: 'Available',  img: '/products/Flamingo Queen.jpg',             featured: true  },
  { id: 8,  title: 'Deadpool & Wolverine',price: 599,  size: '8×8 in',  medium: 'Acrylic',     cat: 'Pop',        status: 'Sold Out',   img: '/products/Deadpool and Wolverine.jpg',     featured: false },
  { id: 9,  title: 'Fairytale Landscape', price: 1499, size: '6×8 in',  medium: 'Acrylic',     cat: 'Landscape',  status: 'Available',  img: '/products/Fairytale Landscape Art.jpg',    featured: true  },
  { id: 10, title: 'Peaceful Evening',    price: 1899, size: '6×8 in',  medium: 'Acrylic',     cat: 'Landscape',  status: 'Available',  img: '/products/Peaceful Evening Art.jpg',       featured: true  },
  { id: 11, title: 'Italian Town',        price: 3299, size: '6×8 in',  medium: 'Acrylic',     cat: 'Masterpiece',status: 'Sold Out',   img: '/products/Italian-style town.jpg',         featured: false },
  { id: 12, title: 'Custom Ghibli Style', price: 3499, size: '6×8 in',  medium: 'Digital+Acrylic', cat: 'Commission', status: 'Waitlist', img: '/products/custom/ghibli-beach-portrait.jpg', featured: false },
  { id: 13, title: 'Sunset Love',         price: 4999, size: '12×16 in',medium: 'Acrylic',     cat: 'Masterpiece',status: 'Sold Out',   img: '/products/Sunset Love Landscape Art.jpg',  featured: false },
  { id: 14, title: 'Khushi Birthday',     price: 1299, size: '8×10 in', medium: 'Acrylic',     cat: 'Portrait',   status: 'Sold Out',   img: '/products/custom/khushi-birthday.jpg',     featured: false },
  { id: 15, title: 'Prastuti Logo',       price: 499,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Mini',       status: 'Sold Out',   img: '/products/custom/prastuti-logo-mini.jpg',  featured: false },
  { id: 16, title: 'Golden Horizon',      price: 599,  size: '4×4 in',  medium: 'Acrylic',     cat: 'Mini',       status: 'Sold Out',   img: '/products/custom/golden-horizon.jpg',      featured: false },
  { id: 17, title: 'Couple Portrait',     price: 2499, size: '8×8 in',  medium: 'Acrylic',     cat: 'Portrait',   status: 'Sold Out',   img: '/products/custom/couple-portrait.jpg',     featured: false },
  { id: 18, title: 'Tree with White Flowers', price: 899, size: '5×5 in', medium: 'Acrylic',   cat: 'Mini',       status: 'Sold Out',   img: '/products/custom/tree-flowers-mini.jpg',   featured: false },
  { id: 19, title: 'Every Second Counts', price: 3499, size: '8×10 in', medium: 'Acrylic',     cat: 'Commission', status: 'Sold Out',   img: '/products/custom/every-second-counts.jpg', featured: false },
  { id: 20, title: 'Affection',           price: 499,  size: '5×7 in',  medium: 'Acrylic',     cat: 'Cute',       status: 'Sold Out',   img: '/products/custom/affection.jpg',           featured: false },
  { id: 21, title: 'Guiding Light',       price: 599,  size: '4×6 in',  medium: 'Acrylic',     cat: 'Silhouette', status: 'Sold Out',   img: '/products/custom/guiding-light.jpg',       featured: false },
  { id: 22, title: 'Coastal Memories',    price: 2499, size: '8×10 in', medium: 'Acrylic',     cat: 'Portrait',   status: 'Sold Out',   img: '/products/custom/coastal-memories.jpg',    featured: false },
  { id: 23, title: 'Anniversary Love',    price: 2499, size: '8×10 in', medium: 'Acrylic',     cat: 'Portrait',   status: 'Sold Out',   img: '/products/custom/anniversary-love.jpg',    featured: false },
  { id: 24, title: 'Always Us',           price: 2499, size: '8×10 in', medium: 'Acrylic',     cat: 'Portrait',   status: 'Sold Out',   img: '/products/custom/shrushti-birthday.jpg',   featured: false },
  { id: 25, title: 'Mochi Cats Hug',      price: 499,  size: '6×6 in',  medium: 'Acrylic',     cat: 'Cute',       status: 'Sold Out',   img: '/products/custom/mochi-cats-hug.jpg',      featured: false },
  { id: 26, title: 'Mochi Cats Love',      price: 499,  size: '6×6 in',  medium: 'Acrylic',     cat: 'Cute',       status: 'Sold Out',   img: '/products/custom/mochi-cats-love.jpg',     featured: false },
  { id: 27, title: 'Sunset Promise',      price: 799,  size: '6×6 in',  medium: 'Acrylic',     cat: 'Silhouette', status: 'Sold Out',   img: '/products/custom/couple-sunset-dheeraj.jpg', featured: false },
  { id: 28, title: 'Ghibli Father & Daughter', price: 3499, size: '8×10 in', medium: 'Acrylic', cat: 'Commission', status: 'Sold Out',   img: '/products/custom/ghibli-father-daughter.png', featured: false },
];

/* ── Available paintings (for Shop page teaser) ──────────────────── */
export const AVAILABLE = PAINTINGS.filter(p => p.status === 'Available');

/* ── Featured paintings (for home editorial section) ─────────────── */
export const FEATURED = PAINTINGS.filter(p => p.featured);

/* ── Reviews ─────────────────────────────────────────────────────── */
export const REVIEWS: Review[] = [
  {
    id: 1,
    user: 'Aarav P.',
    role: 'Art Collector',
    text: 'The texture is unbelievable. I find myself staring at the Italian Town piece for hours. It brings such a warm, nostalgic energy to my study.',
    rating: 5,
    date: 'March 2026',
  },
  {
    id: 2,
    user: 'Meera S.',
    role: 'Interior Designer',
    text: 'I commissioned a Ghibli-style portrait for my sister\'s wedding. The team captured the emotion perfectly. The process was transparent and the result — magical.',
    rating: 5,
    date: 'February 2026',
  },
  {
    id: 3,
    user: 'Rohan K.',
    role: 'Verified Buyer',
    text: 'Awanti Art isn\'t just selling paintings; they are selling feelings. Packaged with care and arrived fast. Already ordered my second piece.',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 4,
    user: 'Priya N.',
    role: 'Gift Buyer',
    text: 'Gifted the Flamingo Queen to my mother — she absolutely loves it. The colours are so vivid in person. Highly recommend!',
    rating: 5,
    date: 'April 2026',
  },
];

/* ── Instagram ───────────────────────────────────────────────────── */
export const INSTAGRAM_URL = 'https://www.instagram.com/artsyauraa_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

/* ── Commission process steps ────────────────────────────────────── */
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discuss',
    desc: 'Share your vision — a reference image, a mood, a memory. We talk through size, medium, and what the painting should feel like.',
  },
  {
    step: '02',
    title: 'Sketch',
    desc: 'A rough sketch or composition preview is shared for your approval before a single brushstroke of paint is applied.',
  },
  {
    step: '03',
    title: 'Paint',
    desc: 'Your painting comes to life. Expect periodic progress updates so you can follow the creation journey.',
  },
  {
    step: '04',
    title: 'Deliver',
    desc: 'Carefully packaged and shipped to your door — or available for local pickup. Ready to hang from day one.',
  },
];
