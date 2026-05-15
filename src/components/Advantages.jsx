import React, { useState, useEffect, useRef } from 'react';

const StatCard = ({ value, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // L'élément est visible : on lance l'animation
          const end = parseFloat(value);
          const duration = 2000;
          const steps = 60;
          const stepValue = end / steps;
          const stepDelay = duration / steps;
          let step = 0;

          if (timerRef.current) clearInterval(timerRef.current);

          timerRef.current = setInterval(() => {
            step++;
            if (step <= steps) {
              const current = step * stepValue;
              if (step === steps) {
                setCount(end);
                clearInterval(timerRef.current);
              } else {
                setCount(current);
              }
            }
          }, stepDelay);
        } else {
          // L'élément est sorti de l'écran : on remet à zéro pour le prochain passage
          if (timerRef.current) clearInterval(timerRef.current);
          setCount(0);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [value]);

  const displayValue = () => {
    if (Number.isInteger(parseFloat(value))) {
      return Math.floor(count);
    }
    return count.toFixed(1);
  };

  return (
    <div ref={ref} className="text-center text-white p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-transform hover:scale-105">
      <div className="text-3xl md:text-4xl font-extrabold mb-1">
        {displayValue()}{suffix}
      </div>
      <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
        {label}
      </div>
    </div>
  );
};

export default function StatsPage() {
  const stats = [
    { value: "30", label: "Années d'expérience", suffix: "+" },
    { value: "69", label: "Agences partenaires", suffix: "+" },
    { value: "13.6", label: "Clients actifs", suffix: "k+" },
    { value: "1200", label: "Crédits accordés", suffix: "+" }
  ];

  return (
    <div className="relative py-12 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/photo56.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-blue-900/20" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 drop-shadow-lg">
            Nos chiffres clés
          </h2>
          <p className="text-slate-900 text-sm md:text-base drop-shadow">
            Une expertise au service de votre réussite
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-blue-100 text-xs drop-shadow">
          <p>Chiffres mis à jour en 2025 — Source : Pebco Bethesda</p>
        </div>
      </div>
    </div>
  );
}