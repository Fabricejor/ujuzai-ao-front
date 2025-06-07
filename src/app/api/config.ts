// fichier de configuration des endpoints venant de l'api qui relie au backend
//Axios
import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
    baseURL: process.env.SERVER_FASTAPI_URL || 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types pour l'analyse d'appels d'offres
export interface JobAnalysisResponse {
    id_appel_candidature: string;
    result: {
        job_positions: string[];
        commentaires: string;
        error: boolean;
    };
}

// Types pour la génération de fiches de poste
export interface JobGenerateRequest {
    id_appel_candidature: string;
    job_positions: string[];
}

export interface JobGenerateResponse {
    fiches: Record<string, string>; // nom_du_poste: description
}

// Types pour la sauvegarde d'une fiche de poste
export interface JobStoreRequest {
    id_appel_candidature: string;
    fiche_poste: string;
}

export interface JobStoreResponse {
    success: boolean;
    message: string;
}

// Types pour l'étape 3 - Matching
export interface SavedJobOffer {
    id_offre: string;
    titre_offre: string;
    description: string;
}

export interface CvShort {
    id_cv: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    domaine_etude: string[];
    competences: string[];
}

export interface MatchingRequest {
    id_cvs: string[];
    id_offres: string[];
}

export interface MatchingResult {
    id_cv: string;
    id_offre: string;
    similarity: number; // entre 0 et 1
}

export interface CvDetails {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    domaine_etude: string[];
    competences: string[];
}

export interface OfferDetails {
    titre_offre: string;
    description: string;
    type_contrat: string;
}

// Endpoints pour l'analyse d'appels d'offres
export const jobAnalysisAPI = {
    // Analyser un appel d'offres à partir d'un texte
    analyzeFromText: async (text: string): Promise<JobAnalysisResponse> => {
        const response = await api.post('/job/analyze', {
            content: text,
            type: 'text'
        });
        return response.data;
    },

    // Analyser un appel d'offres à partir d'un fichier PDF
    analyzeFromFile: async (file: File): Promise<JobAnalysisResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'file');
        
        const response = await api.post('/job/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Générer des fiches de poste détaillées
    generateJobSheets: async (data: JobGenerateRequest): Promise<JobGenerateResponse> => {
        const response = await api.post('/job/generate', data);
        return response.data;
    },

    // Sauvegarder une fiche de poste
    storeJobSheet: async (data: JobStoreRequest): Promise<JobStoreResponse> => {
        const formData = new URLSearchParams();
        formData.append('id_appel_candidature', data.id_appel_candidature);
        formData.append('fiche_poste', data.fiche_poste);
        
        const response = await api.post('/job/store-offre', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
};

// Endpoints pour l'étape 3 - Matching
export const matchingAPI = {
    // Récupérer les fiches de poste sauvegardées d'un appel d'offres
    getSavedJobOffers: async (id_appel: string): Promise<SavedJobOffer[]> => {
        const response = await api.get(`/job/offre/appel/${id_appel}`);
        return response.data;
    },

    // Récupérer tous les CVs (version courte)
    getAllCvs: async (): Promise<CvShort[]> => {
        const response = await api.get('/cv/short');
        return response.data;
    },

    // Faire le matching entre CVs et offres
    matchCvsOffres: async (data: MatchingRequest): Promise<MatchingResult[]> => {
        const response = await api.post('/similarity/match-cvs-offres', data);
        return response.data;
    },

    // Récupérer les détails d'un CV
    getCvDetails: async (id_cv: string): Promise<CvDetails> => {
        const response = await api.get(`/cv/short/${id_cv}`);
        return response.data;
    },

    // Récupérer les détails d'une offre
    getOfferDetails: async (id_offre: string): Promise<OfferDetails> => {
        const response = await api.get(`/job/offre/${id_offre}`);
        return response.data;
    }
};

export default api;


