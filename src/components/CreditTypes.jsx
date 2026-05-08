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
  },
];

function CreditTypes() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-[#fcfcfd] overflow-hidden">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 0px)', backgroundSize: '32px 32px' }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-[8px] font-bold tracking-[0.25em] uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
              Expertises Bancaires
            </span>
            <h2 className="text-4xl md:text-5xl font-extralight text-slate-900 leading-[1.1] mb-8">
              Des solutions de crédit <br />
              <span className="font-semibold text-blue-600">sur-mesure pour vous.</span>
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 rounded-full" />
          </motion.div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {credits.map((credit, i) => (
            <motion.div 
              key={credit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(`/credit/${credit.id}`, { state: { creditId: credit.id } })}
              className="group cursor-pointer relative bg-white border border-slate-100 rounded-3xl p-6 flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-52 mb-8 overflow-hidden rounded-2xl shadow-inner">
                <img 
                  src={credit.image} 
                  alt={credit.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                
                {/* Badge Category sur l'image */}
                <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-tighter text-slate-800 rounded-lg shadow-sm">
                    {credit.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`flex-shrink-0 p-2.5 rounded-xl ${credit.bgIcon} ${credit.color} ring-1 ring-inset ring-black/5`}>
                    <credit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-none">
                    {credit.title}
                  </h3>
                </div>

                <p className="text-slate-500 text-[14px] leading-relaxed font-normal mb-8 flex-grow">
                  {credit.description}
                </p>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                    Explorer l'offre
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CreditTypes;