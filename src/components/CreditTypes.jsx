import React, { useState, useEffect } from 'react';

const OriginalArrow = ({
  width = 100,
  height = 100,
  color = "#FFBF00"
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* Corps principal */}
    <path
      d="M30,30 C30,30 20,40 15,50 C10,60 20,70 30,70 C40,70 50,60 45,50 C40,40 30,30 30,30 Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Extension supérieure */}
    <path
      d="M30,30 C35,25 40,20 45,15"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Extension inférieure */}
    <path
      d="M30,70 C35,75 40,80 45,85"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Accentuation */}
    <path
      d="M60,40 C65,45 70,50 75,55"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Pointe */}
    <g transform="translate(80, 50) rotate(-15)">
      <line
        x1="0"
        y1="0"
        x2="20"
        y2="0"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M12,-8 L20,0 L12,8"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default function CreditSliderHero() {
  const slides = [
    {
      id: 'mutuel',
      title: (
        <>
          Financer ensemble avec <br />
          notre <span className="text-[#2D4A43]">Crédit Mutuel</span>
        </>
      ),
      desc: "Bénéficiez de la force du collectif. Avec la caution solidaire de votre groupe, accédez à des fonds sécurisés pour propulser vos activités communautaires, agricoles ou entrepreneuriales en toute confiance.",
      features: [
        'Caution solidaire du groupe',
        'Gestion transparente',
        'Taux communautaires adaptés',
        'Suivi collectif régulier'
      ],
      images: {
        main: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=600&q=80",
        overlay: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80"
      }
    },
    {
      id: 'individuel',
      title: (
        <>
          Propulsez vos projets via le <br />
          <span className="text-[#2D4A43]">Crédit Individuel</span>
        </>
      ),
      desc: "Une solution de financement sur mesure conçue exclusivement pour les entrepreneurs et particuliers. Donnez vie à vos ambitions personnelles ou commerciales grâce à des modalités de remboursement flexibles.",
      features: [
        'Montants hautement flexibles',
        'Analyse personnalisée',
        'Garanties allégées',
        'Déblocage rapide des fonds'
      ],
      images: {
        main: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
        overlay: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80"
      }
    },
    {
      id: 'immobilier',
      title: (
        <>
          Devenez propriétaire avec le <br />
          <span className="text-[#2D4A43]">Crédit Immobilier</span>
        </>
      ),
      desc: "Construisez ou achetez le bien de vos rêves. Nos solutions de financement immobilier vous offrent des taux hautement compétitifs et des durées étendues pour sécuriser votre patrimoine familial.",
      features: [
        'Taux d\'intérêt compétitifs',
        'Durées de remboursement étendues',
        'Accompagnement d\'experts',
        'Financement de construction/achat'
      ],
      images: {
        main: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
        overlay: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80"
      }
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[currentSlide];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F4F6F6] p-8 md:p-16 min-h-[700px] select-none">
        
        {/* Motif de points décoratif */}
        <div 
          className="absolute top-4 left-4 w-32 h-32 opacity-40 hidden md:block transition-all duration-700"
          style={{
            backgroundImage: 'radial-gradient(#5a8070 2px, transparent 2px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* SECTION GAUCHE : Images and the Icon */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
          <div className="col-span-8 overflow-hidden rounded-[2rem] shadow-sm z-10 bg-gray-200">
            <img 
              key={`main-${currentSlide}`}
              src={current.images.main} 
              alt="Crédit visuel" 
              className="w-full h-[400px] object-cover animate-fadeIn"
            />
          </div>

          {/* This is the spot for the new icon, replacing the smallest image */}
           <div className="col-span-4 self-start mt-4 z-20 flex justify-center items-center animate-fadeIn">
            <OriginalArrow
              width={90}
              height={90}
              color="#E6A817"
            />
          </div>


          <div className="col-start-5 col-span-6 -mt-32 overflow-hidden rounded-[2rem] shadow-md z-20 border-4 border-[#F4F6F6] bg-gray-200">
            <img 
              key={`overlay-${currentSlide}`}
              src={current.images.overlay} 
              alt="Focus crédit" 
              className="w-full h-[300px] object-cover animate-fadeIn"
            />
          </div>
        </div>

        {/* SECTION DROITE : Textes */}
        <div className="lg:col-span-5 space-y-6 px-4 lg:px-0 flex flex-col justify-center">
          
          <h1 key={`title-${currentSlide}`} className="text-4xl lg:text-5xl font-bold text-[#1E2322] leading-tight font-serif animate-fadeIn">
            {current.title}
          </h1>
          
          <p key={`desc-${currentSlide}`} className="text-gray-500 leading-relaxed text-[15px] min-h-[100px] animate-fadeIn">
            {current.desc}
          </p>

          <div key={`features-${currentSlide}`} className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 pt-2 animate-fadeIn">
            {current.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="inline-block w-2 h-2 rounded-full border-2 border-[#2D4A43] mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 font-medium leading-tight">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <button className="bg-[#2A2A2A] hover:bg-[#1E1E1E] text-white font-semibold px-8 py-3.5 rounded-full transition duration-300 ease-in-out shadow-sm text-sm whitespace-nowrap">
              Découvrir l'offre
            </button>

            <div className="flex space-x-2.5 items-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-7 bg-[#2D4A43]' 
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}