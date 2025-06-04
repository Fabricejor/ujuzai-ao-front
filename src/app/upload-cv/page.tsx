'use client';

import { useState, useCallback, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

type UploadMode = 'file' | 'text';

export default function UploadCVPage() {
    const [uploadMode, setUploadMode] = useState<UploadMode>('file');
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [textContent, setTextContent] = useState('');
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

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(file => 
            file.type === 'application/pdf' || 
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );

        if (validFiles.length > 0) {
            setSelectedFiles(prev => [...prev, ...validFiles]);
        } else {
            alert('Veuillez sélectionner des fichiers PDF ou Word valides.');
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => 
            file.type === 'application/pdf' || 
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );

        if (validFiles.length > 0) {
            setSelectedFiles(prev => [...prev, ...validFiles]);
        } else {
            alert('Veuillez sélectionner des fichiers PDF ou Word valides.');
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (uploadMode === 'file' && selectedFiles.length > 0) {
            console.log('Fichiers CV à envoyer:', selectedFiles);
            // Logique d'upload des CV
            alert(`${selectedFiles.length} CV(s) uploadé(s) avec succès !`);
        } else if (uploadMode === 'text' && textContent.trim()) {
            console.log('Contenu CV à envoyer:', textContent);
            // Logique de traitement du texte CV
            alert('CV en texte uploadé avec succès !');
        } else {
            alert('Veuillez sélectionner au moins un CV ou saisir du contenu.');
        }
    };

    const isFormValid = () => {
        return (uploadMode === 'file' && selectedFiles.length > 0) ||
            (uploadMode === 'text' && textContent.trim().length > 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            📄 Uploadez vos CV
                        </h1>
                        <p className="text-gray-600">
                            Téléchargez un ou plusieurs CV au format PDF ou Word (taille max: 25 Mo par fichier),
                            ou saisissez directement le contenu d'un CV.
                        </p>
                    </div>

                    {/* Mode Selection */}
                    <div className="mb-8">
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setUploadMode('file')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${uploadMode === 'file'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Upload Fichiers CV
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMode('text')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${uploadMode === 'text'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Saisir le Contenu CV
                            </button>
                        </div>
                    </div>

                    {/* File Upload Mode */}
                    {uploadMode === 'file' && (
                        <div className="mb-8">
                            <div
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors mb-6 ${isDragOver
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 bg-gray-50'
                                    }`}
                            >
                                <CloudArrowUpIcon className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Déposez les CV ou parcourez vos dossiers
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Glissez-déposez vos fichiers CV (PDF, Word) ici ou cliquez pour les sélectionner
                                </p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                                >
                                    Parcourir les fichiers
                                </button>
                                <input
                                    title='fichiers-cv'
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>

                            {/* Selected Files */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-900">
                                        Fichiers sélectionnés ({selectedFiles.length})
                                    </h4>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="border border-gray-300 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <DocumentIcon className="h-8 w-8 text-blue-500" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{file.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <XMarkIcon className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Text Input Mode */}
                    {uploadMode === 'text' && (
                        <div className="mb-8">
                            <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-2">
                                Contenu du CV
                            </label>
                            <textarea
                                id="textContent"
                                rows={12}
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                placeholder="Copiez et collez le contenu du CV ici..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Caractères saisis: {textContent.length}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isFormValid()}
                            className={`px-8 py-3 rounded-lg font-medium transition-colors ${isFormValid()
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {uploadMode === 'file' 
                                ? `Uploader ${selectedFiles.length > 0 ? selectedFiles.length : ''} CV`
                                : 'Analyser le CV'
                            }
                        </button>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-blue-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">
                            💡 Comment ça fonctionne ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                    1
                                </div>
                                <h4 className="font-medium text-blue-900 mb-2">Upload</h4>
                                <p className="text-blue-700 text-sm">
                                    Téléchargez vos CV ou saisissez le contenu
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                    2
                                </div>
                                <h4 className="font-medium text-blue-900 mb-2">Analyse</h4>
                                <p className="text-blue-700 text-sm">
                                    L'IA extrait et structure les informations
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                    3
                                </div>
                                <h4 className="font-medium text-blue-900 mb-2">Base de données</h4>
                                <p className="text-blue-700 text-sm">
                                    Les profils sont ajoutés à votre base
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 