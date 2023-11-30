import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";

let API = "http://localhost:3000/api/";

function AlbumReviews() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {}, []);

  async function handleSubmit() {
    // Implement your logic to submit the review data
    console.log("Rating:", rating);
    console.log("Comment:", comment);

    const postData = {
      userId: 1, // Get real userID. Need log in.
      albumId: id,
      rating: rating,
      comment: comment,
      reviewDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${API}/reviews`, postData);

      if (response.status >= 200 && response.status < 300) {
        navigate(`/albums/${id}`);
      }
    } catch (err) {
      console.error("Unable to find that review: ", err.message);
    }
  }

  return (
    <div className="reviews-form">
      <div className="p-field">
        <label htmlFor="rating">Rating: </label>
        <Rating
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.value ?? 0)}
          cancel={false}
        />
      </div>
      <div className="p-field">
        <label htmlFor="comment">Review: </label>
        <InputText
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="p-field">
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default AlbumReviews;
