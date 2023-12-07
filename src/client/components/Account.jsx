import React, { useState, useEffect } from "react";
import axios from "axios";


function Account({user}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    let API = `http://localhost:3000/api/users/details/${user}`;

    try {
      const { data: response } = await axios.get(API);
      setComments(response.reviews);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className='account-content-container'>
      <h1>Account Info</h1>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.content}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Reviews Yet...</h2>
      )}
    </div>
  );
}

export default Account;
