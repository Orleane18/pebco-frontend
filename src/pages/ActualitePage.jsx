import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon, 
  ClockIcon, 
  ChevronRightIcon,
  ArrowLongRightIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "Femmes et microfinance : une alliance puissante pour le progrès économique en Afrique",
    excerpt: "La microfinance transforme la vie des femmes en Afrique. Découvrez comment P.E.B.Co-BETHESDA contribue à cette dynamique.",
    content: `La microfinance a permis à des millions de femmes africaines de sortir de la pauvreté et de devenir des actrices économiques influentes. Grâce à l’accès aux services financiers, elles ont pu créer ou développer des petites entreprises, accéder à l’éducation, aux soins de santé et améliorer leur qualité de vie.

Le microcrédit au Bénin
Promu par l’ancien président Yayi Boni, le microcrédit a d’abord visé l’inclusion financière des femmes et des personnes défavorisées. Ce programme a évolué pour donner naissance au crédit Alafia, une initiative offrant des prêts à taux abordables, des formations en gestion et un accompagnement technique. Depuis son lancement, Alafia a permis à de nombreuses Béninoises de créer des activités durables et d’améliorer leurs conditions de vie.

Pourquoi la microfinance est‑elle importante pour les femmes ?
•Autonomie économique : elles deviennent financièrement indépendantes, renforçant leur estime de soi.
•Réduction de la pauvreté : des entreprises durables génèrent des revenus stables.
•Inclusion financière : accès à l’épargne, aux prêts et aux assurances.
•Renforcement des capacités : formations en entrepreneuriat et gestion.
•Impact communautaire : les femmes investissent dans l’éducation et la santé de leurs enfants, créant un cercle vertueux.

En soutenant la microfinance, l’Afrique renforce une alliance puissante pour un progrès économique durable.`,
    date: "26 Jan 2025",
    author: "P.E.B.Co-BETHESDA",
    readTime: "4 min",
    category: "Actualités",
    image: "/images/photo35.jpg"
  },
  {
    id: 2,
    title: "Impacts de P.E.B.Co-BETHESDA dans la vie de sa clientèle : témoignages de deux clientes",
    excerpt: "À l’occasion de la célébration des femmes, deux clientes exemplaires ont partagé leur parcours inspirant.",
    content: `Le vendredi 15 mars 2024, les départements du Littoral et de l’Atlantique étaient à l’honneur lors de la première édition de la célébration des femmes à P.E.B.Co-BETHESDA. L’événement, organisé dans le hall de l’institution, a réuni de nombreuses clientes venues des agences de ces régions.

Ces femmes fidèles et exemplaires – parmi les plus prolifiques et sans retard de remboursement – ont été distinguées pour leur confiance et leur relation solide avec l’institution. Chaque agence a récompensé trois clientes selon des critères précis : ancienneté, montant du crédit, nombre de crédits successifs, genre et ponctualité des remboursements.

La cérémonie a mis en lumière des parcours inspirants, illustrant comment P.E.B.Co-BETHESDA transforme des vies par l’accès au crédit.`,
    date: "27 Oct 2025",
    author: "P.E.B.Co-BETHESDA",
    readTime: "5 min",
    category: "Témoignages",
    image: "/images/photo39.png"
  },
  {
    id: 3,
    title: "Le discours mémorable du point focal égalité femme-homme pendant la célébration de la femme à P.E.B.Co-BETHESDA",
    excerpt: "Le 15 mars 2024 à Cotonou, un discours fort a marqué la célébration des femmes, appelant à plus d’égalité.",
    content: `Le 15 mars 2024 à Cotonou, P.E.B.Co-BETHESDA a célébré les femmes. Madame Christiane DOVONOU, point focal de l’égalité femme‑homme (EFH) grâce au programme ADAPAMI, a prononcé un discours marquant.

Après avoir salué les autorités et les invités, elle a rappelé que cette journée est l’occasion de lutter pour les droits des femmes, de réduire les inégalités et de valoriser la gent féminine. « L’heure n’est plus à la mendicité de nos droits, car la vraie liberté ne s’acquiert jamais sans lutte », a‑t‑elle déclaré.

Elle a interpellé ses sœurs : « Que faisons‑nous pour le développement de notre institution ? » Sur plus de 500 agents, 214 sont des femmes, mais seulement deux occupent des postes de chef de service et douze sont cheffes d’agence. Elle a demandé au Directeur Général de rétablir la parité.

Elle a aussi proposé l’institutionnalisation de cette célébration et la création d’une amicale des femmes, comme organe consultatif dans les instances de décision.

En réponse, le Directeur Général, M. HOUNSOU Cyrille, a donné son accord de principe : « Les femmes travailleuses, nos amazones, peuvent désormais avoir leur amicale. La Direction Générale s’engage à promouvoir davantage la femme dans les cercles de responsabilité. »`,
    date: "21 Oct 2025",
    author: "P.E.B.Co-BETHESDA",
    readTime: "3 min",
    category: "Événement",
    image: "/images/photo40.png"
  },
  {
    id: 4,
    title: "Lancement de la carte P.E.B.Co-BETHESDA",
    excerpt: "Une carte pour économiser au quotidien et soutenir les commerces locaux.",
    content: `La Carte P.E.B.Co-BETHESDA est votre alliée pour des économies au quotidien, tout en favorisant la croissance des commerces locaux. Grâce à cette carte, bénéficiez de réductions considérables sur l’alimentation, la mode, la santé, l’éducation, et bien plus.

En choisissant la carte P.E.B.Co-BETHESDA, vous soutenez une consommation responsable qui dynamise les petites entreprises. Les commerçants partenaires gagnent en visibilité et accèdent à des financements. Un partenariat gagnant‑gagnant, où chaque achat devient un acte de solidarité économique.`,
    date: "21 Oct 2025",
    author: "P.E.B.Co-BETHESDA",
    readTime: "3 min",
    category: "Événement",
    image: "/images/photo41.jpg"
  }
];

function ActualitePage() {
  const navigate = useNavigate();
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      
      {/* HEADER INSTITUTIONNEL (Même style que Remboursement) */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Média</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Actualités & <span className="font-semibold text-blue-500">Impact.</span>
            </h1>
            <p className="text-slate-400 max-w-md font-light text-sm">
              Suivez l'évolution de nos actions et l'impact de nos solutions sur le terrain.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        
        {/* ARTICLE À LA UNE (Format réduit) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col lg:flex-row mb-12"
          onClick={() => navigate(`/actualite/article/${featuredArticle.id}`, { state: { article: featuredArticle } })}
        >
          <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img src={featuredArticle.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                {featuredArticle.category}
              </span>
              <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{featuredArticle.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              {featuredArticle.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                 Lire l'article <ArrowLongRightIcon className="w-5 h-5 text-blue-500" />
               </span>
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{featuredArticle.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* GRILLE SECONDAIRE (Plus compacte) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingArticles.map((article, index) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer flex flex-col bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              onClick={() => navigate(`/actualite/article/${article.id}`, { state: { article } })}
            >
              <div className="relative h-48 mb-6 overflow-hidden rounded-[1.5rem]">
                <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter text-slate-900">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="px-2 pb-4 flex flex-col flex-grow">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{article.date}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-500 transition-colors">
                  Continuer <ChevronRightIcon className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActualitePage;