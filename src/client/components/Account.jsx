import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let API = "http://localhost:3000/api/";

function Account(props) {
  const [user, setUser] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.token) {
      fetchMyAccount();
      // console.log("user.id: ", user.id);
      
    }
  }, [props.token]);

  // async function tokenTest() {
  //   if (props) {
  //     fetchMyAccount();
  //     fetchMyAccountDetails();
  //   }
  // }

  // need this function to initally grab user info (user.id)
  async function fetchMyAccount() {
    try {
      const response = await fetch(`${API}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });

      const json = await response.json();

      console.log("user: ", json);
      setUser(json); //maybe return here?
      // console.log("usestate user: ", user)
      // console.log("user.id: ", user.id)
      if (json.id) {
        fetchMyAccountDetails(json.id);
      }
      
    } catch (error) {
      setError(error.message);
    }
  }

  // use this function with the user.id from other function to grab comment and review data
  async function fetchMyAccountDetails(id) {
    try {
      const response = await fetch(`${API}/users/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });

      const json = await response.json();

      setMyComments(json.comments);
      setMyReviews(json.reviews);
      // json is an object
      console.log("json: ", json);


    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteComment(id) {
    try {
      const response = await fetch(`${API}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
      });
      const json = await response.json();

      fetchMyAccountDetails(user.id);
    } catch (error) {
      setError(error.message);
    }
  }

  async function editComment(id, updatedComment) {
    try {
      const response = await fetch(`${API}/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props?.token}`,
        },
        body: JSON.stringify({
          updatedComment,
        }),
      });

      const json = await response.json();
      console.log("patch request response: ", json);

      fetchMyAccountDetails(user.id);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="account-page-container">
      {error && <p>{error}</p>}

      <h1>Welcome, {user.name}</h1>

      {props.token ? (
        <div>
          <h2>My Comments</h2>
          <ul>
            {myComments.map((comment) => (
              <li key={comment?.id}>
                <h3>{comment.content}</h3>
                <button onClick={() => deleteComment(comment?.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          It seems you are not logged in, click here:{" "}
          <Link to="/login">Login</Link>
        </p>
      )}
    </div>
  );
}

export default Account;
