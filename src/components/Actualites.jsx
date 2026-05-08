import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

const articles = [
  {
    id: 1,
    title: "FEMMES ET MICROFINANCE : ALLIANCE PUISSANTE",
    author: "PEBCO FINANCE",
    excerpt: "« La microfinance a joué un rôle essentiel dans l'autonomisation économique des femmes en Afrique, offrant des opportunités de co-construction pour l'avenir. »",
    image: "/images/photo35.jpg",
  },
  {
    id: 2,
    title: "IMPACTS DE P.E.B.CO-BETHESDA : TÉMOIGNAGES",
    author: "DISTINCTION 2025",
    excerpt: "« Découvrez les parcours inspirants de nos meilleures clientes distinguées cette année, actrices majeures du développement local. »",
    image: "/images/photo39.png",
  },
  {
    id: 3,
    title: "DISCOURS MÉMORABLE SUR L'ÉGALITÉ",
    author: "ÉVÉNEMENT COTONOU",
    excerpt: "« Retour sur l'intervention marquante du point focal égalité homme-femme, une nouvelle page pour notre avenir commun. »",
    image: "/images/photo40.png",
  }
];

function Actualites() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((idx, direction) => {
    setDir(direction);
    setCurrent((idx + articles.length) % articles.length);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        goTo(current + 1, 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [current, isPaused, goTo]);

  const article = articles[current];

  return (
    <section className="relative py-12 bg-white overflow-hidden font-sans">
      {/* Forme géométrique jaune en arrière-plan (zigzags à taille normale) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          viewBox="0 0 1440 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full object-cover opacity-100"
        >
          <path 
            d="M-100 650H150V480H350V310H750V140H1100V-50" 
            stroke="#E9C440" 
            strokeWidth="80"
            strokeLinejoin="miter" 
            strokeMiterlimit="60"
            className="opacity-40 md:opacity-100"
          />
          <path 
            d="M200 850H450V680H650V510H1050V340H1400V150" 
            stroke="#E9C440" 
            strokeWidth="60" 
            className="opacity-10 md:opacity-100"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* En-tête : alignement en haut pour que le bouton reste au-dessus de l'image */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-[#1a1a1a] leading-tight">
              Dernières <br />
              <span className="font-serif italic text-[#E9C440] font-semibold">Actualités</span>
            </h2>
            <div className="w-10 h-0.5 bg-[#E9C440] mt-2" />
          </div>
          
          <button 
            onClick={() => navigate('/actualite')}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-[#1a1a1a]/10 hover:bg-white/5 hover:text-black transition-all duration-300"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase">Voir toutes les actualités</span>
            <div className="w-6 h-6 rounded-full bg-[#E9C440] flex items-center justify-center text-black group-hover:bg-white transition-colors">
              <EyeIcon className="w-3 h-3" />
            </div>
          </button>
        </div>

        <div 
          className="relative flex flex-col md:flex-row items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carte de contenu noire */}
          <div className="w-full md:w-[85%] bg-[#1a1a1a] p-5 md:p-8 text-white relative z-20 shadow-2xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: dir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h3 className="text-base md:text-lg font-bold tracking-wide mb-1 uppercase pr-10">
                  {article.title}
                </h3>
                <p className="text-[#E9C440] text-xs italic mb-3 font-light">
                  {article.author}
                </p>
                <p className="text-sm md:text-base font-light leading-relaxed mb-5 text-gray-200 md:max-w-[70%]">
                  {article.excerpt}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-2 relative z-40">
              <button 
                onClick={() => goTo(current - 1, -1)}
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#E9C440] hover:text-black transition-all border border-white/20"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => goTo(current + 1, 1)}
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#E9C440] hover:text-black transition-all border border-white/20"
              >
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Image circulaire flottante (taille inchangée) */}
          <div className="relative z-30 mt-[-30px] md:mt-0 md:absolute md:right-[-15px] md:top-1/2 md:translate-y-[-50%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={article.id + "-img"}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ duration: 0.5 }}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full border-[4px] border-white shadow-2xl overflow-hidden"
              >
                <img src={article.image} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Actualites;