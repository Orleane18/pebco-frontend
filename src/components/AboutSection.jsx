import { useState, useEffect, useRef } from 'react';

function AboutSection() {
  const [dynamicText, setDynamicText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const fullDynamic = "et transparente";
  const typingSpeed = 60;
  const deletingSpeed = 30;
  const pauseAfterTyping = 2000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let timeoutId;
    let intervalId;

    const tick = () => {
      if (!isDeleting) {
        if (dynamicText.length < fullDynamic.length) {
          setDynamicText(fullDynamic.substring(0, dynamicText.length + 1));
        } else {
          timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
        }
      } else {
        if (dynamicText.length > 0) {
          setDynamicText(fullDynamic.substring(0, dynamicText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    };

    intervalId = setInterval(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [hasStarted, dynamicText, isDeleting]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .about-section {
          min-height: 85vh;
          background: radial-gradient(circle at center, #ffffff 0%, #eef4f9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Pointillés décoratifs légers */
        .about-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(30, 64, 175, 0.1) 1.5px, transparent 1.5px);
          background-size: 30px 30px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
          opacity: 0.8;
          z-index: 1;
        }

        /* === DEUX BULLES DIAGONALES (couleurs douces) === */
       /* Bulle haut-droite (bleu accentué) */
        .blob-tr {
          position: absolute;
          top: -55%;
          right: -5%;
          width: 450px;
          height: 450px;
          background: #60a5fa; /* bleu plus présent */
          border-radius: 50%;
          z-index: 1;
        }

        /* Bulle bas-gauche (pêche accentué) */
        .blob-bl {
          position: absolute;
          bottom: -45%;  /* au lieu de -15% */
          left: -10%;
          width: 380px;
          height: 380px;
          background: #ee910f; /* cyan/bleu clair */
          border-radius: 50%;
          z-index: 1;
        }

        .about-container {
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 3rem;
          align-items: center;
          z-index: 10;
        }

        @media (max-width: 850px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
        }

        .mission-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1e40af;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .mission-line {
          width: 30px;
          height: 2px;
          background: #1e40af;
        }

        .about-heading {
          font-size: clamp(1.7rem, 3.5vw, 2.3rem);
          line-height: 1.15;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1rem;
          min-height: 100px;
        }

        .line-break {
          display: block;
          color: #2563eb;
          margin-top: 4px;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 0.85em;
          background: #2563eb;
          margin-left: 4px;
          animation: blink 0.8s infinite;
          vertical-align: middle;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .about-body-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 1.8rem;
          max-width: 480px;
          font-weight: 450;
        }

        .stats-row {
          display: flex;
          gap: 12px;
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
        }
        .stat-pill {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(30, 64, 175, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 20px;
          font-size: 11px;
          color: #1e293b;
          font-weight: 600;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);
        }
        .stat-pill b {
          color: #2563eb;
          margin-right: 3px;
          font-weight: 800;
        }

        .btn-modern {
          background: #1e40af;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          box-shadow: 0 6px 10px -3px rgba(30, 64, 175, 0.3);
        }
        .btn-modern:hover {
          transform: translateY(-2px);
          background: #1d4ed8;
          box-shadow: 0 12px 18px -5px rgba(30, 64, 175, 0.4);
        }

        .image-side {
          position: relative;
          justify-self: center;
          width: 100%;
        }

        .img-decoration {
          position: absolute;
          inset: -8px;
          border: 2px solid rgba(37, 99, 235, 0.3);
          border-radius: 16px;
          transform: rotate(2deg);
          z-index: 1;
        }

        .img-main {
          position: relative;
          z-index: 2;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/11;
          background: #e2e8f0;
          box-shadow: 0 18px 35px -12px rgba(0, 0, 0, 0.15);
        }
        .img-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .client-badge {
          position: absolute;
          top: -16px;
          right: -16px;
          background: white;
          border: 1px solid rgba(226, 232, 240, 1);
          padding: 8px 14px;
          border-radius: 12px;
          z-index: 3;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }
        .client-badge span {
          display: block;
          font-size: 9px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }
        .client-badge b {
          color: #1e40af;
          font-size: 1.1rem;
          font-weight: 800;
        }
      `}</style>

      <section ref={sectionRef} className="about-section">
        {/* Deux bulles diagonales */}
        <div className="blob-tr" />
        <div className="blob-bl" />

        <div className="about-container">
          <div className="text-content">
            <div className="mission-tag">
              <div className="mission-line" />
              NOTRE MISSION
            </div>

            <h2 className="about-heading">
              <span>Une finance accessible</span>
              <span className="line-break">
                {dynamicText}<span className="cursor" />
              </span>
            </h2>

            <p className="about-body-text">
              Pebco Finance facilite vos projets grâce à des solutions de microfinance 
              adaptées aux réalités du Bénin. Nous brisons les barrières pour votre succès 
              en vous offrant un accompagnement personnalisé et réactif.
            </p>

            <div className="stats-row">
              <div className="stat-pill"><b>10+</b> Ans d'expertise</div>
              <div className="stat-pill"><b>48h</b> Délai max</div>
              <div className="stat-pill"><b>98%</b> Taux d'accord</div>
            </div>

            <a href="#contact" className="btn-modern">Découvrir nos services</a>
          </div>

          <div className="image-side">
            <div className="img-decoration" />
            <div className="client-badge">
              <span>Partenaires</span>
              <b>+13.5K</b>
            </div>
            <div className="img-main">
              <img src="/images/photo23.jpg" alt="Équipe Pebco Finance au Bénin" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;