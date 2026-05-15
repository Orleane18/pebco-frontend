import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const credits = [
  {
    id: 'mutuel',
    title: 'Crédit Mutuel',
    subtitle: 'La force du collectif',
    description: 'Propulsez vos micro-activités grâce à la caution solidaire du groupe. Un levier puissant pour le développement communautaire.',
    extra: 'Ce crédit favorise l’entraide et permet l’accès au financement pour ceux qui ne disposent pas de garanties matérielles classiques.',
    target: 'Groupements de femmes, artisans et coopératives agricoles.',
    image: '/images/photo25.jpg',
  },
  {
    id: 'individuel',
    title: 'Crédit Individuel',
    subtitle: 'Réalisez vos ambitions',
    description: 'Une solution flexible pour transformer vos projets personnels en réalité, avec un accompagnement sur mesure.',
    extra: 'Bénéficiez de taux compétitifs et d’un échéancier adapté à votre capacité de remboursement réelle.',
    target: 'Salariés, entrepreneurs individuels et porteurs de projets.',
    image: '/images/photo26.jpg',
  },
  {
    id: 'immobilier',
    title: 'Crédit Immobilier',
    subtitle: 'Bâtir votre avenir',
    description: 'De l’acquisition à la rénovation, nous finançons vos ambitions immobilières avec des conditions compétitives.',
    extra: 'Un accompagnement expert pour sécuriser votre investissement sur le long terme.',
    target: 'Particuliers et investisseurs immobiliers.',
    image: '/images/photo22.jpg',
  },
];

const styles = `
  .credit-slider-section {
    width: 100%;
    background: #ffffff;
    padding: 80px 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .section-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .section-main-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    color: #0f172a;
    font-weight: 700;
    position: relative;
    display: inline-block;
    padding-bottom: 15px;
  }

  .section-main-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #2563eb;
  }

  .swiper-container-main {
    max-width: 950px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 15px 35px rgba(0,0,0,0.06);
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #f1f5f9;
  }

  .credit-slide-content {
    display: flex;
    min-height: 450px;
    align-items: stretch;
  }

  .slide-image-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .slide-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .blue-tag {
    position: absolute;
    top: 0;
    left: 20px;
    width: 35px;
    height: 45px;
    background: #2563eb;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
    z-index: 10;
  }

  .slide-text-wrapper {
    flex: 1;
    padding: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
  }

  .title-container {
    border-left: 3px solid #2563eb;
    padding-left: 15px;
    margin-bottom: 25px;
  }

  .main-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .sub-title {
    font-size: 20px;
    color: #2563eb;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .description-main {
    font-size: 15px;
    line-height: 1.6;
    color: #334155;
    margin-bottom: 15px;
  }

  .description-extra {
    font-size: 14px;
    line-height: 1.5;
    color: #64748b;
    margin-bottom: 25px;
  }

  .target-box {
    border-top: 1px solid #f1f5f9;
    padding-top: 15px;
    font-size: 13.5px;
  }

  .target-label {
    font-weight: 700;
    color: #0f172a;
    margin-right: 6px;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #94a3b8;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    background: #2563eb !important;
    opacity: 1;
    width: 20px;
    border-radius: 4px;
    transition: all 0.3s;
  }

  @media (max-width: 768px) {
    .credit-slide-content { flex-direction: column; }
    .slide-image-wrapper { height: 250px; }
    .slide-text-wrapper { padding: 30px; }
  }
`;

function CreditSlider() {
  return (
    <>
      <style>{styles}</style>
      <section className="credit-slider-section">
        <div className="section-header">
          <motion.h2 
            className="section-main-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nos solutions de crédits
          </motion.h2>
        </div>

        <div className="swiper-container-main">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
          >
            {credits.map((credit) => (
              <SwiperSlide key={credit.id}>
                <div className="credit-slide-content">
                  <div className="slide-image-wrapper">
                    <div className="blue-tag"></div>
                    <img src={credit.image} alt={credit.title} />
                  </div>

                  <div className="slide-text-wrapper">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="title-container">
                        <h2 className="main-title">{credit.title}</h2>
                      </div>
                      <h3 className="sub-title">{credit.subtitle}</h3>
                      <p className="description-main">{credit.description}</p>
                      <p className="description-extra">{credit.extra}</p>
                      <div className="target-box">
                        <p>
                          <span className="target-label">Cible :</span>
                          {credit.target}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default CreditSlider;