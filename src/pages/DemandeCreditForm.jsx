// DemandeCreditForm.jsx - Version microfinance enrichie (corrigée)
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { showToast } from '../components/ToastNotification';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CalendarIcon, 
  IdentificationIcon, 
  DocumentArrowUpIcon,
  CheckCircleIcon,
  CreditCardIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

function DemandeCreditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const offre = location.state?.offre;

  // Redirection uniquement dans useEffect si besoin
  useEffect(() => {
    // Si vous voulez vraiment rediriger si l'offre est absente, faites-le ici
    // if (!offre) {
    //   navigate('/');
    // }
  }, [offre, navigate]);

  // Extraction correcte des montants min et max (supprime tout ce qui n'est pas chiffre)
  const extractNumber = (str) => {
    const match = str.replace(/[^\d]/g, '');
    return parseInt(match, 10);
  };
  const montantMin = extractNumber(offre.montant.split('à')[0]);
  const montantMax = extractNumber(offre.montant.split('à')[1]);

  const [formData, setFormData] = useState({
    // Personnelles
    nom: '',
    prenom: '',
    age: '',
    adresse: '',
    email: '',
    telephone: '',
    pieceIdentite: null,
    // Professionnelles
    profession: '',
    employeur: '',
    revenuMensuel: '',
    chargesMensuelles: '',
    // Détails crédit
    montantDemande: montantMax,
    dureeDemande: offre.duree,
    motifCredit: '',
    // Garanties
    typeGarantie: '',
    nomGarant: '',
    telephoneGarant: '',
    numeroMobileMoney: '',
    // Documents supplémentaires
    justificatifRevenu: null,
    // Acceptation
    acceptConditions: false,
  });

  const [previewId, setPreviewId] = useState(null);
  const [previewJustificatif, setPreviewJustificatif] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('application/pdf')) {
        alert('Format non supporté. Veuillez sélectionner une image ou un PDF.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier ne doit pas dépasser 5 Mo');
        return;
      }
      setFormData(prev => ({ ...prev, [field]: file }));
      const url = URL.createObjectURL(file);
      if (field === 'pieceIdentite') setPreviewId(url);
      if (field === 'justificatifRevenu') setPreviewJustificatif(url);
    }
  };

  const validateForm = () => {
    const { nom, prenom, age, adresse, email, telephone, pieceIdentite,
            profession, revenuMensuel, montantDemande, motifCredit, acceptConditions } = formData;
    if (!nom.trim()) return "Nom requis";
    if (!prenom.trim()) return "Prénom requis";
    if (!age || age < 18 || age > 100) return "Âge invalide (18-100)";
    if (!adresse.trim()) return "Adresse requise";
    if (!email.match(/^\S+@\S+\.\S+$/)) return "Email invalide";
    if (!telephone.match(/^[0-9]{8,15}$/)) return "Téléphone invalide (8 à 15 chiffres)";
    if (!pieceIdentite) return "Veuillez fournir une pièce d'identité";
    if (!profession) return "Profession requise";
    if (!revenuMensuel || revenuMensuel <= 0) return "Revenu mensuel valide requis";
    if (!montantDemande || montantDemande < montantMin || montantDemande > montantMax) 
      return `Montant demandé invalide (doit être entre ${montantMin.toLocaleString()} et ${montantMax.toLocaleString()} FCFA)`;
    if (!motifCredit.trim()) return "Motif du crédit requis";
    if (!acceptConditions) return "Vous devez accepter les conditions de vérification";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = new FormData();
      // Ajout de tous les champs
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && typeof formData[key] !== 'boolean') {
          payload.append(key, formData[key]);
        } else if (typeof formData[key] === 'boolean') {
          payload.append(key, formData[key] ? '1' : '0');
        }
      });
      payload.append('offreTitre', offre.titre);

      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Données envoyées:', Object.fromEntries(payload));
      setSubmitStatus('success');

      setTimeout(() => {
        navigate('/confirmation', { state: { demande: formData, offre } });
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const getColorClasses = () => {
    switch(offre.couleur) {
      case 'cyan': return 'from-cyan-500 to-cyan-700';
      case 'green': return 'from-green-500 to-green-700';
      case 'gray': return 'from-gray-500 to-gray-700';
      case 'amber': return 'from-amber-500 to-amber-700';
      default: return 'from-cyan-500 to-cyan-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Carte récapitulative de l'offre */}
        <div className={`bg-gradient-to-r ${getColorClasses()} rounded-xl shadow-md p-3 mb-4 text-white`}>
  <div className="flex items-center justify-between flex-wrap gap-2">
    <div className="flex items-center gap-2">
      <CreditCardIcon className="h-6 w-6 drop-shadow" />
      <div>
        <h1 className="text-lg font-bold">{offre.titre}</h1>
        <p className="text-white/80 text-xs">{offre.description}</p>
      </div>
    </div>
    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-right">
      <p className="text-base font-bold">{offre.taux}</p>
      <p className="text-[10px] text-white/80">TAEG</p>
    </div>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-2 text-xs border-t border-white/20 pt-2">
    <div><span className="font-semibold">Durée :</span> {offre.duree}</div>
    <div><span className="font-semibold">Montant :</span> {offre.montant}</div>
    <div><span className="font-semibold">Conditions :</span> {offre.conditions}</div>
  </div>
</div>

        {/* Formulaire principal */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2ml overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <IdentificationIcon className="h-6 w-6 text-cyan-600" />
              Demande de crédit - Formulaire complet
            </h2>
            <p className="text-gray-500 text-sm mt-1">Tous les champs marqués d'un * sont obligatoires</p>
          </div>

          <div className="p-6 space-y-8">
            {/* 1. Informations personnelles */}
            <section className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-cyan-600" />
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Dupont" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) *</label>
                  <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Jean" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Âge *</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="100" className="w-full rounded-lg border p-3" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="612345678" className="w-full rounded-lg border p-3" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète *</label>
                  <textarea name="adresse" rows="2" value={formData.adresse} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Quartier, rue, ville" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="exemple@domaine.com" required />
                </div>
              </div>
            </section>

            {/* 2. Situation professionnelle et revenus */}
            <section className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-cyan-600" />
                Situation professionnelle & revenus
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                  <select name="profession" value={formData.profession} onChange={handleChange} className="w-full rounded-lg border p-3" required>
                    <option value="">Sélectionnez</option>
                    <option>Salarié</option>
                    <option>Commerçant</option>
                    <option>Artisan</option>
                    <option>Agriculteur</option>
                    <option>Éleveur</option>
                    <option>Fonctionnaire</option>
                    <option>Étudiant</option>
                    <option>Sans emploi</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'employeur / activité</label>
                  <input type="text" name="employeur" value={formData.employeur} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Entreprise, programme, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revenu mensuel (FCFA) *</label>
                  <input type="number" name="revenuMensuel" value={formData.revenuMensuel} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Ex: 250000" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Charges mensuelles (FCFA)</label>
                  <input type="number" name="chargesMensuelles" value={formData.chargesMensuelles} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Loyer, autres crédits" />
                </div>
              </div>
            </section>

            {/* 3. Détails du crédit souhaité */}
            <section className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="h-5 w-5 text-cyan-600" />
                Détails du crédit souhaité
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant demandé (FCFA) *</label>
                  <input 
                    type="number" 
                    name="montantDemande" 
                    value={formData.montantDemande} 
                    onChange={handleChange} 
                    min={montantMin} 
                    max={montantMax} 
                    className="w-full rounded-lg border p-3" 
                    required 
                  />
                  <p className="text-xs text-gray-400 mt-1">Min {montantMin.toLocaleString()} - Max {montantMax.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée souhaitée *</label>
                  <select name="dureeDemande" value={formData.dureeDemande} onChange={handleChange} className="w-full rounded-lg border p-3">
                    <option>3 à 12 mois</option>
                    <option>12 à 24 mois</option>
                    <option>24 à 36 mois</option>
                    <option>36 à 48 mois</option>
                    <option>48 à 60 mois</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motif détaillé du crédit *</label>
                  <textarea name="motifCredit" rows="2" value={formData.motifCredit} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Achat d'équipement, fonds de roulement, construction, santé, études..." required />
                </div>
              </div>
            </section>

            {/* 4. Garanties et modalités */}
            <section className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                Garanties & modalités
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de garantie</label>
                  <select name="typeGarantie" value={formData.typeGarantie} onChange={handleChange} className="w-full rounded-lg border p-3">
                    <option value="">Aucune</option>
                    <option>Caution solidaire</option>
                    <option>Gage sur matériel</option>
                    <option>Titre foncier</option>
                    <option>Véhicule</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du garant (si caution)</label>
                  <input type="text" name="nomGarant" value={formData.nomGarant} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Nom et prénom du garant" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone du garant</label>
                  <input type="tel" name="telephoneGarant" value={formData.telephoneGarant} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="Numéro" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <DevicePhoneMobileIcon className="h-4 w-4" />
                    Numéro Mobile Money (Orange/MTN)
                  </label>
                  <input type="tel" name="numeroMobileMoney" value={formData.numeroMobileMoney} onChange={handleChange} className="w-full rounded-lg border p-3" placeholder="657890123" />
                  <p className="text-xs text-gray-400">Pour décaissement et remboursement</p>
                </div>
              </div>
            </section>

            {/* 5. Documents à fournir */}
            <section className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-cyan-600" />
                Documents à fournir
              </h3>
              <div className="space-y-6">
                {/* Pièce d'identité */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pièce d'identité (photo ou scan) *</label>
                  <input type="file" accept="image/*,application/pdf" onChange={handleFileChange('pieceIdentite')} className="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" required />
                  {previewId && <img src={previewId} alt="Pièce" className="h-24 mt-2 mx-auto rounded" />}
                </div>
                {/* Justificatif de revenus */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Justificatif de revenus (3 dernières payes, relevé bancaire, attestation) *</label>
                  <input type="file" accept="image/*,application/pdf" onChange={handleFileChange('justificatifRevenu')} className="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-50 file:text-cyan-700" required />
                  {previewJustificatif && <img src={previewJustificatif} alt="Justificatif" className="h-24 mt-2 mx-auto rounded" />}
                </div>
              </div>
            </section>

            {/* 6. Acceptation des conditions */}
            <section>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="acceptConditions" checked={formData.acceptConditions} onChange={handleChange} className="mt-1 h-5 w-5 text-cyan-600 rounded" required />
                <span className="text-sm text-gray-700">
                  J’atteste sur l’honneur l’exactitude des informations fournies et j’accepte que l’agence <strong>Pebco Bethesda</strong> procède à la vérification de mon dossier. *
                </span>
              </label>
            </section>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <CheckBadgeIcon className="h-5 w-5" />
                    Soumettre ma demande de crédit
                  </>
                )}
              </button>
              {submitStatus === 'success' && (
                <p className="mt-4 text-green-600 text-sm text-center bg-green-50 rounded-lg p-2">✓ Demande envoyée ! Redirection...</p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-4 text-red-600 text-sm text-center bg-red-50 rounded-lg p-2">Erreur, veuillez réessayer.</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DemandeCreditForm;