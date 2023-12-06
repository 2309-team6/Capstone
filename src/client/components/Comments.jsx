import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";

let API = "http://localhost:3000/api/";

function Comments() {
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const { id, reviewId } = useParams();

  useEffect(() => {}, []);

  async function handleSubmit() {
    const postData = {
      userId: 1, // Get real userID. Need log in.
      reviewId: reviewId,
      content: comment,
    };

    try {
      const response = await axios.post(`${API}/comments`, postData);

      if (response.status >= 200 && response.status < 300) {
        navigate(`/albums/${id}`);
      }
    } catch (err) {
      console.error("Unable to submit that comment: ", err.message);
    }
  }

  return (
    <div className="reviews-form">
      <div className="p-field">
        <label htmlFor="comment">Comment: </label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </div>
      <div className="p-field">
        <button label="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comments;
