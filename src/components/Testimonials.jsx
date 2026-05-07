import { StarIcon } from '@heroicons/react/24/solid';

function Testimonials() {
  const avis = [
    { 
      nom: 'Marie D.', 
      role: 'Artisane', 
      texte: 'L’obtention de mon financement s’est déroulée avec une célérité remarquable. Le professionnalisme des équipes a été déterminant dans la réussite de mon projet.', 
      note: 5, 
      photo: 'https://randomuser.me/api/portraits/women/68.jpg' 
    },
    { 
      nom: 'Jean-Paul L.', 
      role: 'Agriculteur', 
      texte: 'Au-delà des taux très compétitifs, c’est l’accompagnement humain et la compréhension des cycles agricoles qui font la différence.', 
      note: 4, 
      photo: 'https://randomuser.me/api/portraits/men/32.jpg' 
    },
    { 
      nom: 'Aïssatou K.', 
      role: 'Commerçante', 
      texte: 'Une expertise rare et un conseil stratégique précieux. Bethesda ne se contente pas de prêter, ils soutiennent réellement la croissance locale.', 
      note: 5, 
      photo: 'https://randomuser.me/api/portraits/women/45.jpg' 
    },
  ];

  return (
    <section className="py-10 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* EN-TÊTE ÉDITORIAL */}
        <div className="mb-20 text-center">
          <h2 className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-4">
            Voix de nos partenaires
          </h2>
          <p className="font-serif text-3xl md:text-4xl text-slate-900 italic">
            « La confiance est le socle de chaque projet. »
          </p>
        </div>

        {/* GRILLE DE TÉMOIGNAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {avis.map((a, i) => (
            <div key={i} className="group">
              
              {/* NOTATION SUBTILE */}
              <div className="flex gap-1 mb-6 opacity-100 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, starIndex) => (
                  <StarIcon 
                    key={starIndex} 
                    className={`w-3 h-3 ${starIndex < a.note ? 'text-slate-900' : 'text-slate-400'}`} 
                  />
                ))}
              </div>

              {/* TEXTE (Style Citation de Presse) */}
              <blockquote className="mb-8">
                <p className="font-serif text-lg leading-[1.7] text-slate-900 italic border-l-2 border-slate-900 pl-6 group-hover:border-slate-900 transition-colors duration-500">
                  "{a.texte}"
                </p>
              </blockquote>

              {/* SIGNATURE */}
              <div className="flex items-center gap-4 pl-6">
                <img 
                  className="w-10 h-10 rounded-full transition-all duration-700 object-cover border border-slate-100" 
                  src={a.photo} 
                  alt={a.nom} 
                />
                <div className="font-sans">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                    {a.nom}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {a.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;