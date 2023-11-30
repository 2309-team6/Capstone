import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [album, setAlbum] = useState({});
  const [review, setReview] = useState([]); 
  const [comments, setComments] = useState({}); 
  const navigate = useNavigate();
  
  const { id } = useParams(); 

  useEffect(() => {
    fetchSingleAlbum();
    fetchReviews();
    fetchComments();
  }, []);

  async function fetchSingleAlbum() {

    try{
   
      const { data: json } = await axios.get(`${API}/albums/${id}`); 
      
      setAlbum(json); 
    }
    catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }

  // TO DO: Add - Reviews & Comments
  
  async function fetchReviews() {
    try {
      const { data:json } = await axios.get(`${API}/reviews/${id}`);

      setReview(json);
    }
    catch (err) {
      console.error("Unable to find reviews: ", err.message);
    }
  }
  
  // /*
  async function fetchComments() {
    try {
      const { data:json } = await axios.get(`${API}/comments/${id}`)

      setComments(json);
    }
    catch (err) {
      console.error("Unable to find comments: ", err.message);
    }
  }
  // */

  function redirectToReview() {
    event.preventDefault();
    navigate("/reviews");  
  }

  return (
    <div className="single-album">
      <div className="album-info">
          <h1>{album.title}</h1>
          <h3>By: {album.artist}</h3>
          <h4>Genre: {album.genre}</h4>
          <h4>Release Date: {album.releasedate}</h4>
          <img src={album.imgurl} />
      </div>
    <hr></hr>
    <div className="review-redirect">
      <h2>Ratings & Reviews</h2>
      <h3>What do you think?</h3>
      <div className="review-button">
      <button onClick={redirectToReview}>Write a Review</button>
      </div>
    </div>
    <hr></hr>
      <div className="review-info">
        <h4>Rating: {review.rating} </h4> {/* How do I connect this to my star rating? */}
        <p>Comment: {review.comment}</p>
        <p>Review Date: {review.reviewdate}</p>
        <button>Comment</button>
        {/* Need to display comments + responses under the reviews. */}
      </div>

    </div>
  );
}

export default SingleAlbum