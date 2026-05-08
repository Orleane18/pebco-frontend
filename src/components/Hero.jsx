import { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "/images/photo33.jpg",
    "/images/photo27.jpg",
    "/images/photo32.jpg",
    "/images/photo34.jpg",
    "/images/photo30.jpg"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const itv = setInterval(() => setCurrentIndex(prev => (prev + 1) % images.length), 5000);
    return () => clearInterval(itv);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center bg-slate-900">
      {/* Background Images */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%", // Ajusté pour bien voir les visages
            opacity: currentIndex === idx ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay sombre pour la lisibilité (très important) */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Contenu textuel - Aligné comme sur l'image */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16 w-full pt-20">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-white text-5xl md:text-7xl lg:text-5xl font-bold leading-[1.05] tracking-tighter">
            Le moment est venu de <br />
            réaliser vos plus <br />
            beaux projets
          </h1>
          
          <div className="pt-8">
             <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-2xl">
               Découvrir nos solutions
             </button>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide (traits fins en bas) */}
      <div className="absolute bottom-10 left-6 lg:left-16 z-20 flex gap-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-[2px] transition-all duration-500 ${currentIndex === idx ? "w-16 bg-white" : "w-8 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;