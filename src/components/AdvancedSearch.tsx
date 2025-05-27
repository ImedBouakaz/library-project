import React, { useState } from 'react';

export interface SearchFilters {
  query: string;
  language?: string;
  year?: string;
  hasCovers?: boolean;
  type?: string;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    language: '',
    year: '',
    hasCovers: false,
    type: ''
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recherche principale */}
        <div className="md:col-span-2">
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <input
            type="text"
            id="query"
            name="query"
            placeholder="Rechercher des livres..."
            className="w-full border p-2 rounded-md"
            value={filters.query}
            onChange={handleInputChange}
          />
        </div>

        {/* Langue */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Langue
          </label>
          <select
            id="language"
            name="language"
            className="w-full border p-2 rounded-md"
            value={filters.language}
            onChange={handleInputChange}
          >
            <option value="">Toutes les langues</option>
            <option value="fre">Français</option>
            <option value="eng">Anglais</option>
            <option value="spa">Espagnol</option>
            <option value="ger">Allemand</option>
          </select>
        </div>

        {/* Année */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Année de publication
          </label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Année de publication"
            className="w-full border p-2 rounded-md"
            value={filters.year}
            onChange={handleInputChange}
            min="1000"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Type de document */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type de document
          </label>
          <select
            id="type"
            name="type"
            className="w-full border p-2 rounded-md"
            value={filters.type}
            onChange={handleInputChange}
          >
            <option value="">Tous les types</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="biography">Biographie</option>
            <option value="poetry">Poésie</option>
          </select>
        </div>

        {/* Couverture */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hasCovers"
            name="hasCovers"
            checked={filters.hasCovers}
            onChange={handleInputChange}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="hasCovers" className="text-sm text-gray-700">
            Avec couverture uniquement
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default AdvancedSearch; 