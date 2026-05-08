// src/components/Advantages.jsx
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
  { target: 69,    suffix: '+', label: 'Agences',              Icon: BuildingOfficeIcon },
  { target: 13555, suffix: '+', label: 'Clients',              Icon: UserGroupIcon },
  { target: 1200,  suffix: '+', label: 'Crédits accordés',     Icon: CreditCardIcon },
];

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function catmullRomPoint(pts, t) {
  const n = pts.length - 1;
  const scaled = t * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const u = scaled - i;
  const p0 = pts[Math.max(i - 1, 0)];
  const p1 = pts[i];
  const p2 = pts[Math.min(i + 1, n)];
  const p3 = pts[Math.min(i + 2, n)];
  const x =
    0.5 *
    (2 * p1[0] +
      (-p0[0] + p2[0]) * u +
      (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u * u +
      (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u * u * u);
  const y =
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * u +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u * u +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u * u * u);
  return [x, y];
}

function drawCurve(canvas, progress) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const pts = [
    [W * -0.02, H * 0.97],
    [W * 0.08,  H * 0.87],
    [W * 0.18,  H * 0.76],
    [W * 0.30,  H * 0.63],
    [W * 0.42,  H * 0.50],
    [W * 0.55,  H * 0.38],
    [W * 0.66,  H * 0.27],
    [W * 0.76,  H * 0.18],
    [W * 0.87,  H * 0.11],
    [W * 1.01,  H * 0.03],
  ];

  const STEPS = 220;
  const endIdx = Math.floor(progress * STEPS);

  // Zone remplie sous la courbe
  const fillGrad = ctx.createLinearGradient(0, 0, 0, H);
  fillGrad.addColorStop(0,    'rgba(183,148,72,0.22)');
  fillGrad.addColorStop(0.55, 'rgba(183,148,72,0.09)');
  fillGrad.addColorStop(1,    'rgba(183,148,72,0)');

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

  // Ligne principale
  const lineGrad = ctx.createLinearGradient(0, H, W, 0);
  lineGrad.addColorStop(0,    'rgba(100,70,10,0)');
  lineGrad.addColorStop(0.25, 'rgba(183,148,72,0.6)');
  lineGrad.addColorStop(0.65, 'rgba(220,175,80,0.9)');
  lineGrad.addColorStop(1,    'rgba(232,201,106,1)');

  ctx.beginPath();
  for (let i = 0; i <= endIdx; i++) {
    const [x, y] = catmullRomPoint(pts, i / STEPS);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  // Tête de flèche
  if (progress >= 0.98) {
    const [ax, ay] = catmullRomPoint(pts, 0.985);
    const [bx, by] = catmullRomPoint(pts, 1.0);
    const angle = Math.atan2(by - ay, bx - ax);
    const len = 18;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(len, 0);
    ctx.lineTo(-len * 0.6, -len * 0.45);
    ctx.lineTo(-len * 0.3, 0);
    ctx.lineTo(-len * 0.6, len * 0.45);
    ctx.closePath();
    ctx.fillStyle = '#e8c96a';
    ctx.fill();
    ctx.restore();
  }

  // Points milestones lumineux
  const milestones = [0.27, 0.53, 0.76];
  milestones.forEach((m) => {
    if (progress > m) {
      const alpha = Math.min((progress - m) / 0.06, 1);
      const [mx, my] = catmullRomPoint(pts, m);
      ctx.beginPath();
      ctx.arc(mx, my, 15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(183,148,72,${0.18 * alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mx, my, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,201,106,${alpha})`;
      ctx.fill();
    }
  });
}

function GrowthCanvas({ isInView }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width  = parent.offsetWidth  || 800;
    canvas.height = parent.offsetHeight || 520;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!isInView) {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      drawCurve(canvas, 0);
      return;
    }

    const DUR = 2600;

    function animate(ts) {
      if (!startRef.current) startRef.current = ts;
      const raw = Math.min((ts - startRef.current) / DUR, 1);
      drawCurve(canvas, easeOutCubic(raw));
      if (raw < 1) rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

function useCounter(target, isInView, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) { setCount(0); return; }
    const tid = setTimeout(() => {
      const DUR = 2400;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / DUR, 1);
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
          background: #0d1b2a;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          padding: 3.5rem 2rem 4rem;
        }

        .adv-inner {
          position: relative;
          z-index: 3;
          max-width: 1080px;
          margin: 0 auto;
          width: 100%;
        }

        .adv-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0.8rem;
        }

        .adv-eyebrow-line {
          width: 36px;
          height: 1.5px;
          background: #e8c96a;
          flex-shrink: 0;
        }

        .adv-eyebrow-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #e8c96a;
        }

        .adv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 300;
          color: #f5f0e8;
          line-height: 1.08;
          margin: 0 0 2rem;
        }

        @media (max-width: 640px) {
          .adv-title { font-size: 2rem; }
        }

        .adv-title em {
          font-style: italic;
          font-weight: 700;
          color: #e8c96a;
        }

        .adv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1.5px solid rgba(232,201,106,0.25);
        }

        @media (max-width: 860px) {
          .adv-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .adv-grid { grid-template-columns: 1fr; }
        }

        .adv-card {
          padding: 1.4rem 1.4rem;
          border-right: 1px solid rgba(232,201,106,0.15);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          position: relative;
          overflow: hidden;
          transition: background 0.45s ease;
          cursor: default;
        }

        .adv-card:last-child { border-right: none; }

        .adv-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #b79448, #e8c96a);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.65s ease;
        }

        .adv-card:hover { background: rgba(232,201,106,0.07); }
        .adv-card:hover::before { transform: scaleX(1); }

        .adv-card-top { display: flex; }

        .adv-card-icon {
          width: 34px; height: 34px;
          border: 1px solid rgba(232,201,106,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e8c96a;
          transition: all 0.4s;
          flex-shrink: 0;
        }

        .adv-card:hover .adv-card-icon {
          background: rgba(232,201,106,0.12);
          border-color: rgba(232,201,106,0.7);
        }

        .adv-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1;
          color: #f5f0e8;
          letter-spacing: -0.02em;
        }

        .adv-suffix {
          font-size: 1rem;
          font-weight: 300;
          color: #e8c96a;
          margin-left: 2px;
        }

        .adv-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          line-height: 1.6;
        }

        .adv-bar {
          height: 1px;
          background: rgba(232,201,106,0.2);
          margin-top: auto;
        }

        .adv-quote {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: rgba(245,240,232,0.3);
          font-style: italic;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .adv-quote strong {
          color: rgba(232,201,106,0.55);
          font-style: normal;
          font-weight: 400;
        }
      `}</style>

      <section ref={sectionRef} className="adv-section">
        <GrowthCanvas isInView={isInView} />

        <div className="adv-inner">
          <div className="adv-eyebrow">
            <div className="adv-eyebrow-line" />
            <span className="adv-eyebrow-text">Indicateurs clés</span>
          </div>

          <h2 className="adv-title">
            Pourquoi nous faire<br />
            <em>confiance ?</em>
          </h2>

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