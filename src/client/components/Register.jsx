import { useState } from "react"
import axios from "axios"

let API = "http://localhost:3000/api/";

function Register() {
  const [count, setCount] = useState(0);

  return (
    <h1>Register User</h1>
  );
}

export default Register