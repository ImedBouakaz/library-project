import react from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Librairie</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
            <Link to="/books" className="text-gray-600 hover:text-gray-900">Livres</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">À propos</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
