// src/components/CreditTypes.jsx
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const credits = [
  {
    id: 'individuel',
    title: 'Crédit Individuel',
    category: 'Particuliers',
    description: 'Solutions de financement pour vos projets personnels, santé et équipements domestiques.',
    image: '/images/photo26.jpg',
    imgPosition: 'center top',
    num: '01',
    badgeCls: 'badge-blue',
    iconCls: 'icon-blue',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'mutuel',
    title: 'Crédit Mutuel',
    category: 'Entrepreneuriat',
    description: 'Un levier financier garanti par un groupe solidaire pour propulser vos micro-projets.',
    image: '/images/photo25.jpg',
    imgPosition: 'center center',
    num: '02',
    badgeCls: 'badge-slate',
    iconCls: 'icon-slate',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'immobilier',
    title: 'Crédit Immobilier',
    category: 'Patrimoine',
    description: "Accompagnement sur mesure pour l'acquisition, la construction ou la rénovation de vos biens.",
    image: '/images/photo22.jpg',
    imgPosition: 'center center',
    num: '03',
    badgeCls: 'badge-gold',
    iconCls: 'icon-gold',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Section ── */
  .ct-wrap {
    font-family: 'DM Sans', sans-serif;
    background: #f7f6f3;
    padding: 56px 40px 64px;
    position: relative;
    overflow: hidden;
  }

  /* ── Pattern décoratif en fond ── */
  .ct-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    opacity: .045;
  }
  .ct-bg svg {
    width: 100%;
    height: 100%;
  }

  /* ── Header ── */
  .ct-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 40px;
    gap: 16px;
    position: relative;
    z-index: 2;
  }
  .ct-eyebrow {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: #2d6be4;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ct-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1.5px;
    background: #2d6be4;
  }
  .ct-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 400;
    color: #0a1628;
    line-height: 1.1;
    letter-spacing: -.02em;
    margin: 0;
  }
  .ct-title em {
    font-style: italic;
    color: #1a3a6e;
  }

  /* ── Bouton voir toutes les offres ── */
  .ct-see-all {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 9px 18px 9px 9px;
    border: 1px solid rgba(10,22,40,.14);
    border-radius: 100px;
    background: white;
    transition: all .3s ease;
    flex-shrink: 0;
    outline: none;
    font-family: 'DM Sans', sans-serif;
  }
  .ct-see-all:hover {
    background: #0a1628;
    border-color: #0a1628;
  }
  .ct-see-all:hover .ct-sa-label { color: white; }
  .ct-see-all:hover .ct-sa-icon  { background: #2d6be4; color: white; }

  .ct-sa-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e8f0fe;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2d6be4;
    transition: all .3s;
  }
  .ct-sa-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #0a1628;
    transition: color .3s;
  }

  /* ── Grille ── */
  .ct-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    position: relative;
    z-index: 2;
  }
  @media (max-width: 900px) {
    .ct-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 580px) {
    .ct-grid  { grid-template-columns: 1fr; }
    .ct-header { flex-direction: column; align-items: flex-start; }
    .ct-wrap  { padding: 40px 20px 48px; }
  }

  /* ── Carte ── */
  .ct-card {
    border-radius: 22px;
    border: 1px solid rgba(10,22,40,.08);
    cursor: pointer;
    background: white;
    /* padding crée l'espace autour de l'image */
    padding: 16px;
    transition: transform .4s cubic-bezier(.25,.46,.45,.94), box-shadow .4s;
  }
  .ct-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(10,22,40,.1);
  }
  .ct-card:hover .ct-card-img img {
    transform: scale(1.04);
  }
  .ct-card:hover .ct-arrow {
    background: #2d6be4;
    color: white;
  }

  /* ── Image contenue dans le padding de la carte ── */
  .ct-card-img {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  margin-bottom: 16px;
  height: 160px;
  width: 300px;              /* largeur réduite */
  margin-left: auto;
  margin-right: auto;
}
  .ct-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.25,.46,.45,.94);
    display: block;
  }
  .ct-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, transparent 40%, rgba(10,22,40,.3));
    pointer-events: none;
  }
  .ct-badge {
    position: absolute;
    top: 11px;
    left: 11px;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .badge-blue  { background: rgba(45,107,228,.85); color: #deeaff; }
  .badge-slate { background: rgba(10,22,40,.72);   color: #d0d4e0; }
  .badge-gold  { background: rgba(180,140,40,.85); color: #fff2b8; }

  .ct-num {
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    font-weight: 700;
    color: white;
    opacity: .15;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  /* ── Contenu texte ── */
  .ct-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .ct-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .icon-blue  { background: #eef3fd; color: #2d6be4; }
  .icon-slate { background: #f1f1f3; color: #374151; }
  .icon-gold  { background: #fdf5e0; color: #c9a84c; }

  .ct-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 700;
    color: #0a1628;
    line-height: 1.2;
    margin: 0;
  }
  .ct-desc {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 14px;
    font-weight: 300;
  }
  .ct-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid rgba(10,22,40,.07);
  }
  .ct-explore {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: #0a1628;
  }
  .ct-arrow {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    color: #0a1628;
  }
`;

function BgPattern() {
  return (
    <div className="ct-bg">
  <svg
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="ct-dots" x="0" y="0" width="32" height="32" opacity="0.2" patternUnits="userSpaceOnUse">
        <circle cx="0" cy="0" r="0" fill="#000000" />
      </pattern>
    </defs>
    <rect width="1200" height="600" fill="url(#ct-dots)" />
  </svg>
</div>
  );
}

function CreditTypes() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <section className="ct-wrap">
        <BgPattern />

        {/* Header */}
        <div className="ct-header">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="ct-eyebrow">Solutions financières</p>
            <h2 className="ct-title">
              Nos <em>crédits</em> sur mesure
            </h2>
          </motion.div>

          <motion.button
            className="ct-see-all"
            onClick={() => navigate('/offres')}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="ct-sa-icon">
              <ArrowRightIcon style={{ width: 13, height: 13 }} />
            </span>
            <span className="ct-sa-label">Voir toutes les offres</span>
          </motion.button>
        </div>

        {/* Grille de cartes */}
        <div className="ct-grid">
          {credits.map((credit, i) => (
            <motion.div
              key={credit.id}
              className="ct-card"
              onClick={() => navigate(`/credit/${credit.id}`, { state: { creditId: credit.id } })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Image recadrée, plus petite que la carte grâce au padding */}
              <div className="ct-card-img">
                <img
                  src={credit.image}
                  alt={credit.title}
                  style={{ objectPosition: credit.imgPosition }}
                />
                <div className="ct-img-overlay" />
                <span className={`ct-badge ${credit.badgeCls}`}>{credit.category}</span>
                <span className="ct-num">{credit.num}</span>
              </div>

              {/* Texte */}
              <div className="ct-card-top">
                <div className={`ct-icon ${credit.iconCls}`}>{credit.icon}</div>
                <h3 className="ct-card-title">{credit.title}</h3>
              </div>
              <p className="ct-desc">{credit.description}</p>
              <div className="ct-footer">
                <span className="ct-explore">Explorer l'offre</span>
                <div className="ct-arrow">
                  <ArrowRightIcon style={{ width: 13, height: 13 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CreditTypes;