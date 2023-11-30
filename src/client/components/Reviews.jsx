import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";
import { Rating } from 'primereact/rating';

let API = "http://localhost:3000/api/";

function AlbumReviews() {
  const [review, setReview] = useState([]); 

  const { id } = useParams(); 

  useEffect(() => {
 
  }, []);

  async function postAlbumReview() {

    const postData = {

    }

    const postUrl = {

    }

    try{
   
  
    }
    catch (err) {
      console.error("Unable to find that review: ", err.message);
    }
  }


  return (
    <div className="album-reviews">
      <div class="rating-box">
        <header>Your Rating: </header>
        <div class="stars">
          <Rating cancel={false} />
        </div>
        <input type="text" placeholder="Your Review..." />
        <button>Submit</button>
      </div>

    </div>
  );
}

export default AlbumReviews