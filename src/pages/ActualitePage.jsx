import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── DATA ─────────────────────────────────────────────────── */
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

/* ─── CATEGORY CONFIG ───────────────────────────────────────── */
const catConfig = {
  Actualités:  { dot: '#1a56db', label: 'text-[#1a56db]' },
  Témoignages: { dot: '#0f766e', label: 'text-[#0f766e]' },
  Événement:   { dot: '#b45309', label: 'text-[#b45309]' },
};

/* ─── HERO ARTICLE (article vedette – grande carte) ─────────── */
function HeroCard({ article, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/9' }}
    >
      <img
        src={article.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Voile dégradé éditorial */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1421]/95 via-[#0c1421]/40 to-transparent" />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        {/* Ligne méta */}
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white/90">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: catConfig[article.category]?.dot ?? '#fff' }}
            />
            {article.category}
          </span>
          <span className="w-px h-3 bg-white/30" />
          <span className="text-[11px] text-white/60 tracking-wider">{article.date}</span>
          <span className="w-px h-3 bg-white/30" />
          <span className="text-[11px] text-white/60 tracking-wider">{article.readTime} de lecture</span>
        </div>

        <h2 className="text-2xl md:text-[2rem] font-light leading-[1.2] text-white max-w-2xl mb-5 group-hover:text-[#c8a96e] transition-colors duration-300">
          {article.title}
        </h2>

        <p className="text-sm text-white/65 max-w-xl leading-relaxed mb-7 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 flex items-center justify-center text-[10px] font-bold text-[#c8a96e] tracking-wide">
              {article.author.split(' ')[0][0]}{article.author.split(' ')[1]?.[0] ?? ''}
            </div>
            <span className="text-xs text-white/70 tracking-wide">{article.author}</span>
          </div>

          <span className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#c8a96e] group-hover:gap-3 transition-all duration-300">
            Lire l'article
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── SECONDARY CARD (liste compacte) ──────────────────────── */
function SecondaryCard({ article, onClick, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group flex gap-5 cursor-pointer py-5 border-b border-[#e8e0d5] last:border-b-0 hover:bg-[#faf8f5] -mx-4 px-4 rounded-lg transition-colors duration-200"
    >
      {/* Vignette */}
      <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0c1421]/10" />
      </div>

      {/* Texte */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: catConfig[article.category]?.dot ?? '#999' }}
            />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ color: catConfig[article.category]?.dot ?? '#999' }}>
              {article.category}
            </span>
          </div>
          <h3 className="text-sm font-medium leading-snug text-[#1a1612] line-clamp-2 group-hover:text-[#c8a96e] transition-colors duration-200">
            {article.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-[#9e9589] tracking-wide">{article.author}</span>
          <span className="w-px h-2.5 bg-[#d8d0c8]" />
          <span className="text-[10px] text-[#9e9589] tracking-wide">{article.date}</span>
          <span className="w-px h-2.5 bg-[#d8d0c8]" />
          <span className="text-[10px] text-[#9e9589] tracking-wide">{article.readTime}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── LIST CARD (vue liste filtrée) ────────────────────────── */
function ListCard({ article, onClick, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group flex gap-6 cursor-pointer py-6 border-b border-[#e8e0d5] last:border-b-0 hover:bg-[#faf8f5] -mx-6 px-6 transition-colors duration-200"
    >
      <div className="relative w-40 h-28 flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={article.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: catConfig[article.category]?.dot ?? '#999' }}
            />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{ color: catConfig[article.category]?.dot ?? '#999' }}>
              {article.category}
            </span>
            <span className="w-px h-3 bg-[#d8d0c8]" />
            <span className="text-[10px] text-[#9e9589] tracking-wide">{article.date}</span>
          </div>
          <h3 className="text-base font-medium leading-snug text-[#1a1612] mb-2 group-hover:text-[#c8a96e] transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-xs text-[#7a6f65] leading-relaxed line-clamp-2">{article.excerpt}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#e8e0d5] flex items-center justify-center text-[8px] font-bold text-[#7a6f65]">
              {article.author.split(' ')[0][0]}{article.author.split(' ')[1]?.[0] ?? ''}
            </div>
            <span className="text-[11px] text-[#9e9589]">{article.author}</span>
            <span className="w-px h-2.5 bg-[#d8d0c8]" />
            <span className="text-[11px] text-[#9e9589]">{article.readTime} de lecture</span>
          </div>

          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8a96e] group-hover:gap-2.5 transition-all duration-300">
            Lire
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
              <path d="M1 4.5h12M9 1l4 3.5L9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function ActualitePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter(a => {
    if (activeCategory !== 'Tous' && a.category !== activeCategory) return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const isDefaultView = activeCategory === 'Tous' && !searchQuery;
  const heroArticle = isDefaultView ? filtered[0] : null;
  const sideArticles = isDefaultView ? filtered.slice(1, 4) : [];

  const goTo = (article) => navigate(`/actualite/article/${article.id}`, { state: { article } });

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: '#f5f1eb' }}>

     {/* BANNIÈRE PAGE ACTUALITÉS */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url('/images/photo61.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
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

      {/* ── CONTENU ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">

        {/* Barre de filtres */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 pb-6 border-b border-[#dcd5cc]">
          <nav className="flex items-center gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-200 rounded-full
                  ${activeCategory === cat
                    ? 'bg-[#1a1612] text-[#c8a96e]'
                    : 'text-[#7a6f65] hover:text-[#1a1612] hover:bg-[#ede8e2]'
                  }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-[#1a1612]"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Recherche */}
          <div className="relative w-full sm:w-64">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e9589]"
              width="14" height="14" viewBox="0 0 14 14" fill="none"
            >
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs text-[#1a1612] placeholder-[#b0a99f] rounded-full border border-[#dcd5cc] bg-white/60 focus:outline-none focus:border-[#c8a96e] focus:ring-1 focus:ring-[#c8a96e]/30 transition-all"
            />
          </div>
        </div>

        {/* ── VUE PAR DÉFAUT : hero + colonne latérale ── */}
        {isDefaultView && filtered.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Hero */}
            <div className="lg:flex-[3]">
              {heroArticle && (
                <HeroCard article={heroArticle} onClick={() => goTo(heroArticle)} />
              )}
            </div>

            {/* Colonne latérale */}
            {sideArticles.length > 0 && (
              <div className="lg:flex-[1.4] bg-white/60 border border-[#e5ddd5] rounded-2xl px-4 py-2">
                <div className="flex items-center gap-2 py-4 mb-1 border-b border-[#e5ddd5]">
                  <span className="w-3 h-px bg-[#c8a96e]" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#9e9589]">
                    À la une
                  </span>
                </div>
                {sideArticles.map((a, i) => (
                  <SecondaryCard key={a.id} article={a} onClick={() => goTo(a)} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── VUE FILTRÉE : liste ── */}
        {!isDefaultView && (
          <>
            {filtered.length > 0 ? (
              <div className="bg-white/60 border border-[#e5ddd5] rounded-2xl px-6 divide-y divide-[#e8e0d5]">
                {filtered.map((a, i) => (
                  <ListCard key={a.id} article={a} onClick={() => goTo(a)} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="w-10 h-10 mx-auto mb-4 text-[#b0a99f]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <p className="text-sm text-[#9e9589]">Aucun article ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}

        {/* ── LIGNE BAS DE PAGE ── */}
        {filtered.length > 0 && (
          <p className="mt-10 text-center text-[11px] text-[#b0a99f] tracking-widest uppercase">
            {filtered.length} article{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}