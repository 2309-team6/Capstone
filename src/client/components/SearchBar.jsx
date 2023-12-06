import React, { useState } from 'react';

function SearchBar({ onSearch, albums }) {
  const [searchTerm, setSearchTerm,] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm, albums);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;