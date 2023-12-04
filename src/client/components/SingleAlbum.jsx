import { useState, useEffect } from "react"
import axios from "axios"

let API = "http://localhost:3000/api/";

function SingleAlbum() {
  const [count, setCount] = useState(0);

  return (
    <h1>Single Album</h1>
  );
}

export default SingleAlbum