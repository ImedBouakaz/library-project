import { create } from 'zustand';
import type { SearchFilters } from '../components/AdvancedSearch';

export interface BookAuthor {
  key: string;
  name: string;
}

export interface WikiInfo {
  extract?: string;
  url?: string;
  thumbnail?: string;
  categories?: string[];
  langlinks?: { [key: string]: string };
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
  edition_count?: number;
  ia?: string[];
  has_fulltext?: boolean;
}

export interface BookDetails extends Book {
  description?: string | { value: string };
  subjects?: string[];
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  isbn_13?: string[];
  isbn_10?: string[];
  covers?: number[];
  wikiInfo?: WikiInfo;
}

interface BookStore {
  books: Book[];
  currentBook: BookDetails | null;
  loading: boolean;
  error: string | null;
  fetchBooks: (filters: SearchFilters | string) => Promise<void>;
  fetchBookDetails: (key: string) => Promise<void>;
}

const OPEN_LIBRARY_API = 'https://openlibrary.org';

const useBookStore = create<BookStore>((set) => ({
  books: [],
  currentBook: null,
  loading: false,
  error: null,
  
  fetchBooks: async (filters: SearchFilters | string) => {
    set({ loading: true, error: null });
    try {
      let searchQuery = '';

      if (typeof filters === 'string') {
        // Recherche simple
        searchQuery = filters;
      } else {
        // Recherche avancée
        const searchTerms = [];
        
        if (filters.query) {
          searchTerms.push(filters.query);
        }
        
        if (filters.language) {
          searchTerms.push(`language:${filters.language.toLowerCase()}`);
        }
        
        if (filters.year) {
          // Utilisation du format correct pour la recherche par année
          searchTerms.push(`first_publish_year:${filters.year}`);
        }
        
        if (filters.type) {
          searchTerms.push(`subject:${filters.type.toLowerCase()}`);
        }

        if (filters.hasCovers) {
          searchTerms.push('has_cover:true');
        }

        searchQuery = searchTerms.join(' ');
      }

      const url = new URL('/search.json', OPEN_LIBRARY_API);
      url.searchParams.append('q', searchQuery);
      url.searchParams.append('fields', 'key,title,author_name,cover_i,language,first_publish_year,subject,edition_count,has_fulltext,ia');
      url.searchParams.append('limit', '20');

      console.log('URL de recherche:', url.toString());
      console.log('Termes de recherche:', searchQuery);

      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse de l\'API:', data);
      
      if (!data.docs || data.docs.length === 0) {
        set({ 
          error: "Aucun livre trouvé pour cette recherche", 
          loading: false,
          books: []
        });
        return;
      }

      const books = data.docs.map((doc: any): Book => ({
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name,
        cover_i: doc.cover_i,
        language: doc.language,
        first_publish_year: doc.first_publish_year,
        subject: doc.subject,
        edition_count: doc.edition_count,
        has_fulltext: doc.has_fulltext,
        ia: doc.ia
      }));

      set({ books, loading: false, error: null });
    } catch (error: any) {
      console.error('Erreur lors de la recherche:', error);
      set({ 
        error: `Erreur lors de la recherche : ${error.message}`, 
        loading: false,
        books: []
      });
    }
  },

  fetchBookDetails: async (key: string) => {
    set({ loading: true, error: null });
    try {
      const cleanKey = key.replace('/works/', '');
      const bookUrl = new URL(`/works/${cleanKey}.json`, OPEN_LIBRARY_API);
      
      const bookResponse = await fetch(bookUrl.toString(), {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!bookResponse.ok) {
        throw new Error(`HTTP error! status: ${bookResponse.status}`);
      }

      const bookData = await bookResponse.json();

      let authors: BookAuthor[] = [];
      if (bookData.authors) {
        const authorPromises = bookData.authors.map(async (author: { author: { key: string } }) => {
          const authorKey = author.author.key.replace('/authors/', '');
          const authorUrl = new URL(`/authors/${authorKey}.json`, OPEN_LIBRARY_API);
          const authorResponse = await fetch(authorUrl.toString(), {
            headers: {
              'Accept': 'application/json'
            }
          });

          if (authorResponse.ok) {
            const authorData = await authorResponse.json();
            return {
              key: authorData.key,
              name: authorData.name
            };
          }
          return null;
        });

        authors = (await Promise.all(authorPromises)).filter((author): author is BookAuthor => author !== null);
      }

      let wikiInfo: WikiInfo | undefined;
      try {
        // Construire une requête plus précise pour Wikipédia
        const searchTerm = `${bookData.title} ${authors.length > 0 ? authors[0].name : ''} livre`;
        const wikiUrl = new URL('https://fr.wikipedia.org/w/api.php');
        wikiUrl.searchParams.append('action', 'query');
        wikiUrl.searchParams.append('format', 'json');
        wikiUrl.searchParams.append('prop', 'extracts|info|pageimages|categories|langlinks');
        wikiUrl.searchParams.append('exintro', '1');
        wikiUrl.searchParams.append('explaintext', '1');
        wikiUrl.searchParams.append('inprop', 'url');
        wikiUrl.searchParams.append('pithumbsize', '300');
        wikiUrl.searchParams.append('clshow', '!hidden');
        wikiUrl.searchParams.append('cllimit', '10');
        wikiUrl.searchParams.append('lllimit', '10');
        wikiUrl.searchParams.append('generator', 'search');
        wikiUrl.searchParams.append('gsrnamespace', '0');
        wikiUrl.searchParams.append('gsrlimit', '1');
        wikiUrl.searchParams.append('gsrsearch', searchTerm);
        wikiUrl.searchParams.append('origin', '*');

        const wikiResponse = await fetch(wikiUrl.toString());
        
        if (wikiResponse.ok) {
          const wikiData = await wikiResponse.json();
          if (wikiData.query && wikiData.query.pages) {
            const pages = wikiData.query.pages;
            const pageId = Object.keys(pages)[0];
            const page = pages[pageId];
            
            if (pageId !== '-1') {
              wikiInfo = {
                extract: page.extract,
                url: page.fullurl,
                thumbnail: page.thumbnail?.source,
                categories: page.categories?.map((cat: { title: string }) => 
                  cat.title.replace('Catégorie:', '')),
                langlinks: page.langlinks?.reduce((acc: { [key: string]: string }, link: { lang: string; url: string }) => {
                  acc[link.lang] = link.url;
                  return acc;
                }, {})
              };
            }
          }
        }
      } catch (wikiError) {
        console.error('Erreur lors de la récupération des informations Wikipedia:', wikiError);
      }

      const enrichedBook: BookDetails = {
        ...bookData,
        authors: authors.length > 0 ? authors : undefined,
        cover_i: bookData.covers ? bookData.covers[0] : undefined,
        covers: bookData.covers,
        wikiInfo
      };

      set({ currentBook: enrichedBook, loading: false });
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du livre:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useBookStore;
