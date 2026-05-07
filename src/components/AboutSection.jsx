// src/components/AboutSection.jsx
import { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

function AboutSection() {
  const [dynamicText, setDynamicText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const staticStart = "Rendre le crédit ";
  const wordsToType = "accessible et transparent";
  const fullDynamic = wordsToType;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseAfterTyping = 2000;
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
          timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
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
            startTyping();
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
    <section ref={sectionRef} id="about-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Notre mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {staticStart}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 relative">
                {dynamicText}
                {hasStarted && (dynamicText.length < fullDynamic.length || isDeleting) && (
                  <span className="inline-block w-[2px] h-6 md:h-8 bg-cyan-400 ml-1 animate-pulse align-middle" />
                )}
              </span>
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              Chez <strong>Pebco Finance</strong>, nous croyons que chaque projet mérite d’être financé
              avec simplicité et équité. Notre objectif est de vous accompagner vers la réalisation
              de vos ambitions personnelles ou professionnelles, grâce à des solutions de crédit
              adaptées, rapides et sans paperasse inutile.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
              {/* <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div> */}
              <img
                src="/images/photo19.jpg"
                alt="À propos de Pebco Finance"
                className="relative rounded-2xl w-full max-w-md object-cover z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;