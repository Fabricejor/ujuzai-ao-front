import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              UjuzAI - Gestion d'Appels d'Offres
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transformez automatiquement vos appels d'offres en fiches de poste optimisées 
              et trouvez les meilleurs profils de votre base de données grâce à l'intelligence artificielle.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Simple
              </h3>
              <p className="text-gray-600">
                Téléchargez vos appels d'offres en PDF ou saisissez le contenu directement
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                IA Avancée
              </h3>
              <p className="text-gray-600">
                Notre IA analyse et extrait automatiquement les fiches de poste
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Matching Intelligent
              </h3>
              <p className="text-gray-600">
                Trouvez les meilleurs profils correspondant à chaque poste
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link 
              href="/appel-offres"
              className="inline-block bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
            >
              Commencer un Nouvel Appel d'Offres →
            </Link>
            
            <div className="text-sm text-gray-500">
              Processus simple en 3 étapes • Résultats en quelques minutes
            </div>
          </div>

          {/* Process Steps */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Comment ça fonctionne ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload</h3>
                <p className="text-gray-600 text-sm">
                  Téléchargez votre appel d'offres ou copiez le contenu
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analyse</h3>
                <p className="text-gray-600 text-sm">
                  L'IA extrait et structure les fiches de poste
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Matching</h3>
                <p className="text-gray-600 text-sm">
                  Trouvez les meilleurs profils pour chaque poste
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
