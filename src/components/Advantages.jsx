import React from 'react';
import { motion } from 'framer-motion';

const Advantages = () => {
  const center = 100;
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const gap = 30;

  const segments = [
    { 
      color: '#112240', 
      dash: (30 / 100) * circumference, 
      offset: 0,
      angle: -50, 
      labelStyle: { top: '-20px', left: '-25px' },
      val: "30+", lab: "Années d'expérience"
    },
    { 
      color: '#abc022', 
      dash: (15 / 100) * circumference, 
      offset: -((30 / 100) * circumference), 
      angle: 25,
      labelStyle: { top: '-20px', right: '-25px', textAlign: 'right' },
      val: "69+", lab: "Agences"
    },
    { 
      color: '#b34242', 
      dash: (35 / 100) * circumference, 
      offset: -((45 / 100) * circumference),
      angle: 110,
      labelStyle: { bottom: '-30px', right: '-8px', textAlign: 'right' },
      val: "13 555+", lab: "Clients"
    },
    { 
      color: '#992b87', 
      dash: (20 / 100) * circumference, 
      offset: -((80 / 100) * circumference),
      angle: 220,
      labelStyle: { bottom: '-30px', left: '-5px' },
      val: "1 200+", lab: "Crédits accordés"
    },
  ];

  const getLinePoints = (angle) => {
    const rad = (angle * Math.PI) / 180;
    const x1 = center + radius * Math.cos(rad);
    const y1 = center + radius * Math.sin(rad);
    const x2 = center + (radius + 35) * Math.cos(rad);
    const y2 = center + (radius + 35) * Math.sin(rad);
    const isLeft = Math.abs(angle) > 90 && Math.abs(angle) < 270;
    const x3 = x2 + (isLeft ? -25 : 25);
    return `${x1},${y1} ${x2},${y2} ${x3},${y2}`;
  };

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '50px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px', alignItems: 'center' }}>
        
        {/* Texte gauche – légèrement augmenté */}
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', lineHeight: 1.2 }}>
            L'excellence <br/>en chiffres.
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.5 }}>
            Une répartition stratégique de nos forces pour un accompagnement financier sur mesure.
          </p>
          
          <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {segments.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: s.color }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>{s.lab}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut – légèrement plus large */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          
          {segments.map((s, i) => (
            <motion.div 
              key={`label-${i}`}
              style={{ position: 'absolute', zIndex: 10, width: '140px', pointerEvents: 'none', ...s.labelStyle }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + (i * 0.1) }}
            >
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.5px' }}>{s.lab}</div>
            </motion.div>
          ))}

          <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', overflow: 'visible', transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r="30" fill="#f08d1c" />
            
            {segments.map((s, i) => {
              const points = getLinePoints(s.angle + 90);
              const startPos = points.split(' ')[0].split(',');

              return (
                <g key={`group-${i}`}>
                  <motion.circle
                    cx="100" cy="100" r="65"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="28"
                    strokeDasharray={`${s.dash - gap} ${circumference}`}
                    strokeDashoffset={s.offset + gap / 2}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />

                  <motion.polyline 
                    points={points}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                  
                  <motion.circle 
                    cx={startPos[0]} cy={startPos[1]} 
                    r="3" fill={s.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1 }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Advantages;