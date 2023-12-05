import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AllAlbums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    let API = 'http://localhost:3000/api/albums';

    try {
      const { data: response } = await Axios.get(`${API}`);
      setAlbums(response); // Assuming the array is directly in the response
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <ul className='albums-container'>
      {albums.length ? (
        albums.map(album => (
          <li key={album.id}>
            <h3>{album.title}</h3>
            <h3>#{album.id}</h3>
            <h3>{album.releasedate}</h3>
            <img src={album.imgurl} />
            <button onClick={() => navigate(`/details/${album.id}`)}>Show Details</button>
          </li>
        ))
      ) : (
        <h2>Loading ...</h2>
      )}
    </ul>
  );
}

export default AllAlbums;
