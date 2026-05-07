import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function ContactPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      
      {/* HEADER INSTITUTIONNEL */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
    
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Disponibilité</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Parlons de votre <span className="font-semibold text-blue-500">Projet.</span>
            </h1>
            <p className="text-slate-400 max-w-md font-light text-sm">
              Nos conseillers sont à votre écoute pour vous accompagner dans vos ambitions financières.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULAIRE DE CONTACT (7 colonnes) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Envoyez un message</h2>
              <p className="text-slate-500 text-sm font-light">Nous vous répondrons sous un délai de 24 heures ouvrées.</p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom complet</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Jean Dupont" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="exemple@mail.com" 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Sujet</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none appearance-none">
                  <option>Demande de crédit</option>
                  <option>Information sur la carte P.E.B.Co</option>
                  <option>Partenariat</option>
                  <option>Autre demande</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Votre message</label>
                <textarea 
                  rows="5" 
                  placeholder="Comment pouvons-nous vous aider ?" 
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none resize-none"
                ></textarea>
              </div>

              <button type="submit" className="bg-blue-600 text-white w-full md:w-auto px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 transform active:scale-95">
                Envoyer le message
              </button>
            </form>
          </motion.div>

          {/* INFORMATIONS DE CONTACT (5 colonnes) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Coordonnées directes */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm"
            >
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8 border-b border-slate-50 pb-4">Nos Coordonnées</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Téléphone</p>
                    <p className="text-slate-900 font-bold">+229 97 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                    <p className="text-slate-900 font-bold">contact@pebcofinance.bj</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Siège Social</p>
                    <p className="text-slate-900 font-bold leading-relaxed">Cotonou, Bénin — Avenue Jean-Paul II, Immeuble Pebco</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Horaires d'ouverture */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <ClockIcon className="w-6 h-6 text-blue-500" />
                  <h3 className="text-sm font-black uppercase tracking-widest">Horaires d'accueil</h3>
                </div>
                <div className="space-y-4 text-sm font-light">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-slate-400">Lundi — Vendredi</span>
                    <span className="font-bold text-blue-400">08h — 17h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Samedi</span>
                    <span className="font-bold text-blue-400">09h — 13h</span>
                  </div>
                </div>
              </div>
              {/* Déco fond */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;