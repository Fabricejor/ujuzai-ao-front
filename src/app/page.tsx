import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      {/* Main Hero Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-7xl mx-auto text-center">
          
          {/* Logo and Brand Section */}
          <div className="mb-12 lg:mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/LOGO_UJUZAI_HD.png"
                  alt="UjuzAI Logo"
                  width={200}
                  height={80}
                  className="h-16 sm:h-20 lg:h-24 w-auto drop-shadow-lg"
                  priority
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-blue-400/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-sm sm:text-base lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Gestion d'Appels d'Offres
                <span className="block text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                  Intelligente
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
                Transformez automatiquement vos appels d'offres en fiches de poste optimisées 
                et trouvez les meilleurs profils grâce à l'Intelligence Artificielle
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  📄
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                  Upload Simple
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  PDF ou saisie directe de vos appels d'offres avec une interface intuitive
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  🤖
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                  IA Avancée
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Extraction automatique et analyse intelligente des fiches de poste
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  👥
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4">
                  Matching Intelligent
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Trouvez les meilleurs profils correspondants à vos besoins
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Commencez maintenant
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choisissez votre point d'entrée pour commencer votre transformation digitale
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-5xl mx-auto">
              <Link 
                href="/appel-offres"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full lg:w-auto min-w-[280px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-xl">📋</span>
                  Appel d'Offres Complet
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                href="/appel-offres-simplifie"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full lg:w-auto min-w-[280px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-xl">⚡</span>
                  Appel d'Offres Simplifié
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                href="/upload-cv"
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full lg:w-auto min-w-[280px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-xl">📄</span>
                  Uploader des CV
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 mt-12 pt-8 border-t border-slate-200/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Interface intuitive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Résultats en temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-sm"></div>
                <span className="font-medium">IA de dernière génération</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm"></div>
                <span className="font-medium">Sécurisé et fiable</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
}
