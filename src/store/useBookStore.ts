import { create } from 'zustand';

export interface BookAuthor {
  name: string;
}

export interface BookWork {
  key: string;
  title: string;
  authors?: BookAuthor[];
  cover_id?: number;
}

interface BookStoreState {
  books: BookWork[];
  loading: boolean;
  error: string | null;
}

interface BookStoreActions {
  fetchBooks: (subject: string) => Promise<void>;
}

type BookStore = BookStoreState & BookStoreActions;

const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async (subject) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/openlibrary-api/subjects/${subject}.json`, {
        headers: {
          'User-Agent': 'LibrairieApp/1.0 (contact@example.com)'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: { works: BookWork[] } = await response.json();
      set({ books: data.works, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
