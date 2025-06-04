'use client';

import { useState } from 'react';
import MultiStepForm from '@/components/forms/MultiStepForm';
import FileUpload from '@/components/upload/FileUpload';
import JobCard, { JobPost } from '@/components/cards/JobCard';
import JobEditModal from '@/components/modals/JobEditModal';
import { mockJobPosts } from '@/utils/mockJobPosts';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
//icones
import { FaFileAlt, FaFile } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

// Étape 1: Upload de l'appel d'offres
function Step1UploadForm() {
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');

  const isValid = (uploadMode === 'file' && selectedFile) || 
                  (uploadMode === 'text' && textContent.trim().length > 0);

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Comment souhaitez-vous fournir l'appel d'offres ?
        </h3>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setUploadMode('file')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
              uploadMode === 'file'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaFilePdf className="mr-2" />
            <span>Upload Fichier PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setUploadMode('text')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
              uploadMode === 'text'
                ? 'bg-amber-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaRegEdit className="mr-2" />
            <span>Saisir le Texte</span>
          </button>
        </div>
      </div>

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-3">
            Téléchargez votre appel d'offres (PDF)
          </h4>
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            acceptedTypes={['.pdf']}
            maxSize={25}
          />
        </div>
      )}

      {/* Text Input Mode */}
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

      {/* Validation Indicator */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-gray-300'}`} />
        <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
          {isValid ? 'Prêt à continuer' : 'Veuillez fournir un fichier ou du texte'}
        </span>
      </div>
    </div>
  );
}

// Étape 2: Sélection des fiches de poste générées
function Step2JobSelection() {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(mockJobPosts);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterSkill, setFilterSkill] = useState<string>('');

  const handleJobSelect = (jobId: string) => {
    setSelectedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleJobEdit = (jobPost: JobPost) => {
    setEditingJob(jobPost);
    setIsModalOpen(true);
  };

  const handleJobSave = (updatedJobPost: JobPost) => {
    setJobPosts(prev => 
      prev.map(job => 
        job.id === updatedJobPost.id ? updatedJobPost : job
      )
    );
  };

  const selectAllJobs = () => {
    setSelectedJobs(new Set(jobPosts.map(job => job.id)));
  };

  const deselectAllJobs = () => {
    setSelectedJobs(new Set());
  };

  // Filtrer les jobs par compétence
  const filteredJobs = filterSkill 
    ? jobPosts.filter(job => 
        job.skills.some(skill => 
          skill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      )
    : jobPosts;

  // Obtenir toutes les compétences uniques
  const allSkills = Array.from(new Set(
    jobPosts.flatMap(job => job.skills)
  )).sort();

  return (
    <div className="space-y-8">
      {/* Header amélioré avec statistiques et animations */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold mb-3 flex items-center">
                🚀 Fiches de Poste Générées
              </h3>
              <p className="text-white/90 text-lg">
                Notre IA a analysé votre appel d'offres et extrait{' '}
                <span className="font-bold text-yellow-200">{jobPosts.length} fiches de poste</span>.
                <br />
                Sélectionnez celles que vous souhaitez traiter pour la suite.
              </p>
            </div>
            
            {/* Statistiques animées */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-200 animate-pulse">
                  {selectedJobs.size}
                </div>
                <div className="text-sm text-white/80">Sélectionnées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-200">
                  {jobPosts.length}
                </div>
                <div className="text-sm text-white/80">Total</div>
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progression de sélection</span>
              <span className="text-sm font-medium">{Math.round((selectedJobs.size / jobPosts.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-yellow-300 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(selectedJobs.size / jobPosts.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions avec effets hover améliorés */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={selectAllJobs}
              className="btn-hover-lift px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border border-white/20 hover:border-white/40 hover:scale-105"
            >
              ✅ Tout sélectionner
            </button>
            <button
              type="button"
              onClick={deselectAllJobs}
              className="btn-hover-lift px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 font-medium border border-white/20 hover:border-white/40 hover:scale-105"
            >
              ❌ Tout désélectionner
            </button>
          </div>
        </div>
      </div>

      {/* Contrôles et filtres modernes */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <select
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                aria-label="Filtrer les fiches de poste par compétence"
              >
                <option value="">🔍 Filtrer par compétence</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {filterSkill && (
              <button
                onClick={() => setFilterSkill('')}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>Effacer filtre</span>
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          {/* Toggle vue */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-amber-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grille
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-amber-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Liste
            </button>
          </div>
        </div>
      </div>

      {/* Grille des cartes avec animations */}
      <div className={`transition-all duration-500 ${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
          : 'space-y-4'
      }`}>
        {filteredJobs.map((jobPost, index) => (
          <div
            key={jobPost.id}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <JobCard
              jobPost={jobPost}
              isSelected={selectedJobs.has(jobPost.id)}
              onSelect={handleJobSelect}
              onEdit={handleJobEdit}
            />
          </div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos filtres pour voir plus de fiches de poste.
          </p>
        </div>
      )}

      {/* Résumé de la sélection amélioré */}
      {selectedJobs.size > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-800">
                  {selectedJobs.size} fiche{selectedJobs.size > 1 ? 's' : ''} sélectionnée{selectedJobs.size > 1 ? 's' : ''}
                </h4>
                <p className="text-green-700">
                  Prêt pour l'étape suivante ! Nous allons maintenant trouver les meilleurs profils.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="text-2xl">🎯</div>
              <div className="text-green-600 font-medium">
                {Math.round((selectedJobs.size / jobPosts.length) * 100)}% complété
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      <JobEditModal
        isOpen={isModalOpen}
        jobPost={editingJob}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSave={handleJobSave}
      />
    </div>
  );
}

// Étape 3: Sélection des fiches de poste (placeholder)
function Step3SelectionForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Sélectionnez les fiches de poste à traiter
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exemple de fiches de poste */}
        {[
          { id: 1, title: 'Développeur Full Stack', description: 'React, Node.js, 3+ ans d\'expérience' },
          { id: 2, title: 'Chef de Projet IT', description: 'Gestion d\'équipe, Agile, 5+ ans d\'expérience' },
          { id: 3, title: 'Designer UX/UI', description: 'Figma, Adobe Suite, Design Thinking' }
        ].map((poste) => (
          <div key={poste.id} className="border border-gray-200 rounded-lg p-4 hover:border-amber-500 cursor-pointer">
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-amber-500" 
                id={`poste-${poste.id}`}
                aria-label={`Sélectionner ${poste.title}`}
              />
              <label htmlFor={`poste-${poste.id}`}>
                <h4 className="font-medium text-gray-900 cursor-pointer">{poste.title}</h4>
                <p className="text-sm text-gray-600">{poste.description}</p>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppelOffresPage() {
  const steps = [
    {
      id: 'upload',
      title: 'Upload de l\'Appel d\'Offres',
      description: 'Téléchargez votre appel d\'offres ou saisissez le contenu directement',
      component: <Step1UploadForm />,
      isValid: true // La validation sera gérée dans le composant
    },
    {
      id: 'selection',
      title: 'Sélection des Fiches de Poste',
      description: 'Choisissez les fiches de poste générées que vous souhaitez traiter',
      component: <Step2JobSelection />,
      isValid: true
    },
    {
      id: 'matching',
      title: 'Matching des Profils',
      description: 'Trouvez les meilleurs profils correspondant aux fiches sélectionnées',
      component: <Step3SelectionForm />,
      isValid: true
    }
  ];

  const handleComplete = (formData: any) => {
    console.log('Données du formulaire:', formData);
    // Ici vous pourrez traiter les données finales
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

        <MultiStepForm
          steps={steps}
          onComplete={handleComplete}
          className="py-8"
        />
      </div>
    </div>
  );
} 