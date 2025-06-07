'use client';

import { useState, useEffect } from 'react';
import { matchingAPI, SavedJobOffer, CvShort, MatchingResult, CvDetails, OfferDetails } from '@/app/api/config';
import { JobAnalysisResponse } from '@/app/api/config';
import toast from 'react-hot-toast';
import { FaFileAlt, FaUser, FaSearch, FaTimes, FaCheck, FaChartBar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Step3MatchingFormProps {
  analysisData?: JobAnalysisResponse | null;
}

// Modal pour afficher les CVs
interface CvModalProps {
  isOpen: boolean;
  cvs: CvShort[];
  selectedCvs: string[];
  onClose: () => void;
  onToggleSelection: (cvId: string) => void;
  isLoading: boolean;
}

function CvModal({ isOpen, cvs, selectedCvs, onClose, onToggleSelection, isLoading }: CvModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Sélection des CVs</h3>
                <p className="text-blue-100">
                  {selectedCvs.length} CV{selectedCvs.length > 1 ? 's' : ''} sélectionné{selectedCvs.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des CVs...</p>
              </div>
            </div>
          ) : cvs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun CV disponible</h4>
              <p className="text-gray-600">Il n'y a pas de CVs dans la base de données.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv, index) => {
                const isSelected = selectedCvs.includes(cv.id_cv);
                
                return (
                  <div
                    key={cv.id_cv}
                    className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 animate-fadeIn hover:scale-105 ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => onToggleSelection(cv.id_cv)}
                  >
                    {/* Selection indicator */}
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-400 bg-blue-400'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <FaCheck className="w-3 h-3 text-white" />}
                    </div>

                    {/* CV Info */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-blue-400' : 'bg-gray-400'
                        }`}>
                          <FaUser className="text-white text-lg" />
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg ${isSelected ? 'text-blue-800' : 'text-gray-900'}`}>
                            {cv.nom} {cv.prenom}
                          </h4>
                          <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                            {cv.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                          📞 {cv.telephone}
                        </p>
                        
                        {cv.domaine_etude.length > 0 && (
                          <div>
                            <p className={`text-xs font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                              Domaines d'étude:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cv.domaine_etude.slice(0, 2).map((domaine, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    isSelected 
                                      ? 'bg-blue-200 text-blue-800' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {domaine}
                                </span>
                              ))}
                              {cv.domaine_etude.length > 2 && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  isSelected ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
                                }`}>
                                  +{cv.domaine_etude.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {cv.competences.length > 0 && (
                          <div>
                            <p className={`text-xs font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                              Compétences:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {cv.competences.slice(0, 3).map((competence, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    isSelected 
                                      ? 'bg-green-200 text-green-800' 
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {competence}
                                </span>
                              ))}
                              {cv.competences.length > 3 && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  isSelected ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  +{cv.competences.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedCvs.length} CV{selectedCvs.length > 1 ? 's' : ''} sélectionné{selectedCvs.length > 1 ? 's' : ''}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            Valider la sélection
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal pour afficher les offres d'emploi
interface OfferModalProps {
  isOpen: boolean;
  offers: SavedJobOffer[];
  selectedOffers: string[];
  onClose: () => void;
  onToggleSelection: (offerId: string) => void;
  isLoading: boolean;
}

function OfferModal({ isOpen, offers, selectedOffers, onClose, onToggleSelection, isLoading }: OfferModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Sélection des Offres</h3>
                <p className="text-purple-100">
                  {selectedOffers.length} offre{selectedOffers.length > 1 ? 's' : ''} sélectionnée{selectedOffers.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des offres...</p>
              </div>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune offre disponible</h4>
              <p className="text-gray-600">Aucune fiche de poste n'a été sauvegardée pour cet appel d'offres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer, index) => {
                const isSelected = selectedOffers.includes(offer.id_offre);
                
                return (
                  <div
                    key={offer.id_offre}
                    className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 animate-fadeIn hover:scale-105 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => onToggleSelection(offer.id_offre)}
                  >
                    {/* Selection indicator */}
                    <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <FaCheck className="w-3 h-3 text-white" />}
                    </div>

                    {/* Offer Info */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-purple-400' : 'bg-gray-400'
                        }`}>
                          <FaFileAlt className="text-white text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-2 ${isSelected ? 'text-purple-800' : 'text-gray-900'}`}>
                            {offer.titre_offre}
                          </h4>
                          <p className={`text-sm leading-relaxed ${isSelected ? 'text-purple-600' : 'text-gray-600'}`}>
                            {offer.description.substring(0, 200)}
                            {offer.description.length > 200 && '...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedOffers.length} offre{selectedOffers.length > 1 ? 's' : ''} sélectionnée{selectedOffers.length > 1 ? 's' : ''}
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
          >
            Valider la sélection
          </button>
        </div>
      </div>
    </div>
  );
}

// Interface pour les résultats enrichis
interface EnrichedResult {
  id_cv: string;
  id_offre: string;
  similarity: number;
  cvDetails: CvDetails;
  offerDetails: OfferDetails;
}

export default function Step3MatchingForm({ analysisData }: Step3MatchingFormProps) {
  const [cvs, setCvs] = useState<CvShort[]>([]);
  const [offers, setOffers] = useState<SavedJobOffer[]>([]);
  const [selectedCvs, setSelectedCvs] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [matchingResults, setMatchingResults] = useState<EnrichedResult[]>([]);
  
  // États des modals
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  
  // États de chargement
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [loadingMatching, setLoadingMatching] = useState(false);

  // Charger les CVs
  const loadCvs = async () => {
    setLoadingCvs(true);
    try {
      const result = await matchingAPI.getAllCvs();
      setCvs(result);
      console.log('📄 CVs chargés:', result.length);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des CVs:', error);
      toast.error('Erreur lors du chargement des CVs');
    } finally {
      setLoadingCvs(false);
    }
  };

  // Charger les offres
  const loadOffers = async () => {
    if (!analysisData?.id_appel_candidature) return;
    
    setLoadingOffers(true);
    try {
      const result = await matchingAPI.getSavedJobOffers(analysisData.id_appel_candidature);
      setOffers(result);
      console.log('📋 Offres chargées:', result.length);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des offres:', error);
      toast.error('Erreur lors du chargement des offres');
    } finally {
      setLoadingOffers(false);
    }
  };

  // Effectuer le matching
  const performMatching = async () => {
    if (selectedCvs.length === 0 || selectedOffers.length === 0) {
      toast.error('Veuillez sélectionner au moins un CV et une offre');
      return;
    }

    setLoadingMatching(true);
    try {
      console.log('🔍 Début du matching...', { selectedCvs, selectedOffers });
      
      // Effectuer le matching
      const matchingResults = await matchingAPI.matchCvsOffres({
        id_cvs: selectedCvs,
        id_offres: selectedOffers
      });

      console.log('✅ Résultats de matching obtenus:', matchingResults.length);

      // Enrichir les résultats avec les détails
      const enrichedResults: EnrichedResult[] = [];
      
      for (const result of matchingResults) {
        try {
          const [cvDetails, offerDetails] = await Promise.all([
            matchingAPI.getCvDetails(result.id_cv),
            matchingAPI.getOfferDetails(result.id_offre)
          ]);

          enrichedResults.push({
            ...result,
            cvDetails,
            offerDetails
          });
        } catch (error) {
          console.error('❌ Erreur lors de l\'enrichissement:', error);
        }
      }

      // Trier par similarité décroissante
      enrichedResults.sort((a, b) => b.similarity - a.similarity);
      
      setMatchingResults(enrichedResults);
      toast.success(`✅ ${enrichedResults.length} résultat${enrichedResults.length > 1 ? 's' : ''} de matching trouvé${enrichedResults.length > 1 ? 's' : ''} !`);
      
    } catch (error) {
      console.error('❌ Erreur lors du matching:', error);
      toast.error('Erreur lors du matching');
    } finally {
      setLoadingMatching(false);
    }
  };

  // Gérer les sélections
  const toggleCvSelection = (cvId: string) => {
    setSelectedCvs(prev => 
      prev.includes(cvId) 
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const toggleOfferSelection = (offerId: string) => {
    setSelectedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  // Fonction pour obtenir la couleur de similarité
  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.8) return 'text-green-600 bg-green-100';
    if (similarity >= 0.6) return 'text-yellow-600 bg-yellow-100';
    if (similarity >= 0.4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getSimilarityIcon = (similarity: number) => {
    if (similarity >= 0.8) return '🔥';
    if (similarity >= 0.6) return '⭐';
    if (similarity >= 0.4) return '👍';
    return '🤔';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          🎯 Matching des Profils
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Sélectionnez les CVs et les fiches de poste pour effectuer un matching intelligent 
          basé sur l'intelligence artificielle
        </p>
      </div>

      {/* Boutons de sélection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bouton CVs */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Décoration de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">👥</div>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-3 flex items-center">
              <FaUser className="mr-3" />
              CVs Disponibles
            </h4>
            <p className="text-blue-100 mb-6">
              Accédez à notre base de données de CVs et sélectionnez les candidats potentiels
            </p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{selectedCvs.length}</div>
                <div className="text-sm text-blue-100">Sélectionnés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{cvs.length}</div>
                <div className="text-sm text-blue-100">Disponibles</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (cvs.length === 0) {
                  loadCvs();
                }
                setCvModalOpen(true);
              }}
              disabled={loadingCvs}
              className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-2xl hover:bg-blue-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingCvs ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Chargement...</span>
                </div>
              ) : (
                `📄 Parcourir les CVs ${cvs.length > 0 ? `(${cvs.length})` : ''}`
              )}
            </button>
          </div>
        </div>

        {/* Bouton Offres */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Décoration de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-6xl">💼</div>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-3 flex items-center">
              <FaFileAlt className="mr-3" />
              Fiches de Poste
            </h4>
            <p className="text-purple-100 mb-6">
              Consultez les fiches de poste générées et sauvegardées à l'étape précédente
            </p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{selectedOffers.length}</div>
                <div className="text-sm text-purple-100">Sélectionnées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{offers.length}</div>
                <div className="text-sm text-purple-100">Disponibles</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (offers.length === 0) {
                  loadOffers();
                }
                setOfferModalOpen(true);
              }}
              disabled={loadingOffers || !analysisData?.id_appel_candidature}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-2xl hover:bg-purple-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingOffers ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Chargement...</span>
                </div>
              ) : (
                `📋 Parcourir les Offres ${offers.length > 0 ? `(${offers.length})` : ''}`
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bouton de matching */}
      {(selectedCvs.length > 0 || selectedOffers.length > 0) && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 inline-block">
            <h4 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <FaSearch className="mr-3" />
              Lancer le Matching IA
            </h4>
            
            <div className="flex items-center justify-center space-x-8 mb-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{selectedCvs.length}</div>
                <div className="text-sm text-green-100">CVs</div>
              </div>
              <div className="text-4xl">✖️</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{selectedOffers.length}</div>
                <div className="text-sm text-green-100">Offres</div>
              </div>
              <div className="text-4xl">=</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200">{selectedCvs.length * selectedOffers.length}</div>
                <div className="text-sm text-green-100">Comparaisons</div>
              </div>
            </div>

            <button
              onClick={performMatching}
              disabled={selectedCvs.length === 0 || selectedOffers.length === 0 || loadingMatching}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 ${
                selectedCvs.length > 0 && selectedOffers.length > 0 && !loadingMatching
                  ? 'bg-white text-green-600 hover:bg-green-50 hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loadingMatching ? (
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyse en cours...</span>
                </div>
              ) : (
                '🚀 Faire le Matching'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Résultats du matching */}
      {matchingResults.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <FaChartBar className="mr-3 text-green-500" />
              Résultats du Matching
            </h4>
            <p className="text-gray-600">
              {matchingResults.length} correspondance{matchingResults.length > 1 ? 's' : ''} trouvée{matchingResults.length > 1 ? 's' : ''}, 
              triée{matchingResults.length > 1 ? 's' : ''} par pertinence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matchingResults.map((result, index) => (
              <div
                key={`${result.id_cv}-${result.id_offre}`}
                className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header avec score */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getSimilarityIcon(result.similarity)}</span>
                    <div>
                      <h5 className="font-bold text-gray-900">Match #{index + 1}</h5>
                      <p className="text-sm text-gray-500">Évaluation IA</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-bold text-lg ${getSimilarityColor(result.similarity)}`}>
                    {Math.round(result.similarity * 100)}%
                  </div>
                </div>

                {/* Détails du candidat */}
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <h6 className="font-bold text-blue-900">
                        {result.cvDetails.nom} {result.cvDetails.prenom}
                      </h6>
                      <p className="text-sm text-blue-600">{result.cvDetails.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <p className="text-sm text-blue-700">
                      <strong>Téléphone:</strong> {result.cvDetails.telephone}
                    </p>
                    
                    {result.cvDetails.domaine_etude.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-blue-700 mb-1">Domaines d'étude:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.cvDetails.domaine_etude.map((domaine, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                              {domaine}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {result.cvDetails.competences.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-blue-700 mb-1">Compétences:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.cvDetails.competences.slice(0, 5).map((competence, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                              {competence}
                            </span>
                          ))}
                          {result.cvDetails.competences.length > 5 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                              +{result.cvDetails.competences.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Détails de l'offre */}
                <div className="p-4 bg-purple-50 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <FaFileAlt className="text-white" />
                    </div>
                    <div>
                      <h6 className="font-bold text-purple-900">{result.offerDetails.titre_offre}</h6>
                      <p className="text-sm text-purple-600">{result.offerDetails.type_contrat}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-purple-700 leading-relaxed">
                    {result.offerDetails.description.substring(0, 150)}
                    {result.offerDetails.description.length > 150 && '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CvModal
        isOpen={cvModalOpen}
        cvs={cvs}
        selectedCvs={selectedCvs}
        onClose={() => setCvModalOpen(false)}
        onToggleSelection={toggleCvSelection}
        isLoading={loadingCvs}
      />

      <OfferModal
        isOpen={offerModalOpen}
        offers={offers}
        selectedOffers={selectedOffers}
        onClose={() => setOfferModalOpen(false)}
        onToggleSelection={toggleOfferSelection}
        isLoading={loadingOffers}
      />
    </div>
  );
} 