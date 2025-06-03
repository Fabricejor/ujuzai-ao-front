'use client';

import { useState, useCallback, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

type UploadMode = 'file' | 'text';

export default function UploadPage() {
    const [uploadMode, setUploadMode] = useState<UploadMode>('file');
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        const file = files[0];

        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Veuillez sélectionner un fichier PDF valide.');
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert('Veuillez sélectionner un fichier PDF valide.');
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        if (uploadMode === 'file' && selectedFile) {
            console.log('Fichier à envoyer:', selectedFile);
            // Logique d'upload du fichier
        } else if (uploadMode === 'text' && textContent.trim()) {
            console.log('Texte à envoyer:', textContent);
            // Logique de traitement du texte
        } else {
            alert('Veuillez sélectionner un fichier PDF ou saisir du texte.');
        }
    };

    const isFormValid = () => {
        return (uploadMode === 'file' && selectedFile) ||
            (uploadMode === 'text' && textContent.trim().length > 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Uploadez Votre Appel d'Offres
                        </h1>
                        <p className="text-gray-600">
                            Veuillez télécharger un fichier au format PDF et assurez-vous que sa taille ne dépasse pas 25 Mo,
                            ou saisissez directement le contenu de l'appel d'offres.
                        </p>
                    </div>

                    {/* Mode Selection */}
                    <div className="mb-8">
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setUploadMode('file')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${uploadMode === 'file'
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Upload Fichier PDF
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMode('text')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${uploadMode === 'text'
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Saisir le Texte
                            </button>
                        </div>
                    </div>

                    {/* File Upload Mode */}
                    {uploadMode === 'file' && (
                        <div className="mb-8">
                            {!selectedFile ? (
                                <div
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragOver
                                            ? 'border-amber-500 bg-amber-50'
                                            : 'border-gray-300 bg-gray-50'
                                        }`}
                                >
                                    <CloudArrowUpIcon className="mx-auto h-16 w-16 text-amber-500 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Déposez le fichier ou parcourez vos dossiers.
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Glissez-déposez votre fichier PDF ici ou cliquez pour le sélectionner
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                                    >
                                        Parcourir les fichiers
                                    </button>
                                    <input
                                        title='fichier'
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileSelect}
                                        className="hidden"
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
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Text Input Mode */}
                    {uploadMode === 'text' && (
                        <div className="mb-8">
                            <label htmlFor="textContent" className="block text-sm font-medium text-gray-700 mb-2">
                                Contenu de l'appel d'offres
                            </label>
                            <textarea
                                id="textContent"
                                rows={12}
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                placeholder="Copiez et collez le contenu de votre appel d'offres ici..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                                Caractères saisis: {textContent.length}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!isFormValid()}
                            className={`px-8 py-3 rounded-lg font-medium transition-colors ${isFormValid()
                                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 