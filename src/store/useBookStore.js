import { create } from 'zustand';

const useBookStore = create((set) => ({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async (subject) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`https://openlibrary.org/subjects/${subject}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ books: data.works, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
