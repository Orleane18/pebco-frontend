import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCardIcon, DevicePhoneMobileIcon, CheckCircleIcon,
  BanknotesIcon, CalendarDaysIcon, ArrowRightIcon,
  ShieldCheckIcon, ArrowLeftIcon, LockClosedIcon, ClockIcon 
} from '@heroicons/react/24/outline';

function RemboursementPage() {
  const [step, setStep] = useState(1); // 1: Stratégie, 2: Échéancier, 3: Checkout
  const [typeRemboursement, setTypeRemboursement] = useState(null);
  const [moisSelectionne, setMoisSelectionne] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState(null);

   const infoPret = {
    reference: "PRÉT-FINTECH-88291-B",
    totalInitial: 300000,
    restant: 150000,
    mensualite: 25000,
    principal: 22000, // Capital
    interets: 3000,    // Intérêts
    dureeTotale: 12,
    tranchesPayees: [1, 2, 3, 4, 5, 6]
  };

 // --- ÉTAPE 1 : SELECTION DU MODE (hover moins prononcé) ---
const Step1Choix = () => (
  <div className="max-w-3xl mx-auto py-12 px-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-light text-slate-900 tracking-tight">
        Comment souhaitez-vous <span className="font-semibold">rembourser ?</span>
      </h2>
      <p className="text-slate-400 text-sm mt-2">Sélectionnez l'option qui convient à votre trésorerie actuelle.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          id: 'total',
          title: 'Remboursement Intégral',
          desc: 'Solder la totalité du capital restant en un seul versement.',
          icon: <BanknotesIcon className="w-5 h-5" />,
          color: 'bg-slate-900',
          action: () => { setTypeRemboursement('total'); setStep(3); }
        },
        {
          id: 'tranche',
          title: 'Paiement Échelonné',
          desc: 'Régler uniquement la prochaine mensualité de votre échéancier.',
          icon: <CalendarDaysIcon className="w-5 h-5" />,
          color: 'bg-blue-600',
          action: () => { setTypeRemboursement('tranche'); setStep(2); }
        }
      ].map((item) => (
        <button 
          key={item.id}
          onClick={item.action}
          className="relative group text-left p-6 bg-white border-2 border-slate-200 rounded-[2rem] hover:border-slate-400 transition-all duration-500 hover:shadow-md hover:shadow-slate-200 overflow-hidden"
        >
          {/* Effet de brillance très atténué */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 via-slate-50/0 to-slate-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className={`w-10 h-10 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
              <div className="text-white">
                {item.icon}
              </div>
            </div>
            
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">
              {item.title}
            </h3>
            
            <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium">
              {item.desc}
            </p>

            <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">
              Sélectionner <ArrowRightIcon className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

  // --- ÉTAPE 2 : TABLEAU DE PAIEMENT ---
  const Step2Tableau = () => (
  <div className="py-8 px-6">
    <div className="max-w-6xl mx-auto bg-white border border-slate-300 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-300 bg-slate-50 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Tableau d'amortissement détaillé</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Référence : <span className="font-mono text-slate-700">{infoPret.reference}</span></p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Taux d'intérêt</p>
            <p className="text-base font-bold text-slate-800">4.5% <span className="text-[9px] text-slate-500">(Fixe)</span></p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Reste à payer</p>
            <p className="text-base font-bold text-blue-600">{infoPret.restant.toLocaleString()} F</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-50/50">
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider w-20">N°</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider">Versement</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider">Capital</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider">Intérêts</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider text-center">Statut</th>
              <th className="px-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-mono text-xs text-slate-700">
            {Array.from({ length: infoPret.dureeTotale }).map((_, i) => {
              const moisId = i + 1;
              const isPaid = infoPret.tranchesPayees.includes(moisId);
              const isNext = moisId === infoPret.tranchesPayees.length + 1;

              return (
                <tr key={moisId} className={`${isNext ? 'bg-blue-50/30' : ''} border-b border-slate-100 last:border-b-0`}>
                  <td className="px-6 py-3">{moisId.toString().padStart(2, '0')} / 12</td>
                  <td className="px-6 py-3 font-sans text-slate-800 font-medium text-[11px]">15/{(3 + i).toString().padStart(2, '0')}/2024</td>
                  <td className="px-6 py-3 font-bold text-slate-800 text-xs">{infoPret.mensualite.toLocaleString()} F</td>
                  <td className="px-6 py-3 text-slate-600 text-[11px]">{infoPret.principal.toLocaleString()} F</td>
                  <td className="px-6 py-3 text-slate-600 text-[11px]">{infoPret.interets.toLocaleString()} F</td>
                  <td className="px-6 py-3 text-center">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-tight border border-emerald-100/50">
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                        Réglé
                      </span>
                    ) : isNext ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[9px] font-bold tracking-tight border border-blue-100/50 animate-pulse-subtle">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                        </span>
                        Échéance
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 text-[9px] font-bold tracking-tight border border-slate-200">
                        <LockClosedIcon className="w-3 h-3 opacity-100" />
                        Bloqué
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {isNext && (
                      <button 
                        onClick={() => { setMoisSelectionne(moisId); setStep(3); }}
                        className="bg-slate-800 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                      >
                        Procéder
                      </button>
                    )}
                   </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

 // --- ÉTAPE 3 : PAIEMENT UNIFIÉ & PREMIUM (version allégée) ---
const Step3Paiement = () => {
  const montantFinal = typeRemboursement === 'total' 
    ? infoPret.restant 
    : infoPret.mensualite;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Conteneur unique sans ombre, bordures renforcées */}
      <div className="bg-white rounded-3xl border border-slate-300 overflow-hidden flex flex-col md:flex-row">
        
        {/* COLONNE GAUCHE : CHOIX DU PAIEMENT */}
        <div className="flex-1 p-8 md:p-10 border-r border-slate-300">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheckIcon className="w-4 h-4" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Canal de règlement sécurisé</h3>
            </div>
            <p className="text-2xl font-light text-slate-900 leading-tight">
              Veuillez sélectionner<br /> votre <span className="font-semibold text-blue-600">moyen de paiement</span>
            </p>
          </header>

          <div className="space-y-3 max-w-md">
            {[
              { id: 'mtn', label: 'MTN Mobile Money', info: 'Bénin, Togo, Côte d\'Ivoire', iconColor: 'text-yellow-500' },
              { id: 'moov', label: 'Moov Money', info: 'Réseau Moov Africa', iconColor: 'text-blue-500' },
              { id: 'celtiis', label: 'Celtiis Cash', info: 'Réseau National SBIN', iconColor: 'text-red-500' },
              { id: 'card', label: 'Carte Bancaire', info: 'Visa, Mastercard, GIM-UEMOA', iconColor: 'text-slate-700' }
            ].map((m) => (
              <button 
                key={m.id} 
                onClick={() => setMoyenPaiement(m.id)}
                className={`w-full flex items-center p-4 rounded-2xl border transition-all ${
                  moyenPaiement === m.id 
                    ? 'border-blue-600 bg-blue-50/40' 
                    : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
              >
                <div className={`mr-4 ${moyenPaiement === m.id ? 'scale-105' : ''} transition-transform`}>
                  {m.id === 'card' ? (
                    <CreditCardIcon className={`w-7 h-7 ${m.iconColor}`} />
                  ) : (
                    <DevicePhoneMobileIcon className={`w-7 h-7 ${m.iconColor}`} />
                  )}
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-slate-800 text-sm">{m.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{m.info}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  moyenPaiement === m.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                }`}>
                  {moyenPaiement === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : RÉCAPITULATIF INTÉGRÉ */}
        <div className="w-full md:w-80 lg:w-96 bg-slate-50 p-8 md:p-10 flex flex-col justify-between border-l border-slate-300">
          <div>
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">Résumé détaillé</h3>
            
            <div className="space-y-5">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Objet</span>
                <p className="text-xs font-bold text-slate-800 text-right max-w-[180px]">
                  {typeRemboursement === 'total' ? 'Solder l\'intégralité du Prêt' : `Versement Échéance Mensuelle #${moisSelectionne}`}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Référence</span>
                <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">{infoPret.reference}</span>
              </div>

              <div className="space-y-2 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 text-xs">Sous-total</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{montantFinal?.toLocaleString()} F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-xs">Frais de traitement</span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase">0 F</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Net à payer</span>
                <div className="text-3xl font-light text-slate-900 mt-1">
                  {montantFinal?.toLocaleString()}
                  <span className="text-xs font-bold text-slate-400 ml-1">FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              disabled={!moyenPaiement}
              className={`w-full py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                moyenPaiement 
                  ? 'bg-slate-900 text-white hover:bg-blue-600' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Valider le versement
            </button>
            <p className="text-center text-[8px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest">
              En confirmant, vous acceptez les CGU Pebco.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
      
      {/* HEADER INSTITUTIONNEL (Même style que Remboursement) */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              Paiement sécurisé
            </span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Remboursement <span className="font-semibold text-blue-500">express</span>
            </h1>
            <p className="text-slate-400 max-w-md font-light text-sm">
              Réglez vos échéances en toute confiance, rapidement et sans frais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NAVIGATION INTERNE */}
      <nav className="bg-white border-b border-slate-300 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest">
              <ArrowLeftIcon className="w-4 h-4" /> Retour
            </button>
          )}
          <div className="h-4 w-[1px] bg-slate-500 mx-2" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Étape {step} sur 3
          </span>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <Step1Choix />}
            {step === 2 && <Step2Tableau />}
            {step === 3 && <Step3Paiement />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default RemboursementPage;


