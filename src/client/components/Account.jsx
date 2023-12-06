import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [userId]);

  async function fetchComments() {
    let API = `http://localhost:3000/api/users/details/${userId}`;

    try {
      const { data: response } = await axios.get(API);
      setComments(response.comments);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className='account-content-container'>
      <h1>Account Info</h1>
      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <h3>{comment.content}</h3>
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