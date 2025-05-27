import React from 'react';
import RecentChanges from '../components/RecentChanges';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue sur Library Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre vaste collection de livres et restez informé des dernières mises à jour de notre bibliothèque.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">À propos</h2>
            <p className="text-gray-600">
              Library Project est une application moderne qui vous permet d'explorer
              une vaste collection de livres. Vous pouvez rechercher des livres,
              consulter leurs détails et suivre les mises à jour de la bibliothèque
              en temps réel.
            </p>
            <div className="mt-6">
              <a
                href="/books"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explorer les livres
              </a>
            </div>
          </div>

          <RecentChanges />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
