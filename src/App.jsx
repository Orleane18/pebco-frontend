import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import HomePage from './pages/HomePage';
import OffresPage from './pages/OffresPage';
import SuiviPage from './pages/SuiviPage';
import RemboursementPage from './pages/RemboursementPage';
import ContactPage from './pages/ContactPage';
import DemandeCreditForm from './pages/DemandeCreditForm';   // <-- Ajout
import ConfirmationPage from './pages/ConfirmationPage';     // <-- Ajout
import FaqPage from './pages/FaqPage';
import ActualitePage from './pages/ActualitePage';
import AmortissementPage from './pages/AmortissementPage';
import CreditDetailPage from './pages/CreditDetailPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/offres" element={<OffresPage />} />
            <Route path="/suivi" element={<SuiviPage />} />
            <Route path="/remboursement" element={<RemboursementPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/demande" element={<DemandeCreditForm />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/actualite" element={<ActualitePage />} />
            <Route path="/amortissement" element={<AmortissementPage />} />
            <Route path="/credit/:type" element={<CreditDetailPage />} />
            <Route path="/actualite/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
        <Footer />
        <ToastNotification />
      </div>
    </BrowserRouter>
  );
}

export default App;