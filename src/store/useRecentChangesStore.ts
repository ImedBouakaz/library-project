import { create } from 'zustand';

interface Change {
  id: string;
  kind: string;
  author?: {
    key: string;
    name: string;
  } | null;
  timestamp: string;
  comment: string;
  changes: Array<{
    key: string;
    revision: number;
  }>;
}

interface RecentChangesStore {
  changes: Change[];
  loading: boolean;
  error: string | null;
  fetchRecentChanges: (limit?: number) => Promise<void>;
}

const OPEN_LIBRARY_API = 'https://openlibrary.org';

// Types de changements que nous voulons afficher
const RELEVANT_CHANGE_TYPES = [
  'add-book',
  'edit-book',
  'merge-authors',
  'add-cover',
  'create-work',
  'edit-work',
  'create-edition',
  'edit-edition'
];

const useRecentChangesStore = create<RecentChangesStore>((set) => ({
  changes: [],
  loading: false,
  error: null,

  fetchRecentChanges: async (displayLimit = 5) => {
    set({ loading: true, error: null });
    try {
      // On récupère plus de changements pour avoir assez de changements pertinents
      const url = new URL('/recentchanges.json', OPEN_LIBRARY_API);
      url.searchParams.append('limit', '50');

      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Filtrer les changements pertinents
      const relevantChanges = data
        .filter((change: Change) => RELEVANT_CHANGE_TYPES.includes(change.kind))
        .slice(0, displayLimit);

      set({ changes: relevantChanges, loading: false, error: null });
    } catch (error) {
      console.error('Erreur lors de la récupération des changements récents:', error);
      set({ 
        error: `Erreur lors de la récupération des changements récents : ${(error as Error).message}`, 
        loading: false 
      });
    }
  },
}));

export default useRecentChangesStore; 