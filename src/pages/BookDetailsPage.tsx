import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore';
import WikiSection from '../components/WikiSection';

const BookDetailsPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { currentBook, loading, error, fetchBookDetails } = useBookStore();
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const SUBJECTS_LIMIT = 10;

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
    }
  }, [bookId, fetchBookDetails]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 h-72 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 mt-8">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">Une erreur est survenue</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentBook) {
    return (
      <div className="container mx-auto p-6 mt-8">
        <div className="text-center">
          <p className="text-xl font-semibold">Livre non trouvé</p>
        </div>
      </div>
    );
  }

  // Sélectionner la meilleure couverture disponible
  const coverId = currentBook.covers?.[0] || currentBook.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  // Filtrer et limiter les sujets à afficher
  const displayedSubjects = currentBook.subjects 
    ? showAllSubjects 
      ? currentBook.subjects 
      : currentBook.subjects.slice(0, SUBJECTS_LIMIT)
    : [];
  
  const hasMoreSubjects = currentBook.subjects && currentBook.subjects.length > SUBJECTS_LIMIT;

  return (
    <div className="container mx-auto p-6 mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={`Couverture de ${currentBook.title}`}
                className="w-48 h-72 object-cover rounded-lg shadow-md"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.onerror = null;
                  img.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
                }}
              />
            ) : (
              <div className="w-48 h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Pas de couverture</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentBook.title}</h1>
            
            {(currentBook.authors?.length || currentBook.author_name?.length) && (
              <p className="text-xl text-gray-600 mb-4">
                Par {currentBook.authors?.map(author => author.name).join(', ') || currentBook.author_name?.join(', ')}
              </p>
            )}

            {currentBook.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {typeof currentBook.description === 'string' 
                    ? currentBook.description 
                    : currentBook.description.value}
                </p>
              </div>
            )}

            {currentBook.wikiInfo && <WikiSection wikiInfo={currentBook.wikiInfo} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentBook.first_publish_year && (
                <div>
                  <h3 className="font-semibold text-gray-900">Année de publication</h3>
                  <p className="text-gray-600">{currentBook.first_publish_year}</p>
                </div>
              )}

              {currentBook.publishers && currentBook.publishers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900">Éditeurs</h3>
                  <p className="text-gray-600">{currentBook.publishers.join(', ')}</p>
                </div>
              )}

              {displayedSubjects.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900">Sujets</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {displayedSubjects.map((subject, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  {hasMoreSubjects && (
                    <button
                      onClick={() => setShowAllSubjects(!showAllSubjects)}
                      className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {showAllSubjects ? 'Voir moins' : `Voir ${currentBook.subjects!.length - SUBJECTS_LIMIT} sujets de plus`}
                    </button>
                  )}
                </div>
              )}

              {currentBook.number_of_pages && (
                <div>
                  <h3 className="font-semibold text-gray-900">Nombre de pages</h3>
                  <p className="text-gray-600">{currentBook.number_of_pages}</p>
                </div>
              )}

              {(currentBook.isbn_13 || currentBook.isbn_10) && (
                <div>
                  <h3 className="font-semibold text-gray-900">ISBN</h3>
                  <p className="text-gray-600">
                    {currentBook.isbn_13?.[0] || currentBook.isbn_10?.[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
