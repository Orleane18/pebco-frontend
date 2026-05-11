// src/components/Actualites.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

const articles = [
  {
    id: 1,
    title: "Femmes et microfinance : alliance puissante",
    author: "PEBCO Finance",
    excerpt: "La microfinance a joué un rôle essentiel dans l'autonomisation économique des femmes en Afrique, offrant des opportunités de co-construction pour l'avenir.",
    image: "/images/photo35.jpg",
    label: "Microfinance & Genre",
  },
  {
    id: 2,
    title: "Impacts de P.E.B.CO-BETHESDA : témoignages",
    author: "Distinction 2025",
    excerpt: "Découvrez les parcours inspirants de nos meilleures clientes distinguées cette année, actrices majeures du développement local.",
    image: "/images/photo39.png",
    label: "Distinctions 2025",
  },
  {
    id: 3,
    title: "Discours mémorable sur l'égalité",
    author: "Événement Cotonou",
    excerpt: "Retour sur l'intervention marquante du point focal égalité homme-femme, une nouvelle page pour notre avenir commun.",
    image: "/images/photo40.png",
    label: "Événement Cotonou",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .act-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #faf9f6;
    padding: 56px 40px 64px;
    position: relative;
    overflow: hidden;
  }

  /* ── Fond décoratif zigzag + cercles ── */
  .act-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .act-bg svg {
    width: 100%;
    height: 100%;
  }

  .act-inner {
    position: relative;
    z-index: 2;
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .act-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 16px;
  }
  .act-eyebrow {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: #c9a000;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .act-eyebrow::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 1.5px;
    background: #c9a000;
  }
  .act-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.1;
    letter-spacing: -.01em;
    margin: 0;
  }
  .act-title em {
    font-style: italic;
    color: #E9C440;
  }

  /* ── Bouton voir toutes ── */
  .act-btn-all {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px 8px 8px;
    border: 1px solid rgba(26,26,26,.12);
    border-radius: 100px;
    background: white;
    cursor: pointer;
    transition: all .3s ease;
    flex-shrink: 0;
    outline: none;
    font-family: 'DM Sans', sans-serif;
  }
  .act-btn-all:hover { background: #0a1628; border-color: #0a1628; }
  .act-btn-all:hover .act-btn-lbl { color: white; }
  .act-btn-all:hover .act-btn-ic  { background: #E9C440; color: #0a1628; }

  .act-btn-ic {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #f5f0d8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a000;
    transition: all .3s;
  }
  .act-btn-lbl {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #0a1628;
    transition: color .3s;
  }

  /* ── Layout principal ── */
  .act-layout {
    display: grid;
    grid-template-columns: 1fr 390px;  /* 360px ou plus selon votre besoin */
    align-items: stretch;
  }

  /* ── Carte contenu sombre ── */
  .act-content {
    background: #1a1a1a;
    padding: 36px 36px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;
  }
  .act-num {
    font-family: 'Playfair Display', serif;
    font-size: 11px;
    color: #E9C440;
    letter-spacing: .2em;
    margin-bottom: 16px;
    display: block;
  }
  .act-article-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: white;
    line-height: 1.3;
    margin-bottom: 6px;
    letter-spacing: .02em;
    text-transform: uppercase;
  }
  .act-author {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #E9C440;
    margin-bottom: 16px;
  }
  .act-excerpt {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,.65);
    line-height: 1.7;
    margin-bottom: 28px;
    flex-grow: 1;
    max-width: 480px;
  }

  /* ── Navigation ── */
  .act-nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .act-nav-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.2);
    background: rgba(255,255,255,.07);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .3s;
    color: rgba(255,255,255,.7);
    outline: none;
  }
  .act-nav-btn:hover { background: #E9C440; border-color: #E9C440; color: #1a1a1a; }

  .act-dots {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-left: 4px;
  }
  .act-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,.2);
    transition: all .35s ease;
  }
  .act-dot.active {
    background: #E9C440;
    width: 18px;
    border-radius: 3px;
  }

  /* ── Carte image carrée fixe ── */
  .act-img-card {
    position: relative;
    overflow: hidden;
    
    flex-shrink: 0;
  }
  .act-img-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .8s cubic-bezier(.25,.46,.45,.94);
  }
  .act-img-card:hover img { transform: scale(1.04); }
  .act-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(26,26,26,.6));
    pointer-events: none;
  }
  .act-img-label {
    position: absolute;
    bottom: 14px;
    left: 14px;
    right: 14px;
  }
  .act-img-label span {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: rgba(255,255,255,.8);
  }

  @media (max-width: 700px) {
    .act-layout { grid-template-columns: 1fr; }
    .act-img-card { aspect-ratio: 16/9; }
    .act-top { flex-direction: column; }
    .act-wrap { padding: 40px 20px 48px; }
  }
`;

function BgDecor() {
  return (
    <div className="act-bg">
      <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <path
          /* Modification ici : on retire "H1100" à la fin */
          d="M-80 430H130V300H360V160H500V70" 
          stroke="#E9C440" strokeWidth="30" fill="none"
          strokeLinejoin="miter" strokeMiterlimit="50"
          opacity="70"
        />
        <circle cx="900" cy="480" r="100" fill="none" stroke="#E9C440" strokeWidth="1" opacity="0.12" />
      </svg>
    </div>
  );
}

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
    if (isPaused) return;
    const id = setInterval(() => goTo(current + 1, 1), 5000);
    return () => clearInterval(id);
  }, [current, isPaused, goTo]);

  const article = articles[current];

  return (
    <>
      <style>{styles}</style>
      <section className="act-wrap">
        <BgDecor />

        <div className="act-inner">
          {/* Header */}
          <div className="act-top">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="act-eyebrow">Actualités</p>
              <h2 className="act-title">
                Dernières<br /><em>Actualités</em>
              </h2>
            </motion.div>

            <motion.button
              className="act-btn-all"
              onClick={() => navigate('/actualite')}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="act-btn-ic">
                <EyeIcon style={{ width: 13, height: 13 }} />
              </span>
              <span className="act-btn-lbl">Voir toutes les actualités</span>
            </motion.button>
          </div>

          {/* Layout grille : contenu | image carrée fixe */}
          <div
            className="act-layout"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carte sombre */}
            <div className="act-content">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <span className="act-num">
                    {String(current + 1).padStart(2, '0')} / {String(articles.length).padStart(2, '0')}
                  </span>
                  <h3 className="act-article-title">{article.title}</h3>
                  <p className="act-author">{article.author}</p>
                  <p className="act-excerpt">{article.excerpt}</p>
                </motion.div>
              </AnimatePresence>

              <div className="act-nav">
                <button className="act-nav-btn" onClick={() => goTo(current - 1, -1)} aria-label="Précédent">
                  <ArrowLeftIcon style={{ width: 14, height: 14 }} />
                </button>
                <button className="act-nav-btn" onClick={() => goTo(current + 1, 1)} aria-label="Suivant">
                  <ArrowRightIcon style={{ width: 14, height: 14 }} />
                </button>
                <div className="act-dots">
                  {articles.map((_, i) => (
                    <div
                      key={i}
                      className={`act-dot${i === current ? ' active' : ''}`}
                      onClick={() => goTo(i, i > current ? 1 : -1)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image carrée — toujours au même emplacement, seul le contenu change */}
            <div className="act-img-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={article.id + '-img'}
                  src={article.image}
                  alt={article.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ duration: 0.55 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                />
              </AnimatePresence>
              <div className="act-img-overlay" />
              <div className="act-img-label">
                <span>{article.label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Actualites;