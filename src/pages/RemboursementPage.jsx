import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon, DevicePhoneMobileIcon, CheckCircleIcon,
  BanknotesIcon, CalendarDaysIcon, ArrowRightIcon,
  ShieldCheckIcon, ArrowLeftIcon, LockClosedIcon
} from '@heroicons/react/24/outline';

// Icônes SVG inline pour le fond de l'étape 1 — positionnement individuel
const icons = [
  // Carte de crédit
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>,
  // Téléphone
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>,
  // Banque
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"/></svg>,
  // Wallet
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 13a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/><path d="M16 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2"/></svg>,
  // QR Code
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/><path d="M14 14h2v2h-2zM18 14h3M18 18h3M14 18v3"/></svg>,
  // Cadenas
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>,
  // Transfert
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>,
  // Reçu
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2v20l3-2 2 2 3-2 3 2 2-2 3 2V2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg>,
  // Bouclier
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L4 7v5c0 5 3.5 9.74 8 11 4.5-1.26 8-6 8-11V7l-8-4z"/><polyline points="9,12 11,14 15,10"/></svg>,
  // Pièce
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v1m0 8v1M9.5 9.5A2.5 2.5 0 0112 8a2.5 2.5 0 010 5 2.5 2.5 0 010 4 2.5 2.5 0 01-2.5-1.5"/></svg>,
  // Graphe
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>,
  // Calendrier
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  // Barcode
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9V5a2 2 0 012-2h2M3 15v4a2 2 0 002 2h2M15 3h4a2 2 0 012 2v4M15 21h4a2 2 0 002-2v-4M7 8v8M10 8v8M13 8v8M16 8v8"/></svg>,
  // Paiement NFC
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/><path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M6.34 6.34a8 8 0 000 11.32M17.66 6.34a8 8 0 010 11.32"/></svg>,
  // Euro
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 8a7 7 0 100 8M3 10h9M3 14h9"/></svg>,
];

// Positions fixes, tailles et rotations uniques pour chaque icône
const iconProps = [
  { top: '6%',  left: '3%',   size: 38, rotate: -12, opacity: 0.17 },
  { top: '2%',  left: '18%',  size: 28, rotate:  20, opacity: 0.13 },
  { top: '8%',  left: '32%',  size: 44, rotate:  -6, opacity: 0.15 },
  { top: '3%',  left: '48%',  size: 32, rotate:  15, opacity: 0.14 },
  { top: '5%',  left: '63%',  size: 50, rotate: -20, opacity: 0.11 },
  { top: '2%',  left: '78%',  size: 30, rotate:   8, opacity: 0.16 },
  { top: '7%',  left: '91%',  size: 40, rotate: -30, opacity: 0.13 },
  { top: '22%', left: '1%',   size: 46, rotate:  18, opacity: 0.14 },
  { top: '25%', left: '13%',  size: 34, rotate: -10, opacity: 0.17 },
  { top: '20%', left: '27%',  size: 28, rotate:  25, opacity: 0.11 },
  { top: '28%', left: '41%',  size: 52, rotate:  -8, opacity: 0.11 },
  { top: '22%', left: '57%',  size: 36, rotate:  12, opacity: 0.15 },
  { top: '18%', left: '70%',  size: 44, rotate: -22, opacity: 0.13 },
  { top: '26%', left: '85%',  size: 30, rotate:   5, opacity: 0.17 },
  { top: '40%', left: '6%',   size: 32, rotate: -15, opacity: 0.16 },
  { top: '44%', left: '20%',  size: 48, rotate:  10, opacity: 0.11 },
  { top: '38%', left: '35%',  size: 28, rotate: -28, opacity: 0.14 },
  { top: '42%', left: '52%',  size: 42, rotate:  18, opacity: 0.13 },
  { top: '36%', left: '66%',  size: 34, rotate:  -5, opacity: 0.16 },
  { top: '45%', left: '80%',  size: 50, rotate:  22, opacity: 0.11 },
  { top: '40%', left: '94%',  size: 28, rotate: -12, opacity: 0.14 },
  { top: '58%', left: '2%',   size: 44, rotate:  30, opacity: 0.13 },
  { top: '60%', left: '16%',  size: 32, rotate: -18, opacity: 0.16 },
  { top: '55%', left: '30%',  size: 52, rotate:   8, opacity: 0.11 },
  { top: '62%', left: '45%',  size: 36, rotate: -25, opacity: 0.14 },
  { top: '57%', left: '60%',  size: 28, rotate:  14, opacity: 0.17 },
  { top: '63%', left: '74%',  size: 46, rotate:  -8, opacity: 0.11 },
  { top: '59%', left: '88%',  size: 34, rotate:  20, opacity: 0.15 },
  { top: '76%', left: '5%',   size: 30, rotate: -20, opacity: 0.14 },
  { top: '78%', left: '22%',  size: 48, rotate:  12, opacity: 0.11 },
  { top: '74%', left: '38%',  size: 36, rotate:  -6, opacity: 0.16 },
  { top: '80%', left: '54%',  size: 28, rotate:  28, opacity: 0.13 },
  { top: '75%', left: '68%',  size: 44, rotate: -15, opacity: 0.14 },
  { top: '82%', left: '83%',  size: 32, rotate:   5, opacity: 0.17 },
  { top: '77%', left: '96%',  size: 40, rotate: -24, opacity: 0.11 },
];

const BgPayIcons = () => (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
  >
    {iconProps.map((p, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: p.top,
          left: p.left,
          width: p.size,
          height: p.size,
          color: '#0f172a',
          opacity: p.opacity,
          transform: `rotate(${p.rotate}deg)`,
        }}
      >
        {icons[i % icons.length]}
      </div>
    ))}
  </div>
);

function RemboursementPage() {
  const [step, setStep] = useState(1);
  const [typeRemboursement, setTypeRemboursement] = useState(null);
  const [moisSelectionne, setMoisSelectionne] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState(null);

  const infoPret = {
    reference: "PRÉT-FINTECH-88291-B",
    totalInitial: 300000,
    restant: 150000,
    mensualite: 25000,
    principal: 22000,
    interets: 3000,
    dureeTotale: 12,
    tranchesPayees: [1, 2, 3, 4, 5, 6]
  };

  // --- ÉTAPE 1 ---
  const Step1Choix = () => (
    <div style={{ position: 'relative', overflow: 'hidden' }} className="min-h-[420px]">
      <BgPayIcons />
      <div className="relative z-10 max-w-3xl mx-auto py-12 px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light text-slate-900 tracking-tight">
            Comment souhaitez-vous <span className="font-semibold">rembourser ?</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            Sélectionnez l'option qui convient à votre trésorerie actuelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: 'total',
              title: 'Remboursement intégral',
              desc: 'Solder la totalité du capital restant en un seul versement.',
              icon: <BanknotesIcon className="w-5 h-5" />,
              iconBg: 'bg-slate-900',
              action: () => { setTypeRemboursement('total'); setStep(3); }
            },
            {
              id: 'tranche',
              title: 'Paiement par tranche',
              desc: 'Régler uniquement la prochaine mensualité de votre échéancier.',
              icon: <CalendarDaysIcon className="w-5 h-5" />,
              iconBg: 'bg-blue-600',
              action: () => { setTypeRemboursement('tranche'); setStep(2); }
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="group text-left p-7 bg-white border-2 border-slate-200 rounded-[1.75rem] hover:border-slate-400 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 relative overflow-hidden"
            >
              <div className={`w-10 h-10 ${item.iconBg} rounded-2xl flex items-center justify-center mb-7 shadow`}>
                <div className="text-white">{item.icon}</div>
              </div>
              <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[.18em] mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-7 font-medium">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-slate-400 group-hover:text-slate-700 transition-colors">
                Sélectionner <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // --- ÉTAPE 2 ---
  const Step2Tableau = () => (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto bg-white border border-slate-300 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-300 bg-slate-50 flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Tableau d'amortissement détaillé</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Référence : <span className="font-mono text-slate-700">{infoPret.reference}</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Taux d'intérêt</p>
              <p className="text-base font-bold text-slate-800">4,5% <span className="text-[9px] font-normal text-slate-500">(Fixe)</span></p>
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
              <tr className="border-b border-slate-200 bg-slate-50/60">
                {['N°','Date','Versement','Capital','Intérêts','Statut','Action'].map(h => (
                  <th key={h} className={`px-6 py-3 text-[8px] font-black text-slate-500 uppercase tracking-wider ${h==='Statut'?'text-center':''} ${h==='Action'?'text-right':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {Array.from({ length: infoPret.dureeTotale }).map((_, i) => {
                const moisId = i + 1;
                const isPaid = infoPret.tranchesPayees.includes(moisId);
                const isNext = moisId === infoPret.tranchesPayees.length + 1;
                const month = (2 + moisId).toString().padStart(2, '0');

                return (
                  <tr key={moisId} className={isNext ? 'bg-blue-50/40' : 'hover:bg-slate-50/60 transition-colors'}>
                    <td className="px-6 py-3 font-mono text-[11px]">{moisId.toString().padStart(2,'0')} / 12</td>
                    <td className="px-6 py-3 font-semibold text-slate-800 text-[11px]">15/{month}/2024</td>
                    <td className="px-6 py-3 font-bold text-slate-900 text-xs">{infoPret.mensualite.toLocaleString()} F</td>
                    <td className="px-6 py-3 text-slate-500 text-[11px]">{infoPret.principal.toLocaleString()} F</td>
                    <td className="px-6 py-3 text-slate-500 text-[11px]">{infoPret.interets.toLocaleString()} F</td>
                    <td className="px-6 py-3 text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[8px] font-bold tracking-tight border border-emerald-100">
                          <CheckCircleIcon className="w-3 h-3" /> Réglé
                        </span>
                      ) : isNext ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[8px] font-bold tracking-tight border border-blue-100">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                          </span>
                          Échéance
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 text-[8px] font-bold tracking-tight border border-slate-200">
                          <LockClosedIcon className="w-3 h-3" /> Bloqué
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {isNext && (
                        <button
                          onClick={() => { setMoisSelectionne(moisId); setStep(3); }}
                          className="bg-slate-900 hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
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

  // --- ÉTAPE 3 ---
  const Step3Paiement = () => {
    const montantFinal = typeRemboursement === 'total' ? infoPret.restant : infoPret.mensualite;

    return (
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col md:flex-row shadow-sm">

          {/* GAUCHE */}
          <div className="flex-1 p-8 md:p-10">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[.3em] text-slate-500">
                  Canal de règlement sécurisé
                </span>
              </div>
              <h3 className="text-2xl font-light text-slate-900 leading-snug tracking-tight">
                Sélectionnez votre<br />
                <span className="font-semibold text-blue-600">moyen de paiement</span>
              </h3>
            </header>

            <div className="space-y-3 max-w-md">
              {[
                { id: 'mtn',     label: 'MTN Mobile Money', info: "Bénin, Togo, Côte d'Ivoire", color: 'text-yellow-500' },
                { id: 'moov',    label: 'Moov Money',        info: 'Réseau Moov Africa',          color: 'text-blue-500' },
                { id: 'celtiis', label: 'Celtiis Cash',      info: 'Réseau National SBIN',         color: 'text-red-500' },
                { id: 'card',    label: 'Carte Bancaire',    info: 'Visa, Mastercard, GIM-UEMOA',  color: 'text-slate-700' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMoyenPaiement(m.id)}
                  className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all text-left ${
                    moyenPaiement === m.id
                      ? 'border-blue-600 bg-blue-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="mr-4">
                    {m.id === 'card'
                      ? <CreditCardIcon className={`w-7 h-7 ${m.color}`} />
                      : <DevicePhoneMobileIcon className={`w-7 h-7 ${m.color}`} />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{m.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{m.info}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    moyenPaiement === m.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {moyenPaiement === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DROITE */}
          <div className="w-full md:w-80 lg:w-96 bg-slate-50 p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200">
            <div>
              <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-[.2em] mb-6">
                Résumé détaillé
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider flex-shrink-0">Objet</span>
                  <p className="text-xs font-bold text-slate-800 text-right">
                    {typeRemboursement === 'total'
                      ? "Solde intégral du prêt"
                      : `Versement mensuel #${moisSelectionne}`}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Référence</span>
                  <span className="font-mono text-[10px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                    {infoPret.reference}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Sous-total</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {montantFinal?.toLocaleString()} F
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Frais de traitement</span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wide">0 F</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-wider">Net à payer</span>
                  <div className="text-3xl font-light text-slate-900 mt-1.5 tracking-tight">
                    {montantFinal?.toLocaleString()}
                    <span className="text-xs font-bold text-slate-400 ml-1.5">FCFA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                disabled={!moyenPaiement}
                className={`w-full py-3.5 rounded-xl font-black uppercase text-[9px] tracking-[.22em] transition-all ${
                  moyenPaiement
                    ? 'bg-slate-900 text-white hover:bg-blue-600 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Valider le versement
              </button>
              <p className="text-center text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
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

      {/* BANNIÈRE PAGE REMBOURSEMENT */}
<section className="relative py-32 md:py-40 overflow-hidden">
  <div className="absolute inset-0" style={{ backgroundImage: `url('/images/photo48.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Paiement sécurisé</span>
      <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
        Remboursez <span className="font-semibold text-blue-400">en toute simplicité</span>
      </h1>
      <p className="text-slate-300 max-w-md font-light text-sm">
        Gérez vos échéances en ligne, par mobile money ou dans nos agences. Flexible et sans frais cachés.
      </p>
    </motion.div>
  </div>
  <div className="absolute bottom-0 left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto" style={{ display: 'block' }}>
      <path fill="#F8FAFC" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </div>
</section>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Retour
            </button>
          )}
          {step > 1 && <div className="h-4 w-[1px] bg-slate-300" />}
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Étape {step} sur 3
          </span>
        </div>
      </nav>

      {/* CONTENU */}
      <main className="pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
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