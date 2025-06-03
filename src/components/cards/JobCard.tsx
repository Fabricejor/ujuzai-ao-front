'use client';

import { useState } from 'react';
import { PencilIcon, CheckIcon, MapPinIcon, ClockIcon, CurrencyEuroIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export interface JobPost {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  location?: string;
  contractType?: string;
  salary?: string;
}

interface JobCardProps {
  jobPost: JobPost;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (jobPost: JobPost) => void;
}

export default function JobCard({ jobPost, isSelected, onSelect, onEdit }: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Empêcher la propagation si on clique sur le checkbox
    if ((e.target as HTMLElement).closest('.checkbox-container')) {
      return;
    }
    onEdit(jobPost);
  };

  const handleCheckboxChange = () => {
    onSelect(jobPost.id);
  };

  return (
    <div 
      className={`group relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
        isSelected 
          ? 'border-amber-400 shadow-xl shadow-amber-100 bg-gradient-to-br from-amber-50 to-orange-50' 
          : 'border-gray-200 hover:border-amber-300 hover:shadow-xl shadow-md'
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec gradient */}
      <div className={`relative p-6 pb-4 rounded-t-2xl ${
        isSelected 
          ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
          : 'bg-gradient-to-r from-gray-50 to-gray-100'
      }`}>
        {/* Checkbox de sélection */}
        <div className="checkbox-container absolute top-4 right-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              className="sr-only"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Sélectionner ${jobPost.title}`}
            />
            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              isSelected 
                ? 'bg-white border-white' 
                : 'border-gray-300 hover:border-amber-500 bg-white'
            }`}>
              {isSelected && (
                <CheckIcon className="h-4 w-4 text-amber-500" />
              )}
            </div>
          </label>
        </div>

        {/* Titre du poste */}
        <h3 className={`text-xl font-bold mb-2 pr-8 line-clamp-2 transition-colors ${
          isSelected ? 'text-white' : 'text-gray-900'
        }`}>
          {jobPost.title}
        </h3>

        {/* Badge du type de contrat */}
        {jobPost.contractType && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isSelected 
              ? 'bg-white/20 text-white' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            <BuildingOfficeIcon className="h-3 w-3 mr-1" />
            {jobPost.contractType}
          </div>
        )}
      </div>

      {/* Corps de la carte */}
      <div className="p-6 pt-4">
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {jobPost.description}
        </p>

        {/* Compétences principales */}
        {jobPost.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {jobPost.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="skill-badge inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
              {jobPost.skills.length > 4 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  +{jobPost.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Informations en bas */}
        <div className="space-y-2">
          {jobPost.experience && (
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
              {jobPost.experience}
            </div>
          )}
          
          {jobPost.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
              {jobPost.location}
            </div>
          )}
          
          {jobPost.salary && (
            <div className="flex items-center text-sm text-gray-500">
              <CurrencyEuroIcon className="h-4 w-4 mr-2 text-gray-400" />
              {jobPost.salary}
            </div>
          )}
        </div>
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <CheckIcon className="h-5 w-5 text-white" />
        </div>
      )}

      {/* Bouton d'édition */}
      <div className={`absolute bottom-4 right-4 transition-all duration-200 ${
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(jobPost);
          }}
          className="bg-white shadow-lg hover:shadow-xl text-gray-700 hover:text-amber-600 p-3 rounded-full transition-all duration-200 border border-gray-200 hover:border-amber-300"
          title="Modifier la fiche de poste"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Overlay de hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl transition-opacity duration-300 ${
        isHovered && !isSelected ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
} 