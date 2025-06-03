'use client';

import { useState, useCallback, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string[];
  maxSize?: number; // en MB
  className?: string;
  selectedFile?: File | null;
}

export default function FileUpload({
  onFileSelect,
  acceptedTypes = ['.pdf'],
  maxSize = 25,
  className = '',
  selectedFile = null
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): boolean => {
    // Vérifier le type de fichier
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      alert(`Type de fichier non accepté. Types acceptés: ${acceptedTypes.join(', ')}`);
      return false;
    }

    // Vérifier la taille
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxSize) {
      alert(`Fichier trop volumineux. Taille maximale: ${maxSize} MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, acceptedTypes, maxSize]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className={className}>
      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragOver
              ? 'border-amber-500 bg-amber-50'
              : 'border-gray-300 bg-gray-50 hover:border-amber-400 hover:bg-amber-25'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudArrowUpIcon className="mx-auto h-16 w-16 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Déposez le fichier ou parcourez vos dossiers
          </h3>
          <p className="text-gray-600 mb-4">
            Glissez-déposez votre fichier ici ou cliquez pour le sélectionner
          </p>
          <div className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors inline-block">
            Parcourir les fichiers
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Formats acceptés: {acceptedTypes.join(', ')} • Taille max: {maxSize} MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            title="Sélectionner un fichier"
            aria-label="Sélectionner un fichier"
          />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentIcon className="h-8 w-8 text-red-500" />
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Supprimer le fichier"
              aria-label="Supprimer le fichier"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 