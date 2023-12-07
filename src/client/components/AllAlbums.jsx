
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import SearchBar from '../components/SearchBar';
import FilteredAlbums from '../components/FilteredAlbums';

function AllAlbums({ albums, setAlbums, filteredAlbums }) {
  const navigate = useNavigate();
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    let API = "http://localhost:3000/api/albums";

    try {
      const { data: response } = await Axios.get(`${API}`);
      setAlbums(response);
      setOriginalAlbums(response); // Save the original Album list
    } catch (err) {
      console.error(err.message);
    }
  }


  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (term) {
      try {
        const { data: response } = await Axios.get(`http://localhost:3000/api/albums?search=${term}`);
        setAlbums(response);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // If no search term, revert to the original list
      setAlbums(originalAlbums);
    }
  };

  const handleShowAll = () => {
    setSearchTerm('');
    fetchAlbums();
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleShowAll}>Show All</button>
      {searchTerm ? (
        <FilteredAlbums albums={albums} searchTerm={searchTerm} />
      ) : (
        <ul className='albums-container'>
          {albums.length ? (
            albums.map((album) => (
              <li key={album.id}>
                <h3>{album.title}</h3>
                <h3>#{album.id}</h3>
                <h3>{album.releasedate}</h3>
                <img src={album.imgurl} alt={album.title} />
                <button onClick={() => navigate(`/albums/${album.id}`)}>Show Details</button>
              </li>
            ))
          ) : (
            <h2>Loading ...</h2>
          )}
        </ul>
      )}
    </div>

  async function onNavigate(albumId) {
    event.preventDefault();
    navigate(`/albums/${albumId}`);
  }

  return (
    <ul className="albums-container">
      {(filteredAlbums.length ? filteredAlbums : albums).map((album) => (
        <li key={album.id} className="all-albums-details">
          <h2>{album.title}</h2>
          {/* <h3>#{album.id}</h3> */}
          <h3>{album.artist}</h3>
          {/* <h3>{album.releasedate}</h3> */}
          <img src={album.imgurl} alt={album.title} className="all-album-img" />
          <button onClick={() => onNavigate(album.id)}>Show Details</button>
        </li>
      ))}
    </ul>
  );
}

export default AllAlbums;
