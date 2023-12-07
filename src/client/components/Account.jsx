import React, { useState, useEffect } from "react";
import axios from "axios";


function Account({token}) {
  const [user, setUser] = useState({})
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    let API = `http://localhost:3000/api/users/info`;
    if (token) {
      try { const response = await fetch(`${API}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        const result = await response.json();
        console.log(result);
        setUser(result)
        console.log(result.reviews)
        setReviews(result.reviews)
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log('fetchReviewsElseMessage - no token dawg!')
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
