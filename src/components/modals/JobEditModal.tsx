'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon, SparklesIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { JobPost } from '../cards/JobCard';

interface JobEditModalProps {
  isOpen: boolean;
  jobPost: JobPost | null;
  onClose: () => void;
  onSave: (updatedJobPost: JobPost) => void;
}

export default function JobEditModal({ isOpen, jobPost, onClose, onSave }: JobEditModalProps) {
  const [formData, setFormData] = useState<JobPost>({
    id: '',
    title: '',
    description: '',
    requirements: [],
    skills: [],
    experience: '',
    location: '',
    contractType: '',
    salary: ''
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (jobPost) {
      setFormData(jobPost);
    }
  }, [jobPost]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof JobPost, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsAnimating(false);
    setTimeout(() => onClose(), 200);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay avec effet de flou amélioré */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/20 to-black/50 modal-overlay transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Container avec animation d'entrée */}
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden transition-all duration-500 transform ${
        isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
      }`}>
        
        {/* Header avec gradient moderne */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-8 py-6">
          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <BriefcaseIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <SparklesIcon className="h-8 w-8 text-yellow-300" />
                  Modifier la Fiche de Poste
                </h2>
                <p className="text-white/90 mt-1">Personnalisez les détails pour obtenir les meilleurs résultats</p>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-110"
              aria-label="Fermer"
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Modal Content avec scroll personnalisé */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)] custom-scrollbar">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Colonne gauche - Informations principales */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  📋 Informations Principales
                </h3>
                
                {/* Titre du poste */}
                <div className="mb-6">
                  <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700 mb-3">
                    Titre du poste *
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                    placeholder="Ex: Développeur Full Stack Senior"
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-700 mb-3">
                    Description *
                  </label>
                  <textarea
                    id="edit-description"
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 resize-none custom-scrollbar"
                    placeholder="Description détaillée du poste et des responsabilités..."
                  />
                </div>

                {/* Expérience */}
                <div>
                  <label htmlFor="edit-experience" className="block text-sm font-semibold text-gray-700 mb-3">
                    💼 Expérience requise
                  </label>
                  <input
                    type="text"
                    id="edit-experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                    placeholder="Ex: 3-5 ans d'expérience en développement"
                  />
                </div>
              </div>

              {/* Informations contractuelles */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  💰 Informations Contractuelles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Localisation */}
                  <div>
                    <label htmlFor="edit-location" className="block text-sm font-semibold text-gray-700 mb-3">
                      📍 Localisation
                    </label>
                    <input
                      type="text"
                      id="edit-location"
                      value={formData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                      placeholder="Paris, Remote, Hybride..."
                    />
                  </div>

                  {/* Type de contrat */}
                  <div>
                    <label htmlFor="edit-contractType" className="block text-sm font-semibold text-gray-700 mb-3">
                      📝 Type de contrat
                    </label>
                    <select
                      id="edit-contractType"
                      value={formData.contractType || ''}
                      onChange={(e) => handleInputChange('contractType', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                      aria-label="Type de contrat"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="CDI">CDI - Contrat à Durée Indéterminée</option>
                      <option value="CDD">CDD - Contrat à Durée Déterminée</option>
                      <option value="Freelance">Freelance / Consultant</option>
                      <option value="Stage">Stage</option>
                      <option value="Alternance">Alternance</option>
                    </select>
                  </div>
                </div>

                {/* Salaire */}
                <div className="mt-4">
                  <label htmlFor="edit-salary" className="block text-sm font-semibold text-gray-700 mb-3">
                    💶 Rémunération
                  </label>
                  <input
                    type="text"
                    id="edit-salary"
                    value={formData.salary || ''}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                    placeholder="Ex: 45-55k€, À négocier, Selon profil..."
                  />
                </div>
              </div>
            </div>

            {/* Colonne droite - Compétences et exigences */}
            <div className="space-y-6">
              {/* Compétences techniques */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                  🚀 Compétences Techniques
                </h3>
                
                <div className="flex space-x-3 mb-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                    placeholder="Ex: React, Python, AWS..."
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="btn-hover-lift bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    title="Ajouter une compétence"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="skill-badge flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200 group">
                      <span className="text-sm font-medium text-gray-800">{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Supprimer cette compétence"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.skills.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🎯</div>
                      <p>Ajoutez des compétences pour ce poste</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Exigences du poste */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  ⭐ Exigences du Poste
                </h3>
                
                <div className="flex space-x-3 mb-4">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:border-gray-300"
                    placeholder="Ex: Maîtrise de Git, Expérience Agile..."
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="btn-hover-lift bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    title="Ajouter une exigence"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-amber-200 hover:border-amber-300 transition-all duration-200 group">
                      <span className="text-sm font-medium text-gray-800">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Supprimer cette exigence"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.requirements.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>Ajoutez des exigences pour ce poste</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer avec boutons améliorés */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">💡 Astuce:</span> Plus les informations sont précises, meilleurs seront les résultats de matching
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="btn-hover-lift px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all duration-200 font-medium shadow-sm"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="btn-hover-lift px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl animate-glow"
              >
                ✨ Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 