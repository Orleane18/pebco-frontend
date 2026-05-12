import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  // On supprime la variable isHomePage, car on veut la transparence partout
  // const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion du clic en dehors et de la touche Échap
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
      if (inputRef.current) inputRef.current.focus();
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Recherche :', searchQuery);
      // Ici redirection ou appel API
      // window.location.href = `/recherche?q=${searchQuery}`;
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Transparent partout tant que l'utilisateur n'a pas défilé
  const isTransparent = !isScrolled;

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out will-change-[background,padding] ${
        isTransparent 
          ? "bg-transparent py-5" 
          : "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center gap-6">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className={`transition-all duration-200 ${isScrolled ? "scale-90" : "scale-100"}`}>
            <img 
              src="/images/pebco_logo.png" 
              alt="PEBCO BETHESDA Logo" 
              className="w-auto h-10 object-contain"
            />
          </div>
          <div className={`flex flex-col transition-transform duration-200 ${!isTransparent ? "scale-95 origin-left" : ""}`}>
            <span className={`text-2xl font-black tracking-tighter leading-none transition-colors duration-200 ${
              isTransparent ? "text-white" : "text-slate-900"
            }`}>
              PEBCO
            </span>
            <span className={`text-[9px] font-bold tracking-[0.3em] transition-colors duration-200 ${
              isTransparent ? "text-blue-300" : "text-blue-600"
            }`}>
              BETHESDA
            </span>
          </div>
        </Link>

        {/* NAVIGATION CENTRALE */}
        <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex space-x-7">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`text-[11px] font-bold transition-colors duration-200 relative group py-2 uppercase tracking-wide ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${
                    isTransparent ? "bg-white" : "bg-blue-600"
                  }`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RECHERCHE : icône seule, input au clic */}
        <div className="flex items-center gap-3 shrink-0">
          <div ref={searchRef} className="relative flex items-center">
            <button
              onClick={() => setShowSearch(true)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isTransparent ? "hover:bg-white/10" : "hover:bg-slate-100"
              }`}
              aria-label="Rechercher"
            >
              <MagnifyingGlassIcon className={`w-5 h-5 transition-colors duration-200 ${
                isTransparent ? "text-white" : "text-slate-600"
              }`} />
            </button>

            <form
              onSubmit={handleSearchSubmit}
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showSearch ? "w-48 ml-1" : "w-0"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 px-2 text-sm rounded-full border outline-none transition-colors duration-200 ${
                  isTransparent
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    : "bg-slate-100 border-slate-200 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-400"
                }`}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;