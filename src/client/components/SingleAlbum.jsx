import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [album, setAlbum] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleAlbum();
    fetchReviews();
  }, []);

  async function fetchUserById(id) {
    try {
      const { data: json } = await axios.get(`${API}/users/info/${id}`);
      return json;
    } catch (err) {
      console.error("Unable to find that user: ", err.message);
    }
  }

  async function fetchSingleAlbum() {
    try {
      const { data: json } = await axios.get(`${API}/albums/${id}`);

      setAlbum(json);
    } catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }

  async function fetchReviews() {
    try {
      const { data: json } = await axios.get(`${API}/reviews/${id}`);

      setReviews(json);
    } catch (err) {
      console.error("Unable to find reviews: ", err.message);
    }
  }

  async function onCommentClick(reviewId) {
    navigate(`/albums/${id}/reviews/${reviewId}/comments`);
  }

  function redirectToReview() {
    event.preventDefault();
    navigate(`/albums/${id}/reviews`);
  }

  return (
    <div className="single-album">
      <div className="single-album-img">
        <img src={album.imgurl} />
      </div>
      <div className="album-info">
        <h1>{album.title}</h1>
        <h3>By: {album.artist}</h3>
        <h4>Genre: {album.genre}</h4>
        <h4>Release Date: {album.releasedate}</h4>
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
      {reviews.map((review) => {
        return (
          <div className="review-info" key={review.id}>
            <div>
              <h4>Rating: </h4>
              <Rating
                id="rating"
                value={review.rating}
                readOnly
                cancel={false}
              />
            </div>
            <p>Review: {review.comment}</p>
            <p>Review Date: {review.reviewdate}</p>
            <button
              value={review.id}
              onClick={(event) => onCommentClick(event.target.value)}
            >
              Comment
            </button>
            {review.comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <h4>{comment.userid}</h4>
                  <p>{comment.content}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SingleAlbum;
