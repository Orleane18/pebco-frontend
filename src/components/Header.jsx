import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function Header() {
  return (
    // On remplace z-10 par z-30 (ou z-40)
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2.5 rounded-full">
            <CurrencyDollarIcon className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">PEBCO</div>
            <div className="text-xs text-gray-500 -mt-1 tracking-wide">FINANCE</div>
          </div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-gray-700 hover:text-blue-600">Accueil</Link></li>
            <li><Link to="/offres" className="text-gray-700 hover:text-blue-600">Nos offres</Link></li>
            <li><Link to="/suivi" className="text-gray-700 hover:text-blue-600">Suivi du prêt</Link></li>
            <li><Link to="/remboursement" className="text-gray-700 hover:text-blue-600">Remboursement</Link></li>
            <li><Link to="/actualite" className="text-gray-700 hover:text-blue-600">Actualités</Link></li>
            <li><Link to="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
          </ul>
        </nav>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow">
          <UserCircleIcon className="w-5 h-5" /> Se connecter
        </button>
      </div>
    </header>
  );
}

export default Header;