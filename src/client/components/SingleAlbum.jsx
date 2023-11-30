import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [album, setAlbum] = useState({});
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      comment: "I love this album",
      reviewdate: new Date.now.toString()
    }
  ]); 

  const { id } = useParams(); 

  useEffect(() => {
    fetchSingleAlbum();
  }, []);

  async function fetchSingleAlbum() {

    try{
   
      const { data: json } = await axios.get(`${API}/albums/${id}`); 
      
      setAlbum(json); 

      // console.log("API Response: ", json);
      // console.log("Returns: ",json.album);
    }
    catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }

  // TO DO: Add - Reviews & Comments
  // Create a Review component with form/submit.
  
  async function fetchReviews() {
    try {
      const { data:json } = await axios.get(`${API}/reviews/${id}`);

      setReviews(json);
    }
    catch (err) {
      console.error("Unable to find reviews: ", err.message);
    }
  }
  
  /*
  async function fetchComments() {
    try {

    }
    catch (err) {
      console.error("Unable to find comments: ", err.message);
    }
  }
  */

  return (
    <div className="single-album">
          <h1>Single Album</h1>

          <h2>{album.title}</h2>
          <h3>By: {album.artist}</h3>
          <h2>Genre: {album.genre}</h2>
          <h2>Release Date: {album.releasedate}</h2>
          <img src={album.imgurl} />

    </div>
  );
}

export default SingleAlbum