// src/components/CreditTypes.jsx
import { useNavigate } from 'react-router-dom';
import { UserGroupIcon, HandRaisedIcon, HomeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const credits = [
  {
    id: 'individuel',
    title: 'Crédit Individuel',
    category: 'Particuliers',
    description: 'Solutions de financement pour vos projets personnels, santé et équipements domestiques.',
    icon: UserGroupIcon,
    color: 'text-blue-700',
    bgIcon: 'bg-blue-50',
    image: '/images/photo26.jpg',
    detailPath: '/credit/individuel'
  },
  {
    id: 'mutuel',
    title: 'Crédit Mutuel',
    category: 'Entrepreneuriat',
    description: 'Un levier financier garanti par un groupe solidaire pour propulser les micro-projets.',
    icon: HandRaisedIcon,
    color: 'text-slate-700',
    bgIcon: 'bg-slate-100',
    image: '/images/photo25.jpg',
    detailPath: '/credit/mutuel'
  },
  {
    id: 'immobilier',
    title: 'Crédit Immobilier',
    category: 'Patrimoine',
    description: 'Accompagnement sur mesure pour l’acquisition, la construction ou la rénovation de vos biens.',
    icon: HomeIcon,
    color: 'text-indigo-700',
    bgIcon: 'bg-indigo-50',
    image: '/images/photo22.jpg',
    detailPath: '/credit/immobilier'
  },
  {
    id: 'agricole',
    title: 'Crédit Agricole',
    category: 'Développement RURAL',
    description: 'Dispositifs spécifiques dédiés à l’optimisation et à la croissance des exploitations agricoles.',
    icon: ShieldCheckIcon,
    color: 'text-emerald-700',
    bgIcon: 'bg-emerald-50',
    image: '/images/photo24.jpg',
    detailPath: '/credit/agricole'
  }
];

function CreditTypes() {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 bg-slate-50 overflow-hidden">
      {/* --- ÉLÉMENTS DE DESIGN EN ARRIÈRE-PLAN --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* EN-TÊTE SECTION */}
        <div className="max-w-3xl mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
          >
            Nos expertises
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-tight mb-6"
          >
            Des solutions de crédit <br />
            <span className="font-semibold text-blue-600">adaptées à vos défis.</span>
          </motion.h2>
          <div className="w-20 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* GRILLE DE CARTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden">
          {credits.map((credit, i) => (
            <motion.div 
              key={credit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white p-8 flex flex-col h-full transition-colors duration-500 hover:bg-slate-50/50"
            >
              {/* Image avec Overlay */}
              <div className="relative h-48 mb-8 overflow-hidden rounded-xl">
                <img 
                  src={credit.image} 
                  alt={credit.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Contenu Texte */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {credit.category}
                </span>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${credit.bgIcon} ${credit.color}`}>
                    <credit.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                    {credit.title}
                  </h3>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-light mb-8 flex-grow">
                  {credit.description}
                </p>

                {/* Bouton Premium */}
                <button 
                  onClick={() => navigate(`/credit/${credit.id}`, { state: { creditId: credit.id } })}
                  className="group/btn relative inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 overflow-hidden"
                >
                  <span className="relative z-10">Consulter l'offre</span>
                  <span className="text-blue-600 transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-600 group-hover/btn:w-full transition-all duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CreditTypes;