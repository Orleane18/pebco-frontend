// src/components/PageLayout.jsx
import { Link } from 'react-router-dom';

function PageLayout({ 
  title,           // grand titre dans la bannière (ex: "Offres")
  breadcrumb,      // tableau [{ name, path? }]
  backgroundImage, // chemin ou URL de l'image de fond pour la bannière
  children 
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Bannière avec image de fond */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage || '/images/default-banner.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay sombre */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <nav className="text-sm text-white/80 mb-2">
            {breadcrumb.map((item, idx) => (
              <span key={idx}>
                {item.path ? (
                  <Link to={item.path} className="hover:text-white">{item.name}</Link>
                ) : (
                  <span className="text-white">{item.name}</span>
                )}
                {idx < breadcrumb.length - 1 && <span className="mx-2">›</span>}
              </span>
            ))}
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default PageLayout;