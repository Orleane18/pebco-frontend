import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans antialiased">
      
      {/* BANNIÈRE PAGE CONTACT - plus haute et texte plus marqué */}
      <section className="relative py-32 md:py-40 overflow-hidden border-0 shadow-none">
        <div className="absolute inset-0" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/40" /> {/* assombrissement accru */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.3em] mb-4 block">Disponibilité</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Parlons de votre <span className="font-bold text-blue-400">Projet.</span>
            </h1>
            <p className="text-slate-200 max-w-md font-light text-base">
              Nos conseillers sont à votre écoute pour vous accompagner dans vos ambitions financières.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto" style={{ display: 'block' }}>
            <path fill="#F8FAFC" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULAIRE DE CONTACT - design renforcé */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-slate-300 p-8 md:p-10"
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Envoyez un message</h2>
              <p className="text-slate-600 text-sm">Nous vous répondrons sous 24h ouvrées.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Nom complet</label>
                  <input 
                    type="text" 
                    placeholder="Jean Dupont" 
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none font-medium" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="exemple@mail.com" 
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none font-medium" 
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Sujet</label>
                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none appearance-none font-medium">
                  <option>Demande de crédit</option>
                  <option>Information sur la carte P.E.B.Co</option>
                  <option>Partenariat</option>
                  <option>Autre demande</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Votre message</label>
                <textarea 
                  rows="5" 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all outline-none resize-none font-medium"
                />
              </div>

              <button type="submit" className="bg-blue-600 text-white w-full md:w-auto px-8 py-3.5 rounded-xl font-extrabold uppercase tracking-wider text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95">
                Envoyer le message
              </button>
            </form>
          </motion.div>

          {/* INFORMATIONS DE CONTACT - plus percutantes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Coordonnées directes */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-7 border-2 border-slate-200 shadow-md"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 mb-6 border-b-2 border-slate-100 pb-4">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Téléphone</p>
                    <p className="text-slate-800 font-bold text-base">+229 97 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                    <EnvelopeIcon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Email</p>
                    <p className="text-slate-800 font-bold text-base">contact@pebcofinance.bj</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Siège social</p>
                    <p className="text-slate-800 font-semibold text-sm leading-relaxed">Cotonou, Bénin — Avenue Jean-Paul II, Immeuble Pebco</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Horaires d'ouverture - version plus marquée */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-slate-800 rounded-2xl p-7 text-white relative overflow-hidden shadow-lg border border-slate-700"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <ClockIcon className="w-6 h-6 text-blue-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Horaires d'accueil</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex justify-between items-center border-b border-white/15 pb-3">
                    <span className="text-slate-200 font-medium">Lundi — Vendredi</span>
                    <span className="font-bold text-blue-400">08h — 17h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200 font-medium">Samedi</span>
                    <span className="font-bold text-blue-400">09h — 13h</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-12 -mt-12" />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;