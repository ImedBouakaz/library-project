import React, { useState } from 'react';

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <input
        type="text"
        placeholder="Rechercher des livres..."
        className="border p-2 rounded-md w-full"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleSearchClick}
      >
        Rechercher
      </button>
    </div>
  );
};

export default Searchbar;
