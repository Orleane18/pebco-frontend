// src/pages/SimulateurPage.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalculatorIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function AmortissementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const offre = location.state?.offre;

  // Valeurs par défaut issues de l'offre ou valeurs par défaut
  const [montant, setMontant] = useState(offre?.montantMin || 100000);
  const [taux, setTaux] = useState(() => {
    if (offre?.taux) return parseFloat(offre.taux.replace(',', '.'));
    return 5.5;
  });
  const [duree, setDuree] = useState(() => {
    if (offre?.duree) {
      const match = offre.duree.match(/(\d+)/);
      return match ? parseInt(match[0], 10) : 12;
    }
    return 12;
  });
  const [montantMin, setMontantMin] = useState(offre?.montantMin || 50000);
  const [montantMax, setMontantMax] = useState(offre?.montantMax || 10000000);
  const [amortissement, setAmortissement] = useState(null);

  // Extraire les montants min/max depuis la chaîne de l'offre
  useEffect(() => {
    if (offre) {
      const extractNumber = (str) => parseInt(str.replace(/[^\d]/g, ''), 10);
      if (offre.montant) {
        const parts = offre.montant.split('à');
        if (parts.length >= 2) {
          setMontantMin(extractNumber(parts[0]));
          setMontantMax(extractNumber(parts[1]));
          setMontant(extractNumber(parts[0])); // initial au min
        }
      }
      if (offre.taux) {
        const tauxNum = parseFloat(offre.taux.replace(',', '.'));
        setTaux(tauxNum);
      }
      if (offre.duree) {
        const match = offre.duree.match(/(\d+)/);
        if (match) setDuree(parseInt(match[0], 10));
      }
    }
  }, [offre]);

  const calculerAmortissement = () => {
    if (montant < montantMin || montant > montantMax) {
      alert(`Le montant doit être compris entre ${montantMin.toLocaleString()} et ${montantMax.toLocaleString()} FCFA`);
      return;
    }
    const tauxMensuel = taux / 100 / 12;
    const mensualite = montant * (tauxMensuel * Math.pow(1 + tauxMensuel, duree)) / (Math.pow(1 + tauxMensuel, duree) - 1);
    let reste = montant;
    const tableau = [];

    for (let i = 1; i <= duree; i++) {
      const interets = reste * tauxMensuel;
      const capital = mensualite - interets;
      reste -= capital;
      tableau.push({
        echeance: i,
        capitalRembourse: capital,
        interets: interets,
        mensualite: mensualite,
        resteDu: reste > 0 ? reste : 0
      });
    }

    setAmortissement({
      mensualite: mensualite,
      totalInterets: tableau.reduce((sum, row) => sum + row.interets, 0),
      totalRembourse: montant + tableau.reduce((sum, row) => sum + row.interets, 0),
      tableau: tableau
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Retour
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Simulateur de crédit & tableau d’amortissement</h1>
        <p className="text-center text-gray-600 mb-8">Calculez vos mensualités et visualisez le détail de votre remboursement.</p>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant (FCFA) - de {montantMin.toLocaleString()} à {montantMax.toLocaleString()}
              </label>
              <input
                type="number"
                value={montant}
                onChange={(e) => setMontant(Number(e.target.value))}
                min={montantMin}
                max={montantMax}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taux annuel (%)</label>
              <input
                type="number"
                step="0.1"
                value={taux}
                onChange={(e) => setTaux(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée (mois)</label>
              <input
                type="number"
                value={duree}
                onChange={(e) => setDuree(Number(e.target.value))}
                min="1"
                max="120"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={calculerAmortissement}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full inline-flex items-center gap-2 transition shadow"
            >
              <CalculatorIcon className="w-5 h-5" /> Calculer
            </button>
          </div>
        </div>

        {amortissement && (
          <>
            <div className="bg-blue-50 rounded-xl p-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-600 text-sm">Mensualité</p>
                <p className="text-2xl font-bold text-blue-600">{amortissement.mensualite.toFixed(0)} FCFA</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total des intérêts</p>
                <p className="text-2xl font-bold text-orange-600">{amortissement.totalInterets.toFixed(0)} FCFA</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Coût total du crédit</p>
                <p className="text-2xl font-bold text-green-600">{amortissement.totalRembourse.toFixed(0)} FCFA</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Échéance</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensualité (FCFA)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capital remboursé</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intérêts</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capital restant dû</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {amortissement.tableau.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{row.echeance}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{row.mensualite.toFixed(0)}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{row.capitalRembourse.toFixed(0)}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{row.interets.toFixed(0)}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{row.resteDu.toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AmortissementPage;