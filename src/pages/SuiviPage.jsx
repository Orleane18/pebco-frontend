// src/pages/SuiviPage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
  CurrencyDollarIcon, 
  DocumentCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const demandesSimulees = {
  'PEB123': {
    etat: 'INSTRUCTION',
    message: 'Votre dossier est en cours d’analyse approfondie par notre comité de crédit.',
    etape: 2,
    details: { dateDepot: '12/05/2025', dateInstruction: '14/05/2025', datePrevue: '20/05/2025', montant: '1 200 000 FCFA', duree: '24 mois' }
  },
  'PEB456': {
    etat: 'APPROUVE',
    message: 'Félicitations ! Votre demande a été validée. Votre contrat est en cours de génération.',
    etape: 3,
    details: { dateDepot: '05/05/2025', dateApprobation: '10/05/2025', montant: '2 500 000 FCFA', duree: '36 mois', taux: '5,5%' }
  },
  'PEB789': {
    etat: 'DECAISSE',
    message: 'Les fonds ont été transférés sur votre compte de règlement.',
    etape: 4,
    details: { dateDepot: '20/04/2025', dateDecaissement: '28/04/2025', montant: '800 000 FCFA', duree: '12 mois' }
  },
  'PEB000': {
    etat: 'REFUSE',
    message: 'Malheureusement, votre demande ne remplit pas nos critères d’éligibilité actuels.',
    etape: 1,
    details: { dateDepot: '01/05/2025', motif: 'Capacité d’endettement atteinte' }
  }
};

const STEPS = ["Dépôt", "Instruction", "Approbation", "Décaissement"];

function SuiviPage() {
  const [reference, setReference] = useState('');
  const [statut, setStatut] = useState(null);
  const [recherche, setRecherche] = useState(false);
  const [error, setError] = useState('');

  const getTheme = (etat) => {
    switch(etat) {
      case 'INSTRUCTION': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: ClockIcon };
      case 'APPROUVE': return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', icon: CheckCircleIcon };
      case 'DECAISSE': return { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: CurrencyDollarIcon };
      case 'REFUSE': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', icon: ExclamationCircleIcon };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100', icon: DocumentCheckIcon };
    }
  };

  const handleRecherche = (e) => {
    e.preventDefault();
    setError('');
    if (!reference.trim()) {
      setError('Référence requise');
      return;
    }
    setRecherche(true);
    const demande = demandesSimulees[reference.toUpperCase()];
    setStatut(demande || { etat: 'NON_TROUVE', message: 'Référence introuvable dans nos registres.' });
  };

  const theme = getTheme(statut?.etat);

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER INSTITUTIONNEL */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light text-white mb-6"
          >
            Espace de <span className="font-semibold text-blue-500">Suivi.</span>
          </motion.h1>
          <p className="text-white max-w-xl mx-auto font-light text-sm tracking-wide">
            Consultez l'évolution de votre dossier en temps réel avec votre numéro de référence.
          </p>
        </div>
      </section>

      {/* ZONE DE RECHERCHE */}
      <section className="relative -mt-12 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-2 border border-slate-300">
            <form onSubmit={handleRecherche} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Entrez votre référence (ex: PEB123)"
                  className="w-full pl-14 pr-6 py-5 bg-transparent text-slate-900 font-medium focus:outline-none placeholder:text-slate-400 placeholder:font-light"
                />
              </div>
              <button type="submit" className="bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300">
                Rechercher
              </button>
            </form>
          </div>
          {error && <p className="text-red-500 text-center mt-4 text-xs font-bold uppercase tracking-tighter">{error}</p>}
        </div>

        {/* RÉSULTATS */}
        <div className="max-w-5xl mx-auto px-6 mt-16">
          <AnimatePresence mode="wait">
            {recherche && statut && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {statut.etat === 'NON_TROUVE' ? (
                  <div className="bg-slate-50 border border-slate-200 p-12 rounded-[2.5rem] text-center">
                    <ExclamationCircleIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">{statut.message}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* CARTE STATUT (GAUCHE) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className={`p-10 rounded-[2.5rem] border ${theme.border} ${theme.bg}`}>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`p-3 rounded-xl bg-white shadow-sm ${theme.color}`}>
                            <theme.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut Actuel</span>
                            <h2 className={`text-2xl font-bold ${theme.color} leading-none`}>{statut.etat}</h2>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-light mb-8 italic">"{statut.message}"</p>
                        
                        {/* STEPPER PRO */}
                        <div className="relative pt-8">
                          <div className="absolute top-[3.25rem] left-0 w-full h-0.5 bg-slate-200">
                            <div 
                              className={`h-full transition-all duration-1000 ${theme.color.replace('text', 'bg')}`} 
                              style={{ width: `${((statut.etape - 1) / (STEPS.length - 1)) * 100}%` }}
                            />
                          </div>
                          <div className="relative flex justify-between">
                            {STEPS.map((s, i) => (
                              <div key={i} className="flex flex-col items-center group">
                                <div className={`w-4 h-4 rounded-full border-4 bg-white z-10 transition-colors duration-500 ${i + 1 <= statut.etape ? theme.color.replace('text', 'border') : 'border-slate-200'}`} />
                                <span className={`mt-3 text-[9px] font-bold uppercase tracking-tighter ${i + 1 <= statut.etape ? 'text-slate-900' : 'text-slate-300'}`}>
                                  {s}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* INFOS COMPLÉMENTAIRES */}
                      <div className="bg-slate-800 rounded-[2.5rem] p-10 text-white flex items-center justify-between overflow-hidden relative">
                        <div className="relative z-10">
                          <h4 className="text-sm font-bold mb-1">Besoin d'assistance ?</h4>
                          <p className="text-slate-400 text-xs font-light">Un conseiller vous répond en direct.</p>
                        </div>
                        <button className="relative z-10 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition">
                          Contacter le support
                        </button>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full" />
                      </div>
                    </div>

                    {/* CARTE DÉTAILS (DROITE) */}
                    <div className="lg:col-span-5">
                      <div className="bg-white border border-slate-300 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/30">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-8 pb-4 border-b border-slate-50">
                          Fiche technique
                        </h3>
                        <div className="space-y-6">
                          {Object.entries(statut.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-end border-b border-slate-50 pb-4">
                              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-sm font-bold text-slate-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-10 p-6 bg-slate-100 rounded-2xl border border-dashed border-slate-400">
                          <p className="text-[10px] text-slate-800 text-center leading-relaxed font-medium uppercase tracking-widest">
                            Réf. Unique : {reference.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default SuiviPage;