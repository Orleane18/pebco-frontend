// src/components/Actualites.jsx
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const articlesAccueil = [
  // identique à ton code
  {
    id: 1,
    title: "Femmes et microfinance : alliance puissante",
    excerpt: "La microfinance a joué un rôle essentiel dans l'autonomisation économique des femmes en Afrique.",
    date: "26 Jan 2025",
    category: "Actualités",
    image: "/images/photo35.jpg"
  },
  {
    id: 2,
    title: "Impacts de P.E.B.Co-BETHESDA : Témoignages",
    excerpt: "Découvrez les parcours inspirants de nos meilleures clientes distinguées cette année.",
    date: "27 Oct 2025",
    category: "Témoignages",
    image: "/images/photo39.png"
  },
  {
    id: 3,
    title: "Discours mémorable sur l'égalité",
    excerpt: "Retour sur l'intervention marquante du point focal égalité homme-femme à Cotonou.",
    date: "21 Oct 2025",
    category: "Événement",
    image: "/images/photo40.png"
  }
];

function Actualites() {
  const navigate = useNavigate();

  const handleReadMore = (article) => {
    navigate('/actualite/article/' + article.id, { state: { article } });
  };

  const handleSeeAll = () => {
    navigate('/actualites'); // à adapter selon ta route
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* En-tête amélioré */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Restez informés
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
              Dernières <span className="text-blue-600 relative">Actualités
                <svg className="absolute -bottom-1 left-0 w-full h-1.5 text-blue-200" viewBox="0 0 200 8" fill="currentColor">
                  <path d="M0,4 L200,4" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">
              Suivez l'impact de P.E.B.Co-BETHESDA au quotidien.
            </p>
          </div>
          <button 
            onClick={handleSeeAll}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-semibold text-gray-700 hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all duration-200"
          >
            <EyeIcon className="w-4 h-4" />
            Voir toutes les actualités
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grille de cartes avec animations et meilleurs effets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articlesAccueil.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Image avec overlay gradient au hover */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = '/images/fallback.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/40 backdrop-blur-sm text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider border border-white/30">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-400 mb-3 font-medium">
                  <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  {article.date}
                </div>
                
                <h3 className="text-lg font-bold text-gray-700 mb-2 leading-tight transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Bouton Lire l'article - version moderne */}
                <button 
                  onClick={() => handleReadMore(article)}
                  className="w-full py-2.5 rounded-xl bg-gray-50/80 group-hover:bg-white-600 group-hover:text-gray text-gray-700 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-gray-100 group-hover:border-blue-500"
                >
                  <span>Lire l'article</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Actualites;