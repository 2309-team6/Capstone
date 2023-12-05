import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [album, setAlbum] = useState({});
  const [review, setReview] = useState([]); 
  // const [reviews, setReviews] = useState([
  //   {
  //     rating: 5,
  //     comment: "I love this album",
  //     reviewdate: new Date.now.toString()
  //   }
  // ]); 

  const { id } = useParams(); 

  useEffect(() => {
    fetchSingleAlbum();
    fetchReviews();
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

      setReview(json);
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
      <div className="album-info">
          <h2>{album.title}</h2>
          <h3>By: {album.artist}</h3>
          <h2>Genre: {album.genre}</h2>
          <h2>Release Date: {album.releasedate}</h2>
          <img src={album.imgurl} />
      </div>
    <hr></hr>
    <div className="review-form">
      <h2>Ratings & Reviews</h2>
      <h3>What do you think?</h3>
      <button>Write a Review</button>
    </div>
    <hr></hr>
      <div className="review-info">
        <h3>Rating: {review.rating} </h3>
        <p>Comment: {review.comment}</p>
        <p>Review Date: {review.reviewdate}</p>
      </div>

    </div>
  );
}

export default SingleAlbum