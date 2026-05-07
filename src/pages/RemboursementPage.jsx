// RemboursementPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCardIcon, 
  DevicePhoneMobileIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

function RemboursementPage() {
  const [reference, setReference] = useState('');
  const [montant, setMontant] = useState('');
  const [moyenPaiement, setMoyenPaiement] = useState('');
  const [loading, setLoading] = useState(false);
  const [infoPret, setInfoPret] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const rechercherPret = async (ref) => {
    setLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const prets = {
      'PEB001': { restant: 150000, total: 300000, echeance: '31 Déc. 2025', prochainPaiement: '25 000 FCFA' },
      'PEB002': { restant: 75000, total: 150000, echeance: '30 Juin 2025', prochainPaiement: '15 000 FCFA' },
    };
    const pret = prets[ref];
    if (pret) {
      setInfoPret(pret);
    } else {
      setError('Référence de prêt introuvable.');
      setInfoPret(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (reference.trim().length >= 6) {
      const timer = setTimeout(() => rechercherPret(reference.trim().toUpperCase()), 600);
      return () => clearTimeout(timer);
    }
  }, [reference]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSuccess(true);
    setLoading(false);
  };

  const moyensPaiement = [
    { id: 'mtn', label: 'MTN Money', color: 'bg-yellow-400' },
    { id: 'moov', label: 'Moov Money', color: 'bg-blue-600' },
    { id: 'celtiis', label: 'Celtiis Cash', color: 'bg-red-600' },
    { id: 'card', label: 'Carte Bancaire', color: 'bg-slate-800' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* HEADER INSTITUTIONNEL */}
      <section className="relative py-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">Espace Client</span>
            <h1 className="text-2xl md:text-3xl font-light text-white mb-3">
              Règlement <span className="font-semibold text-blue-500">Sécurisé.</span>
            </h1>
            <p className="text-slate-400 max-w-md font-light text-xs">
              Gérez vos remboursements en toute simplicité via nos canaux de paiement certifiés.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-12"> 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULAIRE (GAUCHE) */}
          <div className="lg:col-span-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-slate-400 p-6 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* ETAPE 1: RÉFÉRENCE */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-bold">1</span>
                    <h3 className="font-bold text-slate-700 uppercase tracking-tighter text-[11px]">Identification du prêt</h3>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="N° de Référence (ex: PEB001)"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                    />
                    {loading && <ArrowPathIcon className="absolute right-5 top-3 w-4 h-4 text-blue-500 animate-spin" />}
                  </div>
                </div>

                {/* ETAPE 2: MONTANT */}
                <div className={`space-y-3 transition-opacity ${!infoPret ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-bold">2</span>
                    <h3 className="font-bold text-slate-700 uppercase tracking-tighter text-[11px]">Montant du versement</h3>
                  </div>
                  <div className="relative">
                    <BanknotesIcon className="absolute left-5 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={montant}
                      onChange={(e) => setMontant(e.target.value)}
                      placeholder="Montant en FCFA"
                      className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-3 text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* ETAPE 3: MOYEN DE PAIEMENT */}
                <div className={`space-y-3 transition-opacity ${!montant ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-bold">3</span>
                    <h3 className="font-bold text-slate-700 uppercase tracking-tighter text-[11px]">Méthode de règlement</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {moyensPaiement.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMoyenPaiement(m.id)}
                        className={`group relative p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                          moyenPaiement === m.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center shadow-sm`}>
                          {m.id === 'card' ? <CreditCardIcon className="w-4 h-4 text-white" /> : <DevicePhoneMobileIcon className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-600">{m.label}</span>
                        {moyenPaiement === m.id && <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5"><CheckCircleIcon className="w-2 h-2" /></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BOUTON ACTIONS */}
                <div className="pt-4">
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-red-50 rounded-xl flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-tight">
                      <ExclamationTriangleIcon className="w-4 h-4" /> {error}
                    </motion.div>
                  )}

                  <button
                    disabled={!moyenPaiement || loading || success}
                    className="group relative w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all overflow-hidden disabled:opacity-30"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? 'Traitement en cours...' : success ? 'Transaction Réussie' : 'Confirmer le paiement'}
                      {!loading && !success && <ArrowPathIcon className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />}
                    </span>
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center gap-1 text-slate-400">
                    <ShieldCheckIcon className="w-3 h-3" />
                    <span className="text-[9px] uppercase font-bold tracking-widest">Cryptage SSL 256-bits activé</span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* RÉCAPITULATIF (DROITE) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {infoPret ? (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-blue-600 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-200 relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h4 className="text-blue-200 text-[9px] font-black uppercase tracking-[0.2em] mb-5">Détails du prêt actif</h4>
                    
                    <div className="space-y-5">
                      <div>
                        <span className="text-blue-100/60 text-[10px] block mb-0.5">Reste à rembourser</span>
                        <div className="text-2xl font-light italic">
                          {infoPret.restant.toLocaleString()} <span className="text-base font-bold not-italic text-blue-200">FCFA</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-blue-100/60 text-[8px] font-bold uppercase block mb-0.5">Échéance Finale</span>
                          <span className="font-bold text-[11px]">{infoPret.echeance}</span>
                        </div>
                        <div>
                          <span className="text-blue-100/60 text-[8px] font-bold uppercase block mb-0.5">Dernière Échéance</span>
                          <span className="font-bold text-[11px]">{infoPret.prochainPaiement}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  className="bg-slate-100 rounded-[2.5rem] p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-[320px]"
                >
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                    <BanknotesIcon className="w-6 h-6 text-slate-700" />
                  </div>
                  <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                    Saisissez votre référence de prêt pour afficher <br/> le récapitulatif financier.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

             <div className="mt-6 p-5 bg-white rounded-[2rem] border border-slate-300 flex items-start gap-3">
              <div className="p-1.5 bg-emerald-50 rounded-lg">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-[10px] font-bold text-slate-900 uppercase mb-0.5">Note de frais</h5>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Aucun frais supplémentaire n'est prélevé pour les règlements par Mobile Money. Pour les cartes internationales, une commission de 1.5% s'applique.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RemboursementPage;