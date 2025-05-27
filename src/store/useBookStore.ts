import { create } from 'zustand';

export interface BookAuthor {
  name: string;
}

export interface BookWork {
  key: string; // e.g., /works/OL...
  title: string;
  authors?: BookAuthor[]; // Keep for potential use, but search API uses author_name
  author_name?: string[]; // From search API
  cover_id?: number; // From subject API
  cover_i?: number; // From search API
}

interface BookStoreState {
  books: BookWork[];
  loading: boolean;
  error: string | null;
}

interface FetchBooksParams {
  query?: string;
  author?: string;
  subject?: string;
}

interface BookStoreActions {
  fetchBooks: (params: FetchBooksParams) => Promise<void>; // Accept params object
}

type BookStore = BookStoreState & BookStoreActions;

const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async (params) => { // Accept params object
    set({ loading: true, error: null });
    try {
      // Build the query string based on provided parameters
      const searchParams = new URLSearchParams();
      if (params.query) {
        searchParams.append('q', params.query);
      }
      if (params.author) {
        searchParams.append('author', params.author);
      }
      if (params.subject) {
        searchParams.append('subject', params.subject);
      }

      // Construct the final URL
      const url = `/openlibrary-api/search.json?${searchParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'LibrairieApp/1.0 (contact@example.com)' // Replace with your app name and contact info
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: { docs: BookWork[] } = await response.json();
      set({ books: data.docs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
