import react from 'react';

const LandingPage = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center text-white p-4">
      {/* Navbar is now in App.tsx */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">Bienvenue dans notre Librairie</h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">Découvrez notre collection de livres et explorez de nouvelles histoires.</p>
      <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 text-lg">
        Explorer les livres
      </button>
    </div>
  );
};

export default LandingPage;
