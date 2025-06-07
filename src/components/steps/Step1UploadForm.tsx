'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/upload/FileUpload';
import { jobAnalysisAPI, JobAnalysisResponse } from '@/app/api/config';
import { FaRegEdit, FaArrowLeft } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

interface Step1UploadFormProps {
  onAnalysisComplete?: (data: JobAnalysisResponse) => void;
  onNextStep?: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function Step1UploadForm({ onAnalysisComplete, onNextStep, onValidationChange }: Step1UploadFormProps) {
  const [currentMiniStep, setCurrentMiniStep] = useState<1 | 2>(1);
  const [uploadMode, setUploadMode] = useState<'file' | 'text' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  // Validation des données
  const isDataValid = (uploadMode === 'file' && selectedFile) || 
                      (uploadMode === 'text' && textContent.trim().length > 0);

  // Informer le parent de l'état de validation
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(analysisCompleted);
    }
  }, [analysisCompleted, onValidationChange]);

  // Gérer le choix du mode d'upload
  const handleModeSelection = (mode: 'file' | 'text') => {
    setUploadMode(mode);
    setCurrentMiniStep(2);
    setError(null);
    setAnalysisCompleted(false);
  };

  // Retourner à l'étape de sélection du mode
  const handleBackToModeSelection = () => {
    setCurrentMiniStep(1);
    setUploadMode(null);
    setSelectedFile(null);
    setTextContent('');
    setError(null);
    setAnalysisCompleted(false);
  };

  // Gérer la soumission et l'analyse
  const handleSubmitAnalysis = async () => {
    if (!isDataValid || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      let analysisResult: JobAnalysisResponse;

      if (uploadMode === 'file' && selectedFile) {
        console.log('🔄 Analyse du fichier PDF en cours...', selectedFile.name);
        analysisResult = await jobAnalysisAPI.analyzeFromFile(selectedFile);
      } else if (uploadMode === 'text' && textContent.trim()) {
        console.log('🔄 Analyse du texte en cours...', textContent.substring(0, 100) + '...');
        analysisResult = await jobAnalysisAPI.analyzeFromText(textContent.trim());
      } else {
        throw new Error('Aucune donnée valide à analyser');
      }

      console.log('✅ Analyse terminée avec succès:', analysisResult);
      
      // Marquer l'analyse comme terminée
      setAnalysisCompleted(true);
      
      // Callback avec les données d'analyse
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }

    } catch (err) {
      console.error('❌ Erreur lors de l\'analyse:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'analyse de l\'appel d\'offres';
      setError(errorMessage);
      setAnalysisCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher le message de succès si l'analyse est terminée
  if (analysisCompleted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Analyse terminée avec succès !
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Votre appel d'offres a été analysé et les fiches de poste ont été générées.
        </p>
        <p className="text-amber-600 font-medium">
          Cliquez sur "Suivant" pour continuer vers la sélection des fiches de poste.
        </p>
      </div>
    );
  }

  // Étape 1.1: Sélection du mode
  if (currentMiniStep === 1) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Comment souhaitez-vous fournir l'appel d'offres ?
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Choisissez la méthode qui vous convient le mieux pour analyser votre appel d'offres
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => handleModeSelection('file')}
            className="flex-1 p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <FaFilePdf className="text-3xl text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Fichier PDF</h4>
              <p className="text-gray-600">
                Glissez-déposez ou sélectionnez votre fichier PDF d'appel d'offres
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleModeSelection('text')}
            className="flex-1 p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <FaRegEdit className="text-3xl text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Saisie Texte</h4>
              <p className="text-gray-600">
                Copiez et collez directement le contenu de votre appel d'offres
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Étape 1.2: Upload ou saisie
  return (
    <div className="space-y-6">
      {/* Header avec possibilité de retour */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleBackToModeSelection}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Retour au choix du mode"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {uploadMode === 'file' ? 'Upload du fichier PDF' : 'Saisie du texte'}
            </h3>
            <p className="text-gray-600">
              {uploadMode === 'file' 
                ? 'Téléchargez votre appel d\'offres (PDF uniquement)'
                : 'Copiez et collez le contenu de votre appel d\'offres'
              }
            </p>
          </div>
        </div>

        {/* Indicateur du mode sélectionné */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          {uploadMode === 'file' ? (
            <>
              <FaFilePdf className="text-amber-600" />
              <span className="text-amber-800 font-medium">Fichier PDF</span>
            </>
          ) : (
            <>
              <FaRegEdit className="text-amber-600" />
              <span className="text-amber-800 font-medium">Saisie Texte</span>
            </>
          )}
        </div>
      </div>

      {/* Affichage conditionnel du contenu */}
      {uploadMode === 'file' && (
        <div>
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            acceptedTypes={['.pdf']}
            maxSize={25}
          />
        </div>
      )}

      {uploadMode === 'text' && (
        <div>
          <label htmlFor="textContent" className="block text-md font-medium text-gray-700 mb-3">
            Contenu de l'appel d'offres
          </label>
          <textarea
            id="textContent"
            rows={12}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Copiez et collez le contenu de votre appel d'offres ici..."
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
          />
          <p className="mt-2 text-sm text-gray-500">
            Caractères saisis: {textContent.length}
          </p>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">❌ Erreur d'analyse</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Indicateur de validation et bouton d'analyse */}
      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isDataValid ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className={`text-sm font-medium ${isDataValid ? 'text-green-600' : 'text-gray-500'}`}>
            {isDataValid ? 'Prêt pour l\'analyse' : 'Veuillez fournir des données à analyser'}
          </span>
        </div>

        <button
          onClick={handleSubmitAnalysis}
          disabled={!isDataValid || isLoading}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
            isDataValid && !isLoading
              ? 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyse en cours...</span>
            </div>
          ) : (
            'Lancer l\'Analyse'
          )}
        </button>
      </div>
    </div>
  );
} 