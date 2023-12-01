import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "primereact/rating";

let API = "http://localhost:3000/api/";

function SingleAlbum(props) {
  const [album, setAlbum] = useState({});
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [user, setUser] = useState({});
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleAlbum();
    fetchReviews();
    fetchUser();
  }, []);

  async function fetchSingleAlbum() {
    try {
      const { data: json } = await axios.get(`${API}/albums/${id}`);

      setAlbum(json);
      setGenre(json.genre);
    } catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }

  async function fetchReviews() {
    try {
      const { data: json } = await axios.get(`${API}/reviews/${id}`);

      setReviews(json);

      getAvgRating(json);
    } catch (err) {
      console.error("Unable to find reviews: ", err.message);
    }
  }

  async function onCommentClick(reviewId) {
    navigate(`/albums/${id}/reviews/${reviewId}/comments`);
  }

  async function onDelete(albumId) {
    const response = await axios.delete(`${API}/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${props?.token}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      navigate("/");
    }
  }

  async function fetchUser() {
    try {
      const { data: json } = await axios.get(`${API}/users/info`, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });
      setUser(json);
    } catch (err) {
      console.error("Unable to retrieve user.", err.message);
    }
  }

  async function onSaveAlbum(id) {
    try {
      const albumToUpdate = {
        title: album.title,
        artist: album.artist,
        genre: genre,
        releaseDate: album.releasedate,
        imgUrl: album.imgurl,
      };
      const response = await axios.patch(`${API}/albums/${id}`, albumToUpdate, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      }
    } catch (err) {
      console.error("Unable to update album.", err.message);
    }
  }

  function getAvgRating(reviews) {
    if (reviews.length === 0) {
      return 0;
    }
    const sumReviews = reviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0);
    const averageRating = sumReviews / reviews.length;
    setAvgRating(averageRating.toFixed(2));
  }

  function redirectToReview() {
    event.preventDefault();
    navigate(`/albums/${id}/reviews`);
  }

  function isAdmin() {
    return user.role === "ADMIN";
  }

  return (
    <div className="single-album">
      <div className="single-album-img">
        <img src={album.imgurl} />
      </div>
      <div className="album-info">
        <h1 className="album-title">{album.title}</h1>
        <h2 className="album-artist">By: {album.artist}</h2>
        <h3 className="album-rating">Average Rating: {avgRating}</h3>

        {isAdmin() ? (
          <div className="genre-edit">
            <label>Genre: </label>
            <input
              value={genre}
              className="edit-input"
              onChange={(event) => setGenre(event.target.value)}
            ></input>
            <button onClick={() => onSaveAlbum(album.id)}>Save Changes</button>
          </div>
        ) : (
          <h4 className="album-genre">Genre: {album.genre}</h4>
        )}

        <h4 className="album-date">Release Date: {album.releasedate}</h4>

        {isAdmin() ? (
          <button onClick={() => onDelete(album.id)}>Delete Album</button>
        ) : (
          <></>
        )}
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
            {/* <p>Name: {review.userid}</p> */}
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
