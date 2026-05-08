import { useState, useEffect } from 'react';
import { UserCircleIcon, CurrencyDollarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Définition des liens basée exactement sur vos Routes
  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos offres', path: '/offres' },
    { name: 'Suivi du prêt', path: '/suivi' },
    { name: 'Remboursement', path: '/remboursement' },
    { name: 'Actualités', path: '/actualite' },
    { name: 'Faq', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-lg py-2" 
          : "bg-gradient-to-b from-black/50 to-transparent py-5" 
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO - Retour à l'accueil */}
        <Link to="/" className="flex items-center gap-3 group transition-transform duration-500">
          <div className={`p-2 rounded-xl border transition-all duration-500 ease-in-out ${
            isScrolled 
              ? "bg-blue-600 border-blue-600 shadow-lg scale-90" 
              : "bg-white/10 border-white/20 backdrop-blur-md scale-100"
          }`}>
            <CurrencyDollarIcon className="w-7 h-7 text-white" />
          </div>
          <div className={`transition-transform duration-500 ${isScrolled ? "scale-95 origin-left" : ""}`}>
            <div className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}>
              PEBCO
            </div>
            <div className={`text-[10px] font-bold tracking-[0.2em] -mt-1 transition-colors duration-500 ${
              isScrolled ? "text-blue-600" : "text-blue-300"
            }`}>
              FINANCE
            </div>
          </div>
        </Link>

        {/* NAVIGATION DYNAMIQUE */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`text-sm font-bold transition-all duration-500 relative group py-2 ${
                    isScrolled ? "text-slate-600 hover:text-blue-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${
                    isScrolled ? "bg-blue-600" : "bg-blue-400"
                  }`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-8">
          <MagnifyingGlassIcon className={`w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-500 ${
            isScrolled ? "text-slate-500" : "text-white"
          }`} />
          
          {/* Bouton Espace Client (peut être lié à une page login si vous en avez une) */}
          <button className={`flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-sm transition-all duration-500 active:scale-90 ${
            isScrolled 
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200" 
              : "bg-white text-blue-900 hover:bg-blue-50"
          }`}>
            <UserCircleIcon className="w-5 h-5" /> 
            <span className="hidden sm:inline">Se Connecter</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;