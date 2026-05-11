// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from 'react';

function AboutSection() {
  const [dynamicText, setDynamicText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const fullDynamic = "accessible et transparent";
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseAfterTyping = 2200;
  const pauseAfterDeleting = 500;

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

    const startTyping = () => {
      let index = 0;
      intervalId = setInterval(() => {
        if (index < fullDynamic.length) {
          setDynamicText(fullDynamic.substring(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setShowCursor(false);
          timeoutId = setTimeout(() => {
            setShowCursor(true);
            setIsDeleting(true);
          }, pauseAfterTyping);
        }
      }, typingSpeed);
    };

    const startDeleting = () => {
      let index = fullDynamic.length;
      intervalId = setInterval(() => {
        if (index > 0) {
          setDynamicText(fullDynamic.substring(0, index - 1));
          index--;
        } else {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            setIsDeleting(false);
          }, pauseAfterDeleting);
        }
      }, deletingSpeed);
    };

    if (!isDeleting) {
      startTyping();
    } else {
      startDeleting();
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [hasStarted, isDeleting]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #2a4468 0%, #25477e 60%, #2d6ac0 100%);
          display: flex;
          align-items: center;
          padding: 5rem 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .about-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,176,66,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,176,66,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .about-bg-circle-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,176,66,0.06) 0%, transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
        }

        .about-bg-circle-2 {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(24,95,165,0.15) 0%, transparent 70%);
          bottom: -50px; left: 100px;
          pointer-events: none;
        }

        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        @media (max-width: 900px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-image-side {
            order: -1;
          }
        }

        .about-text-side {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
        }

        .about-eyebrow-line {
          width: 32px; height: 1px;
          background: #F5B042;
        }

        .about-eyebrow span {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #F5B042;
        }

        .about-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2.75rem;
          line-height: 1.15;
          color: #f0ece4;
          margin: 0;
        }

        @media (max-width: 600px) {
          .about-heading { font-size: 2rem; }
        }

        .about-dynamic-text {
          background: linear-gradient(90deg, #F5B042, #FFD966);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-cursor {
          display: inline-block;
          width: 3px;
          height: 2.2rem;
          background: #FFD966;
          margin-left: 3px;
          vertical-align: middle;
          animation: aboutBlink 1s step-end infinite;
        }

        @keyframes aboutBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .about-body-text {
          font-size: 1rem;
          color: rgba(214, 210, 200, 0.8);
          line-height: 1.85;
          font-weight: 300;
          max-width: 440px;
          margin: 0;
        }

        .about-body-text strong {
          color: #FFD966;
          font-weight: 500;
        }

        .about-stats {
          display: flex;
          gap: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(245,176,66,0.2);
          flex-wrap: wrap;
        }

        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .about-stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #FFD966;
          line-height: 1;
        }

        .about-stat-label {
          font-size: 11px;
          color: rgba(214,210,200,0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1.75rem;
          background: linear-gradient(135deg, #F5B042, #FFD966);
          color: #0a1628;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: opacity 0.2s, transform 0.2s;
          text-decoration: none;
        }

        .about-cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .about-cta-link {
          font-size: 0.875rem;
          color: rgba(214,210,200,0.7);
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.03em;
          border-bottom: 1px solid rgba(245,176,66,0.4);
          padding-bottom: 1px;
          transition: color 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          font-family: 'DM Sans', sans-serif;
        }

        .about-cta-link:hover { color: #FFD966; }

        .about-image-side {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about-image-frame {
          position: relative;
          width: 380px;
        }

        .about-image-border-accent {
          position: absolute;
          top: -16px; left: -16px;
          width: 100%; height: 100%;
          border: 2px solid rgba(245,176,66,0.35);
          border-radius: 2px;
          z-index: 0;
        }

        .about-dot-pattern {
          position: absolute;
          top: 20px;
          right: -30px;
          width: 80px;
          height: 80px;
          background-image: radial-gradient(rgba(245,176,66,0.3) 1.5px, transparent 1.5px);
          background-size: 12px 12px;
          z-index: 0;
        }

        .about-image-wrapper {
          position: relative;
          width: 380px;
          height: 460px;
          background: linear-gradient(135deg, #0d2347 0%, #1a3a6e 100%);
          border-radius: 2px;
          z-index: 1;
          overflow: hidden;
        }

        .about-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 70%, rgba(245,176,66,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(24,95,165,0.2) 0%, transparent 50%);
          z-index: 1;
        }

        .about-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
          position: relative;
          z-index: 2;
          display: block;
        }

        .about-badge-card {
          position: absolute;
          bottom: -20px;
          left: -40px;
          background: #0a1628;
          border: 1px solid rgba(245,176,66,0.3);
          border-radius: 2px;
          padding: 1rem 1.25rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 200px;
        }

        .about-badge-icon {
          width: 40px; height: 40px;
          background: rgba(245,176,66,0.12);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .about-badge-number {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #f0ece4;
          line-height: 1;
          display: block;
        }

        .about-badge-desc {
          font-size: 11px;
          color: rgba(245,176,66,0.7);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-top: 3px;
        }
      `}</style>

      <section ref={sectionRef} id="about-section" className="about-section">
        <div className="about-bg-grid" />
        <div className="about-bg-circle-1" />
        <div className="about-bg-circle-2" />

        <div className="about-container">
          {/* Texte */}
          <div className="about-text-side">
            <div className="about-eyebrow">
              <div className="about-eyebrow-line" />
              <span>Notre mission</span>
            </div>

            <h2 className="about-heading">
              Rendre le crédit{' '}
              <span className="about-dynamic-text">{dynamicText}</span>
              {hasStarted && showCursor && (
                <span className="about-cursor" />
              )}
            </h2>

            <p className="about-body-text">
              Chez <strong>Pebco Finance</strong>, nous croyons que chaque projet mérite d'être
              financé avec simplicité et équité. Notre objectif est de vous accompagner vers la
              réalisation de vos ambitions personnelles ou professionnelles, grâce à des solutions
              de crédit adaptées, rapides et sans paperasse inutile.
            </p>

            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-number">+13 555</span>
                <span className="about-stat-label">Clients financés</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">98 %</span>
                <span className="about-stat-label">Satisfaction</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">48 h</span>
                <span className="about-stat-label">Délai moyen</span>
              </div>
            </div>

            <div className="about-cta-row">
              <a href="offres" className="about-cta-btn">
                Découvrir nos offres
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="about-cta-link">Nous contacter</a>
            </div>
          </div>

          {/* Image */}
          <div className="about-image-side">
            <div className="about-image-frame">
              <div className="about-image-border-accent" />
              <div className="about-dot-pattern" />
              <div className="about-image-wrapper">
                <img
                  src="/images/photo19.jpg"
                  alt="À propos de Pebco Finance"
                />
              </div>
              <div className="about-badge-card">
                <div className="about-badge-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#FFD966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div>
                  <span className="about-badge-number">100 % Sécurisé</span>
                  <span className="about-badge-desc">Données protégées</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;