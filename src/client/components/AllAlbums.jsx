import { useState, useEffect } from "react"
import axios from "axios"

let API = "http://localhost:3000/api/";

function AllAlbums() {
  const [count, setCount] = useState(0);

  return (
    <h1>All Albums</h1>
  );
}

export default AllAlbums