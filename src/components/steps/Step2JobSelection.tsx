'use client';

import { useState, useEffect } from 'react';
import { JobAnalysisResponse, jobAnalysisAPI, JobGenerateRequest, JobGenerateResponse, JobStoreRequest } from '@/app/api/config';
import toast from 'react-hot-toast';
import { FaCheck, FaEdit, FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Step2JobSelectionProps {
  analysisData?: JobAnalysisResponse | null;
  onValidationChange?: (isValid: boolean) => void;
}

interface JobSheet {
  id: string;
  titre: string;
  description: string;
  status: 'pending' | 'saved' | 'deleted';
}

// Modal d'édition de fiche
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

// Modal de confirmation d'action
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

export default function Step2JobSelection({ analysisData, onValidationChange }: Step2JobSelectionProps) {
  const [currentMiniStep, setCurrentMiniStep] = useState<1 | 2>(1);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobSheets, setJobSheets] = useState<JobSheet[]>([]);
  
  // Modals
  const [editModal, setEditModal] = useState<{ isOpen: boolean; jobSheet: JobSheet | null }>({
    isOpen: false,
    jobSheet: null
  });
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; jobSheet: JobSheet | null }>({
    isOpen: false,
    jobSheet: null
  });

  // Validation - dépend de l'étape courante
  const isValid = currentMiniStep === 1 
    ? selectedJobs.length > 0 
    : jobSheets.length > 0 && jobSheets.every(sheet => sheet.status !== 'pending');

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

  // Gérer la sélection des jobs
  const handleJobToggle = (jobTitle: string) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobTitle)) {
        return prev.filter(job => job !== jobTitle);
      } else {
        return [...prev, jobTitle];
      }
    });
  };

  // Générer les fiches de poste détaillées
  const handleGenerateSheets = async () => {
    if (!analysisData?.id_appel_candidature || selectedJobs.length === 0) {
      toast.error('Erreur: données manquantes pour la génération');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const generateRequest: JobGenerateRequest = {
        id_appel_candidature: analysisData.id_appel_candidature,
        job_positions: selectedJobs
      };

      console.log('🔄 Génération des fiches en cours...', generateRequest);
      
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
      setCurrentMiniStep(2);
      
      toast.success(`✅ ${sheets.length} fiche(s) de poste générée(s) !`, {
        duration: 4000,
        position: 'top-right',
      });

    } catch (err) {
      console.error('❌ Erreur lors de la génération des fiches:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la génération des fiches de poste';
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

  // Retourner à la sélection des jobs
  const handleBackToSelection = () => {
    setCurrentMiniStep(1);
    setJobSheets([]);
    setError(null);
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

  // Étape 2.2: Gestion des fiches générées
  if (currentMiniStep === 2 && jobSheets.length > 0) {
    const visibleSheets = jobSheets.filter(sheet => sheet.status !== 'deleted');
    const pendingSheets = visibleSheets.filter(sheet => sheet.status === 'pending');
    const savedSheets = visibleSheets.filter(sheet => sheet.status === 'saved');
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleBackToSelection}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Retour à la sélection"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-900">
              📋 Gestion des Fiches de Poste
            </h3>
          </div>
          
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
              Vous pouvez maintenant passer à l'étape de matching des profils.
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
  }

  // Étape 2.1: Sélection des job positions
  return (
    <div className="space-y-8">
      {/* Header avec informations de l'analyse */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-3 flex items-center">
            🎯 Sélection des Postes
          </h3>
          <p className="text-white/90 text-lg mb-4">
            Notre IA a identifié <span className="font-bold text-yellow-200">{analysisData.result.job_positions.length} postes</span> dans votre appel d'offres.
            <br />
            Sélectionnez ceux pour lesquels vous souhaitez générer des fiches détaillées.
          </p>
          
          {/* Statistiques */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-200">
                {selectedJobs.length}
              </div>
              <div className="text-sm text-white/80">Sélectionnés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-200">
                {analysisData.result.job_positions.length}
              </div>
              <div className="text-sm text-white/80">Total disponible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sélection des job positions */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          Choisissez les postes à traiter :
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysisData.result.job_positions.map((jobTitle, index) => (
            <div
              key={jobTitle}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 animate-fadeIn ${
                selectedJobs.includes(jobTitle)
                  ? 'border-amber-400 bg-amber-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleJobToggle(jobTitle)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedJobs.includes(jobTitle)
                    ? 'border-amber-400 bg-amber-400'
                    : 'border-gray-300'
                }`}>
                  {selectedJobs.includes(jobTitle) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium ${
                  selectedJobs.includes(jobTitle)
                    ? 'text-amber-800'
                    : 'text-gray-700'
                }`}>
                  {jobTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions de sélection rapide */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedJobs([...analysisData.result.job_positions])}
          className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium"
        >
          ✅ Tout sélectionner
        </button>
        <button
          onClick={() => setSelectedJobs([])}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          ❌ Tout désélectionner
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">❌ Erreur de génération</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Résumé et bouton de génération */}
      {selectedJobs.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{selectedJobs.length}</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-800">
                  {selectedJobs.length} poste{selectedJobs.length > 1 ? 's' : ''} sélectionné{selectedJobs.length > 1 ? 's' : ''}
                </h4>
                <p className="text-amber-700">
                  Prêt à générer les fiches de poste détaillées
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateSheets}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                !isLoading
                  ? 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Génération...</span>
                </div>
              ) : (
                'Générer les Fiches'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 