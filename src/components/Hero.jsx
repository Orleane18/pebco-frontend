import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Ajout de l'import

const Hero = () => {
  const navigate = useNavigate(); // Hook de navigation
  const images = [
    "/images/photo33.jpg",
    "/images/photo27.jpg",
    "/images/photo32.jpg",
    "/images/photo34.jpg",
    "/images/photo30.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const stopAutoPlay = () => setIsAutoPlaying(false);
  const startAutoPlay = () => setIsAutoPlaying(true);

  useEffect(() => {
  if (isAutoPlaying) {
    intervalRef.current = setInterval(goToNext, 3000); // Changé de 5000 à 3000
  } else if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
  return () => clearInterval(intervalRef.current);
}, [isAutoPlaying, goToNext]);

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Images de fond avec zoom */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: currentIndex === idx ? "scale(1.05)" : "scale(1)",
            opacity: currentIndex === idx ? 1 : 0,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Overlay dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center lg:text-left lg:max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Obtenez votre crédit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 underline decoration-blue-400 underline-offset-8">
              en 24h
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 backdrop-blur-sm bg-black/20 py-2 px-4 rounded-2xl inline-block lg:inline-block">
            Des taux compétitifs, zéro paperasse inutile. Votre projet, notre engagement.
          </p>

          <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start">
            {/* Bouton avec navigation */}
            <button
              onClick={() => navigate("/offres")}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Effectuer mon prêt
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
    onClick={() => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
  >
    En savoir plus
  </button>
          </div>

          {/* Navigation du carrousel */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition"
              aria-label="Image précédente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2 items-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? "bg-white w-8 h-2"
                      : "bg-white/50 hover:bg-white/80 w-2 h-2"
                  }`}
                  aria-label={`Aller à l'image ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition"
              aria-label="Image suivante"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;