// Les imports restent identiques
import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const STATS = [
  { target: 30,    suffix: '+', label: "Années d'expérience", Icon: BriefcaseIcon },
  { target: 69,    suffix: '+', label: 'Agences',               Icon: BuildingOfficeIcon },
  { target: 13555, suffix: '+', label: 'Clients',               Icon: UserGroupIcon },
  { target: 1200,  suffix: '+', label: 'Crédits accordés',      Icon: CreditCardIcon },
];

// Fonctions utilitaires (easeOutCubic, catmullRomPoint) identiques...
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function catmullRomPoint(pts, t) {
  const n = pts.length - 1;
  const scaled = t * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const u = scaled - i;
  const p0 = pts[Math.max(i - 1, 0)];
  const p1 = pts[i];
  const p2 = pts[Math.min(i + 1, n)];
  const p3 = pts[Math.min(i + 2, n)];
  return [
    0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u * u + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u * u * u),
    0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u * u + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u * u * u)
  ];
}

function drawCurve(canvas, progress) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const pts = [
    [W * -0.02, H * 0.97], [W * 0.08, H * 0.87], [W * 0.18, H * 0.76],
    [W * 0.30, H * 0.63], [W * 0.42, H * 0.50], [W * 0.55, H * 0.38],
    [W * 0.66, H * 0.27], [W * 0.76, H * 0.18], [W * 0.87, H * 0.11], [W * 1.01, H * 0.03],
  ];

  const STEPS = 220;
  const endIdx = Math.floor(progress * STEPS);

  // Remplissage sous la courbe (Argenté doux)
  const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
  fillGrad.addColorStop(0,    'rgba(200, 214, 229, 0.25)'); 
  fillGrad.addColorStop(1,    'rgba(200, 214, 229, 0)');

  ctx.beginPath();
  for (let i = 0; i <= endIdx; i++) {
    const [x, y] = catmullRomPoint(pts, i / STEPS);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  const [ex] = catmullRomPoint(pts, endIdx / STEPS);
  ctx.lineTo(ex, H);
  ctx.lineTo(catmullRomPoint(pts, 0)[0], H);
  ctx.closePath();
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Ligne principale (Dégradé Blanc/Argent)
  const lineGrad = ctx.createLinearGradient(0, H, W, 0);
  lineGrad.addColorStop(0,    'rgba(255, 255, 255, 0)');
  lineGrad.addColorStop(0.5,  'rgba(255, 255, 255, 0.8)');
  lineGrad.addColorStop(1,    'rgba(255, 255, 255, 1)');

  ctx.beginPath();
  for (let i = 0; i <= endIdx; i++) {
    const [x, y] = catmullRomPoint(pts, i / STEPS);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Tête de flèche & Milestones (Blanc pur)
  if (progress >= 0.98) {
    const [ax, ay] = catmullRomPoint(pts, 0.985);
    const [bx, by] = catmullRomPoint(pts, 1.0);
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(Math.atan2(by - ay, bx - ax));
    ctx.beginPath();
    ctx.moveTo(18, 0); ctx.lineTo(-10, -8); ctx.lineTo(-5, 0); ctx.lineTo(-10, 8);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
  }

  const milestones = [0.27, 0.53, 0.76];
  milestones.forEach((m) => {
    if (progress > m) {
      const alpha = Math.min((progress - m) / 0.06, 1);
      const [mx, my] = catmullRomPoint(pts, m);
      ctx.beginPath();
      ctx.arc(mx, my, 12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mx, my, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }
  });
}

function GrowthCanvas({ isInView }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement.offsetWidth || 800;
    canvas.height = canvas.parentElement.offsetHeight || 520;
  }, []);
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) { 
        if(canvas) drawCurve(canvas, 0);
        startRef.current = null;
        return; 
    }
    function animate(ts) {
      if (!startRef.current) startRef.current = ts;
      const raw = Math.min((ts - startRef.current) / 2600, 1);
      drawCurve(canvas, easeOutCubic(raw));
      if (raw < 1) rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

function useCounter(target, isInView, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) { setCount(0); return; }
    const tid = setTimeout(() => {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 2400, 1);
        setCount(Math.round(easeOutCubic(p) * target));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(tid);
  }, [isInView, target, delay]);
  return count;
}

function StatCard({ stat, index, isInView }) {
  const count = useCounter(stat.target, isInView, index * 140);
  const { Icon } = stat;
  return (
    <div className="adv-card">
      <div className="adv-card-top">
        <div className="adv-card-icon">
          <Icon style={{ width: 16, height: 16 }} />
        </div>
      </div>
      <div className="adv-number">
        {count.toLocaleString('fr-FR')}
        <span className="adv-suffix">{stat.suffix}</span>
      </div>
      <div className="adv-label">{stat.label}</div>
      <div className="adv-bar" />
    </div>
  );
}

export default function Advantages() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

       .adv-section {
          /* Fond éclairci : passage de tons sombres à des tons plus vibrants et clairs */
          background: linear-gradient(135deg, #0e5349 0%, #156358 50%, #1c7568 100%);
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          padding: 3.5rem 2rem 4rem;
        }
          
        .adv-inner { position: relative; z-index: 3; max-width: 1080px; margin: 0 auto; width: 100%; }

        .adv-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 0.8rem; }

        .adv-eyebrow-line {
          width: 36px; height: 1.5px;
          background: #ffffff;
          flex-shrink: 0;
        }

        .adv-eyebrow-text {
          font-size: 10px; font-weight: 500; letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }

        .adv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem; font-weight: 300;
          color: #ffffff;
          line-height: 1.08; margin: 0 0 2rem;
          position: relative;
        }

        /* Dégradé doré sur le mot "confiance" */
        .adv-title em {
          background: linear-gradient(135deg, #F5B042, #FFD966);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
          font-weight: 700;
          display: inline-block;
        }

        /* Ligne décorative sous le titre */
        .adv-title::after {
          content: '';
          display: block;
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, #F5B042, #FFD966, transparent);
          margin-top: 0.75rem;
          border-radius: 2px;
        }

        .adv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 2px solid rgba(255, 255, 255, 0.35);
        }

        @media (max-width: 860px) { .adv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .adv-grid { grid-template-columns: 1fr; } }

        .adv-card {
          padding: 1.4rem 1.4rem;
          border-right: 2px solid rgba(255, 255, 255, 0.2);
          display: flex; flex-direction: column; gap: 0.6rem;
          position: relative; overflow: hidden;
          transition: background 0.45s ease; cursor: default;
        }

        .adv-card:last-child { border-right: none; }

        .adv-card::before {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: #ffffff;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.65s ease;
        }

        .adv-card:hover { background: rgba(255,255,255,0.08); }
        .adv-card:hover::before { transform: scaleX(1); }

        .adv-card-icon {
          width: 34px; height: 34px;
          border: 1px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          color: #ffffff; flex-shrink: 0;
        }

        .adv-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 700; line-height: 1;
          color: #ffffff; letter-spacing: -0.02em;
        }

        .adv-suffix { font-size: 1rem; font-weight: 300; color: rgba(255,255,255,0.6); margin-left: 2px; }

        .adv-label {
          font-size: 10px; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.5);
        }

        .adv-bar { height: 1px; background: rgba(255,255,255,0.15); margin-top: auto; }

        .adv-quote {
          margin-top: 1.5rem; font-size: 0.8rem;
          color: rgba(255,255,255,0.4); font-style: italic;
        }

        .adv-quote strong { color: rgba(255,255,255,0.8); font-weight: 400; }
      `}</style>

      <section ref={sectionRef} className="adv-section">
        <GrowthCanvas isInView={isInView} />
        <div className="adv-inner">
          <div className="adv-eyebrow">
            <div className="adv-eyebrow-line" />
            <span className="adv-eyebrow-text">Indicateurs clés</span>
          </div>
          <h2 className="adv-title">Pourquoi nous faire<br /><em>confiance ?</em></h2>
          <div className="adv-grid">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} isInView={isInView} />
            ))}
          </div>
          <p className="adv-quote">
            "La transparence de nos résultats forge la solidité de nos{' '}
            <strong>partenariats</strong>."
          </p>
        </div>
      </section>
    </>
  );
}