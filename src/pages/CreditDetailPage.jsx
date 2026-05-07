import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const creditDetails = {
  individuel: {
    title: "Crédit Individuel",
    definition: "Une solution de financement flexible pour vos besoins personnels et micro-projets, basée sur votre capacité financière propre sans caution de groupe.",
    themeColor: "text-blue-800",
    themeBg: "bg-blue-100",
    advantages: ["100 000 à 3 000 000 FCFA", "6 à 36 mois", "Taux dès 5,5% TAEG", "Sous 24h"],
    conditions: ["Pièce d'identité valide", "3 derniers bulletins de salaire", "Justificatif de domicile", "18 - 65 ans"],
    steps: [
      { t: "Instruction", d: "Vérification de la conformité des pièces." },
      { t: "Analyse", d: "Évaluation de la capacité de remboursement." },
      { t: "Décaissement", d: "Signature et transfert des fonds." }
    ]
  },
  mutuel: {
    title: "Crédit Mutuel",
    definition: "Le crédit basé sur la solidarité. Idéal pour les entrepreneurs en groupement qui souhaitent se porter caution mutuellement pour leurs projets.",
    themeColor: "text-emerald-800",
    themeBg: "bg-emerald-100",
    advantages: ["50 000 à 1 500 000 FCFA", "3 à 24 mois", "Caution solidaire", "Accès simplifié"],
    conditions: ["Groupe de 3 à 5 membres", "Activité génératrice de revenus", "Identités certifiées", "Acte de cautionnement signé"],
    steps: [
      { t: "Constitution", d: "Formation du groupe et engagement mutuel." },
      { t: "Audit", d: "Entretien collectif avec un conseiller." },
      { t: "Mise à disposition", d: "Fonds disponibles sous 48h." }
    ]
  },
  immobilier: {
    title: "Crédit Immobilier",
    definition: "Accédez à la propriété ou rénovez votre habitat avec un accompagnement longue durée adapté à l'envergure de vos projets de construction.",
    themeColor: "text-indigo-800",
    themeBg: "bg-indigo-100",
    advantages: ["Jusqu'à 10 000 000 FCFA", "Durée jusqu'à 60 mois", "Taux à 4,8% TAEG", "Période de différé"],
    conditions: ["Apport personnel de 15%", "Titre foncier ou promesse de vente", "Devis des travaux", "Revenus domiciliés"],
    steps: [
      { t: "Expertise", d: "Évaluation technique du bien." },
      { t: "Offre", d: "Émission de l'offre de prêt (7 jours)." },
      { t: "Notaire", d: "Signature de l'acte authentique." }
    ]
  },
  agricole: {
    title: "Crédit Agricole",
    definition: "Financement spécialisé pour le monde rural, aligné sur les cycles de récolte pour permettre l'achat d'intrants et de matériel.",
    themeColor: "text-amber-800",
    themeBg: "bg-amber-100",
    advantages: ["Cycle de récolte adapté", "Jusqu'à 5 000 000 FCFA", "Taux fixe 5%", "Assurance récolte incluse"],
    conditions: ["Exploitation agricole active", "Plan de campagne", "Localisation certifiée", "Affiliation groupement (option)"],
    steps: [
      { t: "Diagnostic", d: "Visite terrain par un expert." },
      { t: "Validation", d: "Approbation technique sous 72h." },
      { t: "Suivi", d: "Décaissement selon les étapes de culture." }
    ]
  }
};

function CreditDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    const creditId = location.state?.creditId || 'individuel';
    setCredit(creditDetails[creditId]);
    window.scrollTo(0, 0);
  }, [location]);

  if (!credit) return null;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-serif text-slate-900 selection:bg-slate-100">
      
      {/* NAVIGATION MINIMALE - Taille réduite */}
      
        <div className="max-w-2xl px-6 h-12 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-900 hover:text-slate-900 transition-colors tracking-tighter text-[10px] uppercase font-sans font-bold"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform stroke-[3px]" />
            Retour
          </button>
        </div>
      

      {/* ARTICLE - max-w réduit pour une lecture plus dense */}
      <article className="pt-16 max-w-2xl mx-auto px-6">
        
        {/* EN-TÊTE - Échelle diminuée */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="h-[1px] w-8 bg-slate-900"></span>
             <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
               Note de service
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight text-slate-900">
            {credit.title}
          </h1>
          <p className="text-lg text-slate-500 italic font-light leading-relaxed">
            {credit.subtitle}
          </p>
        </header>

        {/* INTRODUCTION - Lettrine plus petite */}
        <section className="mb-16">
          <p className="text-lg text-slate-800 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left">
            {credit.definition}
          </p>
        </section>

        {/* CONTENU TECHNIQUE - Grille resserrée */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
          <div>
            <h2 className="font-sans text-[10px] font-black uppercase tracking-widest mb-6 text-slate-600">
              01. Conditions financières
            </h2>
            <ul className="space-y-4">
              {credit.advantages.map((adv, idx) => (
                <li key={idx} className="text-base font-bold text-slate-800 border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-bold">-</span> {adv}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[10px] font-black uppercase tracking-widest mb-6 text-slate-600">
              02. Conformité
            </h2>
            <ul className="space-y-3">
              {credit.conditions.map((cond, idx) => (
                <li key={idx} className="text-sm text-slate-700 leading-tight flex items-start gap-2">
                  <span className="text-slate-400 font-bold">•</span> {cond}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROTOCOLE - Style mémorandum compact */}
        <section className="mb-16 bg-slate-50/50 p-8 rounded border-l-2 border-slate-900">
          <h2 className="font-sans text-[10px] font-black uppercase tracking-widest mb-8 text-slate-600">
            03. Processus d'octroi
          </h2>
          <div className="space-y-8">
            {credit.steps.map((step, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute left-0 top-0 font-sans text-[10px] font-black text-slate-500">
                  {idx + 1}.
                </span>
                <h4 className="text-lg font-bold mb-1 text-slate-900">{step.t}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIONS FINALES - Boutons plus fins */}
        <footer className="mt-20 pt-12 border-t border-slate-100 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button 
              onClick={() => navigate('/offres')}
              className="flex-1 bg-slate-900 text-white font-sans text-[10px] font-black uppercase tracking-widest py-4 px-6 hover:bg-slate-700 transition-all"
            >
              Postuler
            </button>
            <button 
              onClick={() => navigate('/amortissement')}
              className="flex-1 border border-slate-200 text-slate-900 font-sans text-[10px] font-black uppercase tracking-widest py-4 px-6 hover:bg-slate-50 transition-all"
            >
              Simulateur
            </button>
          </div>
          <p className="mt-8 text-[9px] text-slate-400 font-sans uppercase tracking-tighter">
            Bethesda — Direction du Crédit
          </p>
        </footer>

      </article>
    </div>
  );
}

export default CreditDetailPage;