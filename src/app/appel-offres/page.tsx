'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import MultiStepForm from '@/components/forms/MultiStepForm';
import { Step1UploadForm, Step2JobSelection, Step3MatchingForm } from '@/components/steps';
import { JobAnalysisResponse } from '@/app/api/config';

export default function AppelOffresPage() {
  const [analysisData, setAnalysisData] = useState<JobAnalysisResponse | null>(null);
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);

  // Gérer la fin de l'analyse et passer à l'étape suivante
  const handleAnalysisComplete = (data: JobAnalysisResponse) => {
    console.log('📊 Données d\'analyse reçues:', data);
    setAnalysisData(data);
  };

  // Gérer le changement de validation de l'étape 1
  const handleStep1ValidationChange = (isValid: boolean) => {
    setStep1Valid(isValid);
  };

  // Gérer le changement de validation de l'étape 2
  const handleStep2ValidationChange = (isValid: boolean) => {
    setStep2Valid(isValid);
  };

  const steps = [
    {
      id: 'upload',
      title: 'Analyse de l\'Appel d\'Offres',
      description: 'Téléchargez votre appel d\'offres ou saisissez le contenu pour l\'analyser',
      component: (
        <Step1UploadForm 
          onAnalysisComplete={handleAnalysisComplete}
          onValidationChange={handleStep1ValidationChange}
        />
      ),
      isValid: step1Valid
    },
    {
      id: 'selection',
      title: 'Sélection des Fiches de Poste',
      description: 'Choisissez les fiches de poste générées que vous souhaitez traiter',
      component: (
        <Step2JobSelection 
          analysisData={analysisData}
          onValidationChange={handleStep2ValidationChange}
        />
      ),
      isValid: step2Valid
    },
    {
      id: 'matching',
      title: 'Matching des Profils',
      description: 'Trouvez les meilleurs profils correspondant aux fiches sélectionnées',
      component: <Step3MatchingForm analysisData={analysisData} />,
      isValid: true
    }
  ];

  const handleComplete = (formData: any) => {
    console.log('Données du formulaire:', formData);
    console.log('Données d\'analyse:', analysisData);
    alert('Traitement terminé ! Redirection vers les résultats...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion d'Appels d'Offres
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformez vos appels d'offres en fiches de poste optimisées et trouvez 
            automatiquement les meilleurs profils de votre base de données
          </p>
        </div>

        {/* Affichage des informations d'analyse si disponibles */}
        {analysisData && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Analyse terminée avec succès
            </h3>
            <div className="text-sm text-green-700">
              <p><strong>ID Appel d'offres:</strong> {analysisData.id_appel_candidature}</p>
              <p><strong>Nombre de postes détectés:</strong> {analysisData.result.job_positions.length}</p>
              <p><strong>Commentaires IA:</strong> {analysisData.result.commentaires}</p>
              <p><strong>Statut:</strong> {analysisData.result.error ? '❌ Erreur' : '✅ Succès'}</p>
            </div>
          </div>
        )}

        <MultiStepForm
          steps={steps}
          onComplete={handleComplete}
          className="py-8"
        />
      </div>

      {/* Toaster pour les notifications */}
      <Toaster />
    </div>
  );
} 