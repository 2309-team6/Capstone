import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AllAlbums({ albums, setAlbums, filteredAlbums }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, [setAlbums]);

  async function fetchAlbums() {
    let API = 'http://localhost:3000/api/albums';

    try {
      const { data: response } = await Axios.get(`${API}`);
      setAlbums(response); // update the state 
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <ul className='albums-container'>
      {(filteredAlbums.length ? filteredAlbums : albums).map(album => (
        <li key={album.id}>
          <h3>{album.title}</h3>
          <h3>#{album.id}</h3>
          <h3>{album.releasedate}</h3>
          <img src={album.imgurl} alt={album.title} />
          <button onClick={() => navigate(`/albums/${album.id}`)}>Show Details</button>
        </li>
      ))}
    </ul>
  );
}


export default AllAlbums;