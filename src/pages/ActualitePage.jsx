import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLongRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

/* ─── DATA ───────────────────────────────────────────── */
const articles = [
  {
    id: 1,
    title: "Femmes et microfinance : une alliance puissante pour le progrès économique en Afrique",
    excerpt: "La microfinance transforme la vie des femmes en Afrique. Découvrez comment P.E.B.Co-BETHESDA contribue à cette dynamique.",
    date: "26 Jan 2025",
    author: "M. Sossou",
    readTime: "4 min",
    category: "Actualités",
    image: "/images/photo35.jpg",
  },
  {
    id: 2,
    title: "Impacts de P.E.B.Co-BETHESDA dans la vie de sa clientèle : témoignages de deux clientes",
    excerpt: "À l'occasion de la célébration des femmes, deux clientes exemplaires ont partagé leur parcours inspirant.",
    date: "27 Oct 2025",
    author: "A. Agbossa",
    readTime: "5 min",
    category: "Témoignages",
    image: "/images/photo39.png",
  },
  {
    id: 3,
    title: "Le discours mémorable du point focal égalité femme-homme pendant la célébration",
    excerpt: "Le 15 mars 2024 à Cotonou, un discours fort a marqué la célébration des femmes, appelant à plus d'égalité.",
    date: "21 Oct 2025",
    author: "D. Houndjo",
    readTime: "3 min",
    category: "Événement",
    image: "/images/photo40.png",
  },
  {
    id: 4,
    title: "Lancement de la carte P.E.B.Co-BETHESDA",
    excerpt: "Une carte pour économiser au quotidien et soutenir les commerces locaux partenaires de l'institution.",
    date: "21 Oct 2025",
    author: "K. Alidou",
    readTime: "3 min",
    category: "Événement",
    image: "/images/photo41.jpg",
  },
];

const CATEGORIES = ["Tous", "Actualités", "Témoignages", "Événement"];

/* ─── CATEGORY PILL ───────────────────────────────────────── */
const categoryColors = {
  Actualités: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  Témoignages: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  Événement: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
};

function CatPill({ cat, small = false }) {
  const c = categoryColors[cat] ?? { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
  return (
    <span className={`inline-flex items-center rounded-full border font-bold uppercase tracking-wider
      ${c.bg} ${c.text} ${c.border}
      ${small ? 'text-[9px] px-2.5 py-1' : 'text-[10px] px-3 py-1'}`}>
      {cat}
    </span>
  );
}

/* ─── ARTICLE CARD (design amélioré) ────────── */
function ArticleCard({ article, onClick, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="group relative h-[380px] w-full rounded-3xl overflow-hidden cursor-pointer
                 border border-slate-300/30 shadow-lg hover:shadow-2xl hover:scale-[1.01]
                 ring-1 ring-white/5 transition-all duration-500 ease-out"
    >
      {/* Image de fond avec zoom subtil au survol */}
      <div className="absolute inset-0">
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Contenu textuel sur fond dégradé plus doux */}
      <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <CatPill cat={article.category} small />
          <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">
            {article.date}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-200 text-xs leading-relaxed mb-4 line-clamp-2 font-light">
          {article.excerpt}
        </p>

        {/* Footer de la carte */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <UserCircleIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] text-gray-300 font-medium">{article.author}</span>
          </div>

          <div className="flex items-center gap-1.5 text-white font-black text-[10px] uppercase tracking-[0.15em] group-hover:text-blue-300 transition-colors">
            Lire <ArrowLongRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Badge de temps de lecture – fond clair pour mieux contraster */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-white/60 text-slate-800 text-[9px] font-bold uppercase tracking-widest">
        <ClockIcon className="w-3.5 h-3.5" />
        {article.readTime}
      </div>
    </motion.article>
  );
}

/* ─── STATS TICKER ───────────────────────────────────── */
// const stats = [
//   { value: '30+', label: "Années d'expérience" },
//   { value: '69+', label: 'Agences' },
//   { value: '13 555+', label: 'Clients' },
//   { value: '1 200+', label: 'Crédits accordés' },
//   { value: '98%', label: 'Satisfaction' },
// ];

// function StatsTicker() {
//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100 py-4 overflow-hidden">
//       <motion.div
//         className="flex gap-14 whitespace-nowrap"
//         animate={{ x: ['0%', '-50%'] }}
//         transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//         style={{ width: 'max-content' }}
//       >
//         {[...stats, ...stats].map((s, i) => (
//           <div key={i} className="flex items-center gap-3 flex-shrink-0">
//             <span className="text-blue-700 font-black text-sm">{s.value}</span>
//             <span className="text-slate-600 text-xs uppercase tracking-wider font-medium">{s.label}</span>
//             <span className="w-1 h-1 rounded-full bg-blue-300" />
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

/* ─── MAIN PAGE ────────────────────────────────────────── */
function ActualitePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    if (activeCategory !== 'Tous' && article.category !== activeCategory) return false;
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const goTo = (article) =>
    navigate(`/actualite/article/${article.id}`, { state: { article } });

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased">

    {/* BANNIÈRE PAGE ACTUALITÉS */}
<section className="relative py-32 md:py-40 overflow-hidden">
  <div className="absolute inset-0" style={{ backgroundImage: `url('/images/photo58.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Média centre</span>
      <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
        Actualités & <span className="font-semibold text-blue-400">Impact terrain</span>
      </h1>
      <p className="text-slate-300 max-w-md font-light text-sm">
        Découvrez les dernières nouvelles de P.E.B.Co-BETHESDA, nos projets innovants et les histoires inspirantes.
      </p>
    </motion.div>
  </div>
  <div className="absolute bottom-0 left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto" style={{ display: 'block' }}>
      <path fill="#F8FAFC" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </div>
</section>

      {/* Stats Ticker */}
      {/* <StatsTicker /> */}

      {/* Contenu principal */}
      <div id="articles" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Filtres + recherche */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all
                  ${activeCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un article…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-200 transition-all bg-white"
            />
          </div>
        </div>

        {/* Grille des articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} onClick={() => goTo(article)} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <MagnifyingGlassIcon className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Aucun article ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActualitePage;