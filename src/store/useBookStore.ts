import { create } from 'zustand';
import type { SearchFilters } from '../components/AdvancedSearch';

export interface BookAuthor {
  name: string;
}

export interface Book {
  key: string;
  title: string;
  authors?: BookAuthor[];
  author_name?: string[];
  cover_id?: number;
  cover_i?: number;
  language?: string[];
  first_publish_year?: number;
  subject?: string[];
}

interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: (filters: SearchFilters | string) => Promise<void>;
}

const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async (filters: SearchFilters | string) => {
    set({ loading: true, error: null });
    try {
      let url: string;
      let queryParams = new URLSearchParams();

      if (typeof filters === 'string') {
        // Recherche simple par sujet
        url = `/api/subjects/${filters.toLowerCase()}.json`;
      } else {
        // Recherche avancée
        url = `/api/search.json`;
        
        // Paramètre de recherche principal
        queryParams.append('q', filters.query);
        
        // Filtres additionnels
        if (filters.language) {
          queryParams.append('language', filters.language);
        }
        
        if (filters.year) {
          queryParams.append('first_publish_year', filters.year);
        }
        
        if (filters.type) {
          queryParams.append('subject', filters.type.toLowerCase());
        }
      }

      // Construire l'URL finale
      const finalUrl = `${url}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

      const response = await fetch(finalUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Adapter les données selon l'API utilisée
      let books: Book[];
      if (typeof filters === 'string') {
        // Format de réponse pour l'API des sujets
        books = data.works || [];
      } else {
        // Format de réponse pour l'API de recherche
        books = data.docs || [];
      }

      // Filtrer les résultats si nécessaire
      if (typeof filters === 'object' && filters.hasCovers) {
        books = books.filter(book => book.cover_i || book.cover_id);
      }

      set({ books, loading: false });
    } catch (error: any) {
      console.error('Erreur lors de la requête:', error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
