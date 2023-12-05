import { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import AllAlbums from './components/AllAlbums';
import SingleAlbum from './components/SingleAlbum';
import Account from './components/Account';
import Register from './components/Register';
import axios from 'axios';

let API = "http://localhost:3000/api/";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  return (
    <div className='App'>
    <header className="app-header">
      <h1> <img id='comp-img' src='./computer.png'></img>Album Review Project</h1>
      <nav>
        <Link to="/" className="nav-link">Albums</Link>
        <Link to="/account" className="nav-link">My Account</Link>
        <Link to="/login" className="nav-link">Log In</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<AllAlbums />} />
      <Route path="/albums/:id" element={<SingleAlbum />} />
      <Route path="/register" element={<Register token={token} setToken={setToken}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
    </Routes>

    </div>
  );
}

export default App;
