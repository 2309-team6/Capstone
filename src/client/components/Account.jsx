import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

let API = "http://localhost:3000/api/";

function Account(props) {

  const [user, setUser] = useState({})
  const [myComments, setMyComments] = useState([])
  const [myReviews, setMyReviews] = useState([])

  const [error, setError] = useState(null)

  useEffect (() => {
      // tokenTest()
      if (props) {
        fetchMyAccount();
        console.log("user.id: ", user.id)
        fetchMyAccountDetails(user.id);
      }
    
  }, [token])


  async function tokenTest (){
    if(props){
      fetchMyAccount()
      fetchMyAccountDetails()
    }
  }

  // need this function to initally grab user info (user.id)
  async function fetchMyAccount(){
    try {

      const response = await fetch (`${API}/users/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await response.json()

      console.log("user: ", json)
      setUser(json) //maybe return here?
      
    } catch(error) {
      setError(error.message)
    }
  }

  // use this function with the user.id from other function to grab comment and review data
  async function fetchMyAccountDetails(id){
    try {

      const response = await fetch (`${API}/users/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await response.json()
      
      setMyComments(json.comments)
      setMyReviews(json.reviews)

      console.log("json: ", json)
      console.log("json.comments: ", myComments)
      console.log("json.reviews: ", myReviews)
      
    } catch(error) {
      setError(error.message)
    }
  }

  async function deleteComment(id) {
    try{

      const response = await fetch(`${API}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()
      
      fetchMyAccountDetails()

    } catch(error) {
      setError(error.message)
    }
  }

  async function editComment(id){
    try{
      const response = await fetch (`${API}/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          updatedComment,
        })
      })

      const json = await response.json()
      console.log("patch request response: ", json)
   
      fetchMyAccountDetails()

    }catch(error){
      console.error(error.message)
    }

  }


  return (

    <div className='account-page-container'>

      {error && <p>{error}</p>}
       
          <h1>Welcome, {user.name}</h1>
          
          {token ? 
            <div>
              <h2>My Comments</h2>
            
              <ul>
                {myComments.map(comment=>(
                  <li key = {comment?.id}>
                    <h3>{comment}</h3>
                    <button onClick={() => deleteComment(comment?.id)}>Delete</button>
                    <button onClick={() => editComment(comment?.id)}>Edit</button>
                  </li>
               ))}
              </ul>

            </div>
            :
            <p>It seems you are not logged in, click here: <Link to='/login'>Login</Link></p>
          }

    </div>

  );
}

export default Account;
