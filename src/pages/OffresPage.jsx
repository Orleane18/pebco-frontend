// src/pages/OffresPage.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChartBarIcon, ClockIcon, BanknotesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const offres = [
  {
    titre: 'Crédit Individuel',
    taux: '5,5% TAEG',
    duree: '6 à 36 mois',
    montant: '100 000 FCFA à 3 000 000 FCFA',
    description: 'Financez vos projets personnels avec une flexibilité totale.',
    conditions: 'Justificatif de revenus',
    image: '/images/photo26.jpg',
    category: 'Particuliers'
  },
  {
    titre: 'Crédit Mutuel',
    taux: '6% TAEG',
    duree: '3 à 24 mois',
    montant: '50 000 FCFA à 1 500 000 FCFA',
    description: 'Une solution solidaire pour propulser vos activités locales.',
    conditions: 'Groupe de 3 à 5 membres',
    image: '/images/photo25.jpg',
    category: 'Entrepreneuriat'
  },
  {
    titre: 'Crédit Immobilier',
    taux: '4,8% TAEG',
    duree: '12 à 60 mois',
    montant: '500 000 FCFA à 10 000 000 FCFA',
    description: 'Devenez propriétaire avec un accompagnement personnalisé.',
    conditions: 'Apport minimum 15%',
    image: '/images/photo22.jpg',
    category: 'Patrimoine'
  },
  {
    titre: 'Crédit Agricole',
    taux: '5% TAEG',
    duree: '6 à 48 mois',
    montant: '100 000 FCFA à 5 000 000 FCFA',
    description: 'Optimisez votre production avec des financements dédiés.',
    conditions: 'Justificatif d’activité',
    image: '/images/photo24.jpg',
    category: 'Développement'
  }
];

function OffresPage() {
  const navigate = useNavigate();

  const handleDemande = (offre) => {
    navigate('/demande', { state: { offre } });
  };

  const handleSimulateur = (offre) => {
    const montantStr = offre.montant;
    const parts = montantStr.split('à');
    const montantMin = parseInt(parts[0].replace(/\D/g, ''), 10);
    const montantMax = parseInt(parts[1].replace(/\D/g, ''), 10);
    const tauxAnnuel = parseFloat(offre.taux.replace('% TAEG', '').trim());
    const dureeParts = offre.duree.split('à');
    const dureeMax = parseInt(dureeParts[1].replace('mois', '').trim(), 10);

    navigate('/amortissement', {
      state: {
        offre: offre.titre,
        taux: tauxAnnuel,
        dureeMax: dureeMax,
        montantMin: montantMin,
        montantMax: montantMax,
      }
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER INSTITUTIONNEL */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.nav 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-6"
          >
            <a href="/" className="hover:text-white transition">Accueil</a>
            <span className="text-slate-500">/</span>
            <span className="text-slate-300">Solutions de Financement</span>
          </motion.nav>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-[40px] font-light text-white leading-tight max-w-3xl"
          >
            Nos offres de <br />
            <span className="font-semibold text-blue-500">crédit structurées.</span>
          </motion.h1>
        </div>
      </section>

      {/* GRILLE D'OFFRES */}
      {/* GRILLE D'OFFRES */}
<section className="relative py-16 -mt-10">
  <div className="max-w-6xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {offres.map((offre, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col h-full w-full"
        >
          {/* Image Section */}
          <div className="relative h-40 mb-4 overflow-hidden rounded-xl">
            <img
              src={offre.image}
              alt={offre.titre}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow">
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">
              {offre.category}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{offre.titre}</h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed mb-4 flex-grow">
              {offre.description}
            </p>

            {/* Specs Grid */}
            <div className="space-y-2 mb-5 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-[11px]">
                <ChartBarIcon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-400">Taux :</span>
                <span className="font-bold text-slate-700 ml-auto">{offre.taux}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <ClockIcon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-400">Durée :</span>
                <span className="font-bold text-slate-700 ml-auto">{offre.duree}</span>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] pt-1">
                <div className="flex items-center gap-2">
                  <BanknotesIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-slate-400 uppercase tracking-tighter font-bold">Montant</span>
                </div>
                <span className="font-medium text-slate-600 leading-tight text-[11px]">{offre.montant}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDemande(offre)}
                className="w-full bg-slate-900 text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
              >
                Initier une demande
              </button>
              <button
                onClick={() => handleSimulateur(offre)}
                className="w-full border border-slate-200 text-slate-600 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all duration-300"
              >
                Calculer l'échéancier
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mt-10 text-center text-slate-400 text-[10px] font-light italic"
    >
      * Offres soumises à conditions de l'organisme prêteur. TAEG fixe sur toute la durée du contrat.
    </motion.p>
  </div>
</section>
    </div>
  );
}

export default OffresPage;