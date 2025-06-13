'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MultiStepForm from '@/components/forms/MultiStepForm';
import { Step1UploadForm } from '@/components/steps';
import { JobAnalysisResponse, jobAnalysisAPI, JobGenerateRequest, JobGenerateResponse, JobStoreRequest } from '@/app/api/config';
import toast from 'react-hot-toast';
import { FaCheck, FaEdit, FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Interface pour les fiches de poste
interface JobSheet {
  id: string;
  titre: string;
  description: string;
  status: 'pending' | 'saved' | 'deleted';
}

// Modal d'édition de fiche (même design que Step2JobSelection)
interface EditModalProps {
  isOpen: boolean;
  jobSheet: JobSheet | null;
  onClose: () => void;
  onSave: (updatedSheet: JobSheet) => void;
}

function EditModal({ isOpen, jobSheet, onClose, onSave }: EditModalProps) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (jobSheet) {
      setTitre(jobSheet.titre);
      setDescription(jobSheet.description);
    }
  }, [jobSheet]);

  const handleSave = () => {
    if (!jobSheet) return;
    
    const updatedSheet: JobSheet = {
      ...jobSheet,
      titre: titre.trim(),
      description: description.trim()
    };
    
    onSave(updatedSheet);
    onClose();
  };

  if (!isOpen || !jobSheet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop avec blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">✏️ Éditer la fiche de poste</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre du poste
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Entrez le titre du poste..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description complète
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Décrivez en détail les responsabilités, compétences requises, etc..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!titre.trim() || !description.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              titre.trim() && description.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal de confirmation d'action (même design que Step2JobSelection)
interface ActionModalProps {
  isOpen: boolean;
  jobSheet: JobSheet | null;
  onClose: () => void;
  onConfirm: (action: 'save' | 'delete') => void;
}

function ActionModal({ isOpen, jobSheet, onClose, onConfirm }: ActionModalProps) {
  if (!isOpen || !jobSheet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop avec blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤔</span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Que voulez-vous faire avec cette fiche ?
          </h3>
          
          <p className="text-gray-600 mb-6">
            <strong>{jobSheet.titre}</strong>
          </p>

          <div className="flex space-x-3">
            <button
              onClick={() => onConfirm('delete')}
              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium flex items-center justify-center space-x-2"
            >
              <IoClose className="text-lg" />
              <span>Supprimer</span>
            </button>
            
            <button
              onClick={() => onConfirm('save')}
              className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium flex items-center justify-center space-x-2"
            >
              <FaCheck className="text-lg" />
              <span>Sauvegarder</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-3 w-full px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors font-medium"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant Step2 Simplifié
const Step2SimplifiedSelection = ({ analysisData, onValidationChange }: { 
  analysisData: JobAnalysisResponse | null;
  onValidationChange: (isValid: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobSheets, setJobSheets] = useState<JobSheet[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Modals
  const [editModal, setEditModal] = useState<{ isOpen: boolean; jobSheet: JobSheet | null }>({
    isOpen: false,
    jobSheet: null
  });
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; jobSheet: JobSheet | null }>({
    isOpen: false,
    jobSheet: null
  });

  // Validation - toutes les fiches doivent être traitées
  const isValid = jobSheets.length > 0 && jobSheets.every(sheet => sheet.status !== 'pending');

  // Informer le parent de l'état de validation
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [isValid, onValidationChange]);

  // Afficher les commentaires IA dès le chargement
  useEffect(() => {
    if (analysisData?.result?.commentaires) {
      toast.success(analysisData.result.commentaires, {
        duration: 8000,
        position: 'top-right',
        style: {
          background: '#F0F9FF',
          color: '#1E40AF',
          border: '1px solid #3B82F6',
          maxWidth: '500px',
        },
        icon: '🤖',
      });
    }
  }, [analysisData]);

  // Génération automatique des fiches au chargement
  useEffect(() => {
    if (analysisData && !hasGenerated) {
      handleAutoGenerateSheets();
    }
  }, [analysisData, hasGenerated]);

  // Générer automatiquement toutes les fiches de poste
  const handleAutoGenerateSheets = async () => {
    if (!analysisData?.id_appel_candidature || !analysisData?.result?.job_positions || hasGenerated) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Sélectionner automatiquement TOUS les postes
      const allJobPositions = analysisData.result.job_positions;
      
      const generateRequest: JobGenerateRequest = {
        id_appel_candidature: analysisData.id_appel_candidature,
        job_positions: allJobPositions
      };

      console.log('🔄 Génération automatique des fiches en cours...', generateRequest);
      
      const result = await jobAnalysisAPI.generateJobSheets(generateRequest);
      
      console.log('✅ Fiches générées avec succès:', result);
      
      // Convertir les fiches en JobSheet avec statut pending
      const sheets: JobSheet[] = Object.entries(result.fiches).map(([titre, description], index) => ({
        id: `sheet-${index}-${Date.now()}`,
        titre,
        description,
        status: 'pending'
      }));
      
      setJobSheets(sheets);
      setHasGenerated(true);
      
      toast.success(`⚡ ${sheets.length} fiche(s) générée(s) automatiquement !`, {
        duration: 4000,
        position: 'top-right',
      });

    } catch (err) {
      console.error('❌ Erreur lors de la génération automatique des fiches:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la génération automatique des fiches de poste';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Ouvrir le modal d'édition
  const handleEditSheet = (sheet: JobSheet) => {
    setEditModal({ isOpen: true, jobSheet: sheet });
  };

  // Sauvegarder les modifications d'une fiche
  const handleSaveEdit = (updatedSheet: JobSheet) => {
    setJobSheets(prev => 
      prev.map(sheet => 
        sheet.id === updatedSheet.id ? updatedSheet : sheet
      )
    );
    toast.success('Fiche modifiée avec succès !');
  };

  // Ouvrir le modal d'action
  const handleActionSheet = (sheet: JobSheet) => {
    setActionModal({ isOpen: true, jobSheet: sheet });
  };

  // Confirmer une action (save/delete)
  const handleConfirmAction = async (action: 'save' | 'delete') => {
    const sheet = actionModal.jobSheet;
    if (!sheet || !analysisData?.id_appel_candidature) return;

    if (action === 'delete') {
      // Supprimer la fiche
      setJobSheets(prev => prev.filter(s => s.id !== sheet.id));
      toast.success('Fiche supprimée !');
    } else {
      // Sauvegarder la fiche
      try {
        const storeRequest: JobStoreRequest = {
          id_appel_candidature: analysisData.id_appel_candidature,
          fiche_poste: sheet.description
        };

        console.log('💾 Sauvegarde de la fiche...', storeRequest);
        
        await jobAnalysisAPI.storeJobSheet(storeRequest);
        
        // Mettre à jour le statut
        setJobSheets(prev => 
          prev.map(s => 
            s.id === sheet.id ? { ...s, status: 'saved' } : s
          )
        );
        
        toast.success('Fiche sauvegardée avec succès !');
        console.log('✅ Fiche sauvegardée');
        
      } catch (err) {
        console.error('❌ Erreur lors de la sauvegarde:', err);
        toast.error('Erreur lors de la sauvegarde');
      }
    }
    
    setActionModal({ isOpen: false, jobSheet: null });
  };

  // Si pas de données d'analyse
  if (!analysisData) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Aucune donnée d'analyse disponible
        </h3>
        <p className="text-gray-600">
          Veuillez d'abord compléter l'étape d'analyse de l'appel d'offres.
        </p>
      </div>
    );
  }

  // État de chargement initial
  if (isLoading && !hasGenerated) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ⚡ Génération automatique en cours...
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Traitement de {analysisData.result.job_positions.length} poste(s) détecté(s)
        </p>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">❌</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Erreur de génération
        </h3>
        <p className="text-red-600 text-lg mb-6">
          {error}
        </p>
        <button
          onClick={() => handleAutoGenerateSheets()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Affichage principal - Gestion des fiches générées
  const visibleSheets = jobSheets.filter(sheet => sheet.status !== 'deleted');
  const pendingSheets = visibleSheets.filter(sheet => sheet.status === 'pending');
  const savedSheets = visibleSheets.filter(sheet => sheet.status === 'saved');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ⚡ Gestion Simplifiée des Fiches de Poste
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Toutes les fiches ont été générées automatiquement. Modifiez et validez-les selon vos besoins.
        </p>
        
        {/* Statistiques */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingSheets.length}</div>
            <div className="text-sm text-gray-600">En attente</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{savedSheets.length}</div>
            <div className="text-sm text-gray-600">Sauvegardées</div>
          </div>
        </div>
      </div>

      {/* Grille des fiches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleSheets.map((sheet, index) => {
          const isSaved = sheet.status === 'saved';
          
          return (
            <div
              key={sheet.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 animate-fadeIn overflow-hidden ${
                isSaved 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 hover:border-amber-400 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge de statut */}
              {isSaved && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <FaCheck className="text-xs" />
                  <span>Sauvegardée</span>
                </div>
              )}

              <div className="p-6">
                {/* Titre avec aperçu */}
                <div className="mb-4">
                  <h4 className={`text-lg font-bold mb-2 ${isSaved ? 'text-green-800' : 'text-gray-900'}`}>
                    {sheet.titre}
                  </h4>
                  <p className={`text-sm leading-relaxed line-clamp-3 ${isSaved ? 'text-green-700' : 'text-gray-600'}`}>
                    {sheet.description.substring(0, 150)}
                    {sheet.description.length > 150 && '...'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEditSheet(sheet)}
                    disabled={isSaved}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isSaved
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <FaEdit className="text-sm" />
                    <span>Éditer</span>
                  </button>

                  {!isSaved && (
                    <button
                      onClick={() => handleActionSheet(sheet)}
                      className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all font-medium"
                    >
                      <FaCheck className="text-sm" />
                      <span>Valider</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message de progression */}
      {pendingSheets.length > 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⏳</span>
          </div>
          <h4 className="text-lg font-semibold text-amber-800 mb-2">
            {pendingSheets.length} fiche{pendingSheets.length > 1 ? 's' : ''} en attente
          </h4>
          <p className="text-amber-700">
            Veuillez valider ou supprimer toutes les fiches pour continuer vers l'étape suivante.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-2xl text-green-600" />
          </div>
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            🎉 Toutes les fiches ont été traitées !
          </h4>
          <p className="text-green-700">
            Vous pouvez maintenant passer à l'étape de matching automatique.
          </p>
        </div>
      )}

      {/* Modals */}
      <EditModal
        isOpen={editModal.isOpen}
        jobSheet={editModal.jobSheet}
        onClose={() => setEditModal({ isOpen: false, jobSheet: null })}
        onSave={handleSaveEdit}
      />

      <ActionModal
        isOpen={actionModal.isOpen}
        jobSheet={actionModal.jobSheet}
        onClose={() => setActionModal({ isOpen: false, jobSheet: null })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

const Step3SimplifiedMatching = ({ analysisData }: { 
  analysisData: JobAnalysisResponse | null;
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-3xl">🎯</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Matching Simplifié
      </h3>
      <p className="text-gray-600 text-lg mb-6">
        Cette étape sera développée prochainement pour la version simplifiée.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-yellow-800 text-sm">
          🚧 Étape en cours de développement
        </p>
      </div>
    </div>
  );
};

export default function AppelOffresSimplifiePage() {
  const [analysisData, setAnalysisData] = useState<JobAnalysisResponse | null>(null);
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(true); // Temporairement valid pour permettre la navigation

  // Gérer la fin de l'analyse et passer à l'étape suivante
  const handleAnalysisComplete = (data: JobAnalysisResponse) => {
    console.log('📊 Données d\'analyse reçues (version simplifiée):', data);
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
      title: 'Gestion Simplifiée',
      description: 'Modification et validation automatique des fiches de poste générées',
      component: (
        <Step2SimplifiedSelection 
          analysisData={analysisData}
          onValidationChange={handleStep2ValidationChange}
        />
      ),
      isValid: step2Valid
    },
    {
      id: 'matching',
      title: 'Matching Automatique',
      description: 'Recherche automatique des meilleurs profils correspondants',
      component: <Step3SimplifiedMatching analysisData={analysisData} />,
      isValid: step3Valid
    }
  ];

  const handleComplete = (formData: any) => {
    console.log('Données du formulaire (version simplifiée):', formData);
    console.log('Données d\'analyse:', analysisData);
    alert('Traitement simplifié terminé ! Redirection vers les résultats...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Appel d'Offres Simplifié
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Version simplifiée et automatisée de la gestion d'appels d'offres. 
            Processus accéléré avec moins d'interventions manuelles.
          </p>
          
          {/* Badge indiquant la version simplifiée */}
          <div className="inline-flex items-center mt-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span className="mr-2">⚡</span>
            Version Simplifiée - 3 étapes automatisées
          </div>
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

        {/* Note sur la version simplifiée */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <span className="mr-2">ℹ️</span>
              À propos de la version simplifiée
            </h4>
            <div className="text-blue-800 space-y-2">
              <p>• <strong>Étape 1:</strong> Analyse automatique de l'appel d'offres (identique à la version complète)</p>
              <p>• <strong>Étape 2:</strong> Génération et gestion automatiques de TOUTES les fiches de poste détectées</p>
              <p>• <strong>Étape 3:</strong> Matching automatique avec les meilleurs profils disponibles</p>
            </div>
            <p className="text-blue-600 text-sm mt-4">
              Cette version nécessite moins d'interventions manuelles et offre un processus plus rapide.
            </p>
          </div>
        </div>
      </div>

      {/* Toaster pour les notifications */}
      <Toaster />
    </div>
  );
}
