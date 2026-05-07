import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

function ArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    // Redirige vers la liste des actualités (sans 's')
    navigate('/actualite');
    return null;
  }


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Bannière avec l'image de l'article */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${article.image}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <button
            onClick={() => navigate('/actualite')}
            className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition"
          >
            <ArrowLeftIcon className="w-5 h-5" /> Retour
          </button>
          <nav className="text-sm text-white/80">
            <a href="/" className="hover:text-white">Accueil</a>
            <span className="mx-2">›</span>
            <a href="/actualite" className="hover:text-white">Actualités</a>
            <span className="mx-2">›</span>
            <span className="text-white">{article.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">{article.title}</h1>
        </div>
      </div>

      {/* Contenu : image à gauche, texte à droite */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div>
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Texte structuré */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {article.author}</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{article.category}</span>
              <span>{article.readTime} de lecture</span>
            </div>
            {/* whitespace-pre-line préserve les sauts de ligne en paragraphes */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </div>

        {/* Bouton haut de page */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Haut de page ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;