import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [album, setAlbum] = useState({});

  const { id } = useParams(); 

  useEffect(() => {
    fetchSingleAlbum();
  }, []);

  async function fetchSingleAlbum() {

    try{
      const { data: json } = await axios.get(`${API}/albums/${id}`); 
      
      setAlbum(json.album); 
    }
    catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }

  // TO DO: Add - Reviews & Comments

  return (
    <div className="single-album">
          <h1>Single Album</h1>

      {/* {album.title ? (
          <>
            <h2>{album.title}</h2>
            <h3>By: {album.artist}</h3>
            <h2>Genre: {album.genre}</h2>
            <h2>Release Date: {album.releasedate}</h2>

            <img src={album.imgurl} alt={album.title} />
          </>
        ) : (
          <p>Loading...</p>
        )} */}

          {/* <h2>{album.title}</h2>
          <h3>By: {album.artist}</h3>
          <h2>Genre: {album.releasedate}</h2>
          <h2>Release Date: {album.releasedate}</h2>
          <img src={album.imgurl} /> */}
         
    </div>
  );
}

export default SingleAlbum