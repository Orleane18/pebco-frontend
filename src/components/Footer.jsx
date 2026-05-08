// Footer.jsx
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Pebco Finance</span>
            </div>
            <p className="text-sm">
              Votre partenaire de confiance pour vos projets de crédit. Solutions rapides, transparentes et adaptées.
            </p>
          </div>

          {/* Liens rapides avec flèches */}
          <div>
            <h3 className="text-blue-500 font-semibold mb-3">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Accueil</Link></li>
              <li><Link to="/offres" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Nos offres</Link></li>
              <li><Link to="/suivi" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Suivi du prêt</Link></li>
              <li><Link to="/remboursement" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Remboursement</Link></li>
              <li><Link to="/amortissement" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Simulateur</Link></li>
            </ul>
          </div>

          {/* Support & informations avec flèches */}
          <div>
            <h3 className="text-blue-500 font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> FAQ</Link></li>
              <li><Link to="/actualites" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Actualités</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition flex items-center gap-2"><ArrowRightIcon className="w-4 h-4" /> Contact</Link></li>
            </ul>
          </div>

          {/* Coordonnées (icônes conservées) */}
          <div>
            <h3 className="text--500 font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> +229 97 00 00 00</li>
              <li className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /> contact@pebcofinance.bj</li>
              <li className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" /> Cotonou, Bénin – Avenue Jean-Paul II</li>
              <li className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Lun–Ven 8h–17h, Sam 9h–13h</li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Pebco Finance – Microfinance. Tous droits réservés.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">Mentions légales</a>
            <a href="#" className="hover:text-blue-400 transition">Vie privée</a>
            <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;