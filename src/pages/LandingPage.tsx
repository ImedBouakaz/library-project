import react from 'react';

const LandingPage = () => {
  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      {/* Navbar is now in App.tsx */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenue dans notre Librairie</h1>
        <p className="text-lg text-gray-600 mb-8">Découvrez notre collection de livres et explorez de nouvelles histoires.</p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Explorer les livres
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
