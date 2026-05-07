import { useEffect, useState, useRef } from 'react';
import { BriefcaseIcon, BuildingOfficeIcon, UserGroupIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { motion, useInView } from 'framer-motion';

function Advantages() {
  const stats = [
    { value: 30, suffix: '+', label: "Expériences (ans)", icon: BriefcaseIcon, color: "text-blue-700", bg: "bg-blue-50" },
    { value: 69, suffix: '+', label: "Agences", icon: BuildingOfficeIcon, color: "text-slate-700", bg: "bg-slate-100" },
    { value: 13555, suffix: '+', label: "Clients", icon: UserGroupIcon, color: "text-indigo-700", bg: "bg-indigo-50" },
    { value: 1200, suffix: '+', label: "Crédits accordés", icon: CreditCardIcon, color: "text-emerald-700", bg: "bg-emerald-50" }
  ];

  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, idx) => {
        let start = 0;
        const end = stat.value;
        const duration = 1.2;
        const totalFrames = 60 * duration;
        const increment = end / totalFrames;
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounters(prev => { const next = [...prev]; next[idx] = end; return next; });
            clearInterval(timer);
          } else {
            setCounters(prev => { const next = [...prev]; next[idx] = Math.floor(start); return next; });
          }
        }, 1000 / 60);
      });
    } else {
      setCounters([0, 0, 0, 0]);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-16 bg-white overflow-hidden">
      
      {/* FOND ARCHITECTURAL RÉTABLI */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.09]" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0px)', backgroundSize: '40px 40px' }} />
        
        <svg className="absolute inset-3 w-full h-full opacity-50" viewBox="0 0 1440 800" fill="none">
          <motion.path
            d="M-100,600 C300,580 600,400 900,350 C1200,300 1400,100 1600,50"
            stroke="#05070c"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 7 } : { pathLength: 3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100,650 C400,630 700,450 1000,400 C1300,350 1500,150 1600,100"
            stroke="#07090c"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 5 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
            >
              Performance & Engagement
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              className="text-3xl md:text-4xl font-light text-slate-900 leading-tight"
            >
              Pourquoi nous faire <br />
              <span className="font-semibold text-blue-600">confiance ?</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            className="hidden md:block w-32 h-px bg-slate-400 mb-4 origin-left" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-100">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 bg-white border-r border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-5 ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:-translate-y-1`}>
                <stat.icon className="w-5 h-5" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-3xl font-light text-slate-900 mb-1 tracking-tight tabular-nums">
                  {counters[i].toLocaleString()}<span className="text-blue-600 font-medium">{stat.suffix}</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-slate-400 text-[11px] italic font-light"
        >
          Données mises à jour en temps réel.
        </motion.p>
      </div>
    </section>
  );
}

export default Advantages;