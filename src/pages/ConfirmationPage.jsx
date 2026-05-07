// ConfirmationPage.jsx - Version améliorée
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  UserIcon,
  CreditCardIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

function ConfirmationPage() {
  const location = useLocation();
  const { demande, offre } = location.state || {};

  if (!demande || !offre) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <p className="text-gray-600 mb-4">Information manquante.</p>
          <Link to="/" className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700">
            Retour aux offres
          </Link>
        </div>
      </div>
    );
  }

  // Générer un numéro de dossier aléatoire pour la simulation
  const dossierNumber = `PEB-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`;

  // Fonctions utilitaires (simulation d'impression/téléchargement)
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simuler un téléchargement de récapitulatif (à implémenter avec génération PDF)
    alert('Fonctionnalité à venir : téléchargement du récapitulatif en PDF');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Carte de succès principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* En-tête vert de succès */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-5 text-white text-center">
  <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-3">
    <CheckCircleIcon className="h-8 w-8 text-white" />
  </div>
  <h1 className="text-2xl font-bold">Demande envoyée avec succès !</h1>
  <p className="text-green-100 mt-1 text-sm">Votre dossier a bien été enregistré</p>
  <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 text-xs">
    N° dossier : {dossierNumber}
  </div>
</div>
          {/* Corps de la confirmation */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Message personnalisé */}
            <div className="text-center border-b border-gray-100 pb-4">
              <p className="text-gray-700 text-lg">
                Merci <strong>{demande.prenom} {demande.nom}</strong>,
              </p>
              <p className="text-gray-600">
                Votre demande pour <strong className="text-cyan-600">{offre.titre}</strong> a été reçue avec succès.
              </p>
            </div>

            {/* Grille récapitulative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coordonnées client */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <UserIcon className="h-5 w-5 text-cyan-600" />
                  Coordonnées
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Nom complet :</span> {demande.prenom} {demande.nom}</li>
                  <li><span className="font-medium">Âge :</span> {demande.age} ans</li>
                  <li><span className="font-medium">Téléphone :</span> {demande.telephone}</li>
                  <li><span className="font-medium">Email :</span> {demande.email}</li>
                  <li><span className="font-medium">Adresse :</span> {demande.adresse}</li>
                </ul>
              </div>

              {/* Informations professionnelles et revenus */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <BriefcaseIcon className="h-5 w-5 text-cyan-600" />
                  Situation pro.
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Profession :</span> {demande.profession || 'Non renseignée'}</li>
                  <li><span className="font-medium">Employeur :</span> {demande.employeur || '-'}</li>
                  <li><span className="font-medium">Revenu mensuel :</span> {demande.revenuMensuel ? `${parseInt(demande.revenuMensuel).toLocaleString()} FCFA` : '-'}</li>
                  <li><span className="font-medium">Charges mensuelles :</span> {demande.chargesMensuelles ? `${parseInt(demande.chargesMensuelles).toLocaleString()} FCFA` : '-'}</li>
                </ul>
              </div>

              {/* Détails du crédit */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <CreditCardIcon className="h-5 w-5 text-cyan-600" />
                  Crédit demandé
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Offre :</span> {offre.titre} ({offre.taux})</li>
                  <li><span className="font-medium">Montant demandé :</span> {parseInt(demande.montantDemande).toLocaleString()} FCFA</li>
                  <li><span className="font-medium">Durée souhaitée :</span> {demande.dureeDemande || offre.duree}</li>
                  <li><span className="font-medium">Motif :</span> {demande.motifCredit}</li>
                </ul>
              </div>

              {/* Garanties et modalités */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                  Garanties & modalités
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><span className="font-medium">Type de garantie :</span> {demande.typeGarantie || 'Aucune'}</li>
                  {demande.nomGarant && (
                    <li><span className="font-medium">Garant :</span> {demande.nomGarant} ({demande.telephoneGarant})</li>
                  )}
                  <li><span className="font-medium">Mobile Money :</span> {demande.numeroMobileMoney || 'Non renseigné'}</li>
                  <li><span className="font-medium">Conditions acceptées :</span> Oui</li>
                </ul>
              </div>
            </div>

            {/* Message de suivi */}
            <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-100">
              <p className="text-cyan-800 text-sm">
                📞 Un conseiller <strong>Pebco Bethesda</strong> vous contactera sous <strong>48h</strong> au <strong>{demande.telephone}</strong> pour finaliser votre dossier.
              </p>
              <p className="text-cyan-700 text-xs mt-1">
                Veuillez préparer les originaux des pièces fournies pour l’entretien.
              </p>
            </div>

            {/* Actions : impression, téléchargement, retour */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                <PrinterIcon className="h-5 w-5" />
                Imprimer
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Télécharger récapitulatif
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>

        {/* Petit rappel de l'offre (footer) */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Pebco Bethesda – Microfinance – Votre confiance, notre engagement.</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;