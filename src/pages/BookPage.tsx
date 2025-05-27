import React, { useEffect } from 'react';
import useBookStore from '../store/useBookStore';
import type { BookWork } from '../store/useBookStore';

const BookPage = () => {
  const { books, loading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks('javascript'); // Fetch books related to 'javascript' as an example
  }, [fetchBooks]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement des livres...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Erreur lors du chargement des livres: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Livres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book: BookWork) => {
          const olid = book.key.replace('/works/', '');
          return (
            <div key={book.key} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              {book.cover_id ? (
                <img 
                  src={`https://covers.openlibrary.org/w/olid/${olid}-M.jpg`}
                  alt={`Couverture de ${book.title}`}
                  className="w-32 h-48 object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-gray-500">Pas de couverture</span>
                </div>
              )}
              <h2 className="text-lg font-semibold mb-2 text-center">{book.title}</h2>
              <p className="text-gray-600 text-sm text-center">Auteur(s): {book.authors?.map(author => author.name).join(', ') || 'N/A'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookPage;
