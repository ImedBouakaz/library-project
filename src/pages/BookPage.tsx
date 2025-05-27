import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore';
import type { Book, BookAuthor } from '../store/useBookStore';
import type { SearchFilters } from '../components/AdvancedSearch';
import Searchbar from '../components/searchbar';
import SearchbarSkeleton from '../components/SearchbarSkeleton';
import AdvancedSearch from '../components/AdvancedSearch';
import AdvancedSearchSkeleton from '../components/AdvancedSearchSkeleton';
import BookSkeleton from '../components/BookSkeleton';

const BookPage = () => {
  const navigate = useNavigate();
  const { books, loading, error, fetchBooks } = useBookStore();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  useEffect(() => {
    fetchBooks('programming'); // Recherche initiale par sujet
  }, [fetchBooks]);

  const handleSearch = (query: string) => {
    fetchBooks(query); // Recherche simple par sujet
  };

  const handleAdvancedSearch = (filters: SearchFilters) => {
    fetchBooks(filters); // Recherche avancée avec filtres
    setShowAdvancedSearch(false); // Fermer le panneau après la recherche
  };

  const handleBookClick = (bookKey: string) => {
    // Enlever le préfixe "/works/" si présent dans la clé
    const cleanKey = bookKey.replace('/works/', '');
    navigate(`/book/${cleanKey}`);
  };

  const renderSearchSection = () => {
    if (loading) {
      return showAdvancedSearch ? <AdvancedSearchSkeleton /> : <SearchbarSkeleton />;
    }

    return !showAdvancedSearch ? (
      <div className="space-y-4">
        <Searchbar onSearch={handleSearch} />
        <button
          onClick={() => setShowAdvancedSearch(true)}
          className="text-blue-500 hover:text-blue-600 text-sm ml-4"
        >
          Recherche avancée
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        <AdvancedSearch onSearch={handleAdvancedSearch} />
        <button
          onClick={() => setShowAdvancedSearch(false)}
          className="text-blue-500 hover:text-blue-600 text-sm ml-4"
        >
          Retour à la recherche simple
        </button>
      </div>
    );
  };

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">Erreur lors du chargement des livres: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Découvrir des Livres</h1>
      
      <div className="mb-6">
        {renderSearchSection()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {loading ? (
          [...Array(8)].map((_, index) => (
            <BookSkeleton key={index} />
          ))
        ) : (
          books.map((book: Book) => {
            const coverId = book.cover_i || book.cover_id;
            const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;

            return (
              <div
                key={book.key}
                className="bg-gray-50 rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer"
                onClick={() => handleBookClick(book.key)}
              >
                {coverUrl ? (
                  <img 
                    src={coverUrl}
                    alt={`Couverture de ${book.title}`}
                    className="w-36 h-52 object-cover rounded-md mb-4 shadow-sm"
                  />
                ) : (
                  <div className="w-36 h-52 bg-gray-200 flex items-center justify-center rounded-md mb-4 shadow-sm">
                    <span className="text-gray-500 text-sm">Pas de couverture</span>
                  </div>
                )}
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h2>
                <p className="text-gray-600 text-sm">
                  {book.author_name?.join(', ') || book.authors?.map((author: BookAuthor) => author.name).join(', ') || 'Auteur inconnu'}
                </p>
                {book.first_publish_year && (
                  <p className="text-gray-500 text-xs mt-1">Publié en {book.first_publish_year}</p>
                )}
                {book.language && (
                  <p className="text-gray-500 text-xs mt-1">Langue: {book.language.join(', ')}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookPage;
