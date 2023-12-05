import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

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
   
      const { data: json } = await axios.get(`${API}/albums/${id}`); 
      
      setAlbum(json); 

      // console.log("API Response: ", json);
      // console.log("Returns: ",json.album);
    }
    catch (err) {
      console.error("Unable to find that album: ", err.message);
    }
  }
  
  // async function fetchReviews() {
  //   try {
  //     const { data:json } = await axios.get(`${API}/reviews/${id}`);

  //     setReview(json);
  //   }
  //   catch (err) {
  //     console.error("Unable to find reviews: ", err.message);
  //   }
  // }
  


  return (
    <div className="album-reviews">
    

    </div>
  );
}

export default AlbumReviews