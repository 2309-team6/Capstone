import React, { useState, useEffect } from 'react';

function FilteredAlbums({ albums, searchTerm }) {
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term) => {
    const filtered = filterAlbums(term, albums);
    setFilteredAlbums(filtered);
  };

  function filterAlbums(searchTerm, albums) {
    const filtered = albums.filter((album) => {
      const titleLower = album.title.toLowerCase();
      const artistLower = album.artist.toLowerCase();
      const genreLower = album.genre.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return (
        titleLower.includes(searchTermLower) ||
        artistLower.includes(searchTermLower) ||
        genreLower.includes(searchTermLower)
      );
    });

    return filtered;
  }

  return (
    <ul className="albums-container">
      {filteredAlbums.map((album) => (
        <li key={album.id}>
          <h3>{album.title}</h3>
          <h3>#{album.id}</h3>
          <h3>{album.releasedate}</h3>
          <img src={album.imgurl} alt={album.title} />
        </li>
      ))}
    </ul>
  );
}

export default FilteredAlbums;