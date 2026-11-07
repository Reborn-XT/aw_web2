import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const playDripTransition = (targetColorHex: string, rect: DOMRect, onCovered: () => void) => {
  // SVG Goo Filter
  const svgId = 'drip-goo-svg';
  let svg = document.getElementById(svgId);
  if (!svg) {
    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.id = svgId;
    newSvg.setAttribute('style', 'position:absolute; top:-9999px;');
    newSvg.innerHTML = `
      <defs>
          <filter id="drip-goo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
              <feColorMatrix id="drip-colorMatrix" in="blur" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 45 -20" />
          </filter>
      </defs>
    `;
    document.body.appendChild(newSvg);
    svg = newSvg as unknown as HTMLElement;
  }

  // Canvas setup
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:99999; pointer-events:none; filter:url(#drip-goo); transition: opacity 0.6s ease;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  // Extract RGB from hex
  let r = parseInt(targetColorHex.slice(1, 3), 16) / 255;
  let g = parseInt(targetColorHex.slice(3, 5), 16) / 255;
  let b = parseInt(targetColorHex.slice(5, 7), 16) / 255;
  
  const matrix = `
      0 0 0 0 ${r}
      0 0 0 0 ${g}
      0 0 0 0 ${b}
      0 0 0 50 -25
  `;
  document.getElementById('drip-colorMatrix')!.setAttribute('values', matrix);

  let drops: any[] = [];
  let f = 0;

  // Animation Timing
  const GROW_PHASE = 40; 
  const WASH_PHASE = 45; 
  const HOLD_PHASE = 15; 
  const OPEN_PHASE = 40; 
  const TOTAL_FRAMES = GROW_PHASE + WASH_PHASE + HOLD_PHASE + OPEN_PHASE;

  let cx = rect.left + rect.width / 2;
  let cy = rect.top + rect.height / 2;
  let startR = Math.max(rect.width, rect.height) / 1.5; // Enough to cover the painting
  let targetR = Math.sqrt(Math.max(cx, W - cx) ** 2 + Math.max(cy, H - cy) ** 2) + 100;

  let numAnchors = 24;
  let anchors: any[] = [];
  for (let i = 0; i < numAnchors; i++) {
      anchors.push({
          angle: (i / numAnchors) * Math.PI * 2,
          speed: 0.05 + Math.random() * 0.05,
          phase: Math.random() * Math.PI * 2,
          variance: 0.1 + Math.random() * 0.15
      });
  }

  let coveredTriggered = false;

  const loop = () => {
      ctx.clearRect(0, 0, W, H);
      f++;

      let currentR = 0;

      if (f < GROW_PHASE) {
          let p = f / GROW_PHASE; 
          let easeOut = 1 - Math.pow(1 - p, 3); 
          currentR = easeOut * startR;

          // Splash drops from the growing blob
          if (Math.random() < 0.8) {
              let angle = Math.random() * Math.PI * 2;
              drops.push({
                  x: cx + Math.cos(angle) * currentR,
                  y: cy + Math.sin(angle) * currentR,
                  vx: Math.cos(angle) * (4 + Math.random() * 8),
                  vy: Math.sin(angle) * (4 + Math.random() * 8) - 2,
                  r: 10 + Math.random() * 25
              });
          }
      } else if (f < GROW_PHASE + WASH_PHASE) {
          let p = (f - GROW_PHASE) / WASH_PHASE; 
          let easeIn = Math.pow(p, 3);
          currentR = startR + easeIn * (targetR - startR);

          // Splash drops at the leading edge
          for (let i = 0; i < 6; i++) {
              let angle = Math.random() * Math.PI * 2;
              drops.push({
                  x: cx + Math.cos(angle) * currentR,
                  y: cy + Math.sin(angle) * currentR,
                  vx: Math.cos(angle) * (8 + Math.random() * 15),
                  vy: Math.sin(angle) * (8 + Math.random() * 15),
                  r: 20 + Math.random() * 35
              });
          }
      } else if (f < GROW_PHASE + WASH_PHASE + HOLD_PHASE) {
          currentR = targetR; 
          if (!coveredTriggered) {
              coveredTriggered = true;
              onCovered(); 
          }
      } else if (f < TOTAL_FRAMES) {
          currentR = targetR;
          let p = (f - (GROW_PHASE + WASH_PHASE + HOLD_PHASE)) / OPEN_PHASE;
          canvas.style.opacity = (1 - p).toString();
      }

      ctx.fillStyle = '#FFFFFF'; 

      // Draw Core Blob
      if (currentR > 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, currentR * 0.9, 0, Math.PI * 2);
          ctx.fill();

          // Organic edges
          for (let i = 0; i < numAnchors; i++) {
              let a = anchors[i];
              let swayR = currentR * a.variance * Math.sin(f * a.speed + a.phase);
              let ax = cx + Math.cos(a.angle) * (currentR + swayR);
              let ay = cy + Math.sin(a.angle) * (currentR + swayR);
              
              let blobSize = Math.max(20, currentR * 0.25); 
              ctx.beginPath();
              ctx.arc(ax, ay, blobSize, 0, Math.PI * 2);
              ctx.fill();
          }
      }

      // Draw Drops
      for (let i = drops.length - 1; i >= 0; i--) {
          let d = drops[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.3; // Gravity pulls water down

          let noiseX = Math.sin(d.y * 0.05 + d.x) * 1.5;
          d.x += noiseX;

          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();

          // Remove if out of bounds
          if (d.y > H + 100 || d.x < -100 || d.x > W + 100) {
              drops.splice(i, 1);
          }
      }

      if (f < TOTAL_FRAMES) {
          requestAnimationFrame(loop);
      } else {
          if (document.body.contains(canvas)) document.body.removeChild(canvas);
      }
  };

  requestAnimationFrame(loop);
};

export const GalleryTransition = ({
  children,
  targetPath,
}: {
  children: React.ReactNode;
  targetPath: string;
  rotation?: number;
  imgSrc?: string;
}) => {
  const navigate = useNavigate();
  const widgetRef = useRef<HTMLDivElement>(null);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!widgetRef.current) return;
    
    // Get the exact bounding box of the painting we clicked!
    const rect = widgetRef.current.getBoundingClientRect();

    // Use a beautiful water teal/blue from the drip-wave palette
    playDripTransition('#2D8A8A', rect, () => {
      navigate(targetPath);
    });
  };

  return (
    <div
      ref={widgetRef}
      onClick={handleClick}
      className="w-full h-full cursor-pointer relative"
    >
      {children}
    </div>
  );
};
