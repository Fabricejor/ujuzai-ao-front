import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      {/* Main container with 90vh constraint */}
      <div className="h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Hero Section - Compact */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="mb-4">
              <span className="inline-block text-4xl sm:text-5xl lg:text-6xl mb-2">🚀</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                UjuzAI
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-amber-600 mb-4">
                Gestion d'Appels d'Offres Intelligente
              </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transformez automatiquement vos appels d'offres en fiches de poste optimisées 
              et trouvez les meilleurs profils grâce à l'IA.
            </p>
          </div>

          {/* Features Grid - Optimized spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
              <div className="text-3xl lg:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📄</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                Upload Simple
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                PDF ou saisie directe de vos appels d'offres
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
              <div className="text-3xl lg:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                IA Avancée
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Extraction automatique des fiches de poste
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
              <div className="text-3xl lg:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                Matching Intelligent
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Trouvez les meilleurs profils correspondants
              </p>
            </div>
          </div>

          {/* CTA Section - Centered and responsive */}
          <div className="text-center space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Commencez maintenant
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Link 
                href="/appel-offres"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  📋 Créer un Appel d'Offres
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <div className="flex items-center justify-center w-8 h-8 bg-white/60 rounded-full text-gray-500 font-medium text-sm hidden sm:flex">
                OU
              </div>
              <div className="text-gray-400 font-medium sm:hidden">OU</div>
              
              <Link 
                href="/upload-cv"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  📄 Uploader des CV
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-500 mt-6">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>3 étapes simples</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Résultats rapides</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>IA performante</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Subtle bottom decoration */}
      <div className="h-[10vh] bg-gradient-to-t from-amber-100 to-transparent flex items-end justify-center pb-4">
        <div className="text-xs text-gray-400 text-center">
          Propulsé par l'Intelligence Artificielle
        </div>
      </div>
    </div>
  );
}
