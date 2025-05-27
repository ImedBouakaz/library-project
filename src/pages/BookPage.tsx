import React, { useEffect, useState } from 'react';
import useBookStore from '../store/useBookStore';
import type { BookWork } from '../store/useBookStore';
import Searchbar from '../components/searchbar';
import BookSkeleton from '../components/BookSkeleton';

const BookPage = () => {
  const { books, loading, error, fetchBooks } = useBookStore();
  const [authorFilter, setAuthorFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  useEffect(() => {
    fetchBooks({ query: 'programming' });
  }, [fetchBooks]);

  const handleSearch = (query: string) => {
    fetchBooks({ query, author: authorFilter, subject: subjectFilter });
  };

  const handleAuthorFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorFilter(event.target.value);
  };

  const handleSubjectFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectFilter(event.target.value);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {[...Array(8)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">Erreur lors du chargement des livres: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Découvrir des Livres</h1>
      <Searchbar onSearch={handleSearch} />

      <div className="mt-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author-filter" className="block text-sm font-medium text-gray-700">Auteur:</label>
          <input
            type="text"
            id="author-filter"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={authorFilter}
            onChange={handleAuthorFilterChange}
            placeholder="Filtrer par auteur..."
          />
        </div>
        <div>
          <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700">Sujet:</label>
          <input
            type="text"
            id="subject-filter"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={subjectFilter}
            onChange={handleSubjectFilterChange}
            placeholder="Filtrer par sujet..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {books.map((book: BookWork) => {
          const coverId = book.cover_i || book.cover_id;
          const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;

          return (
            <div key={book.key} className="bg-gray-50 rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
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
              <p className="text-gray-600 text-sm">{book.author_name?.join(', ') || book.authors?.map(author => author.name).join(', ') || 'Auteur inconnu'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookPage;
