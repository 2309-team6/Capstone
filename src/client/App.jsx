import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AllAlbums from "./components/AllAlbums";
import SingleAlbum from "./components/SingleAlbum";
import Account from "./components/Account";
import Register from "./components/Register";
import AlbumReviews from "./components/Reviews";
import Comments from "./components/Comments";
import SearchBar from "./components/SearchBar";
import AdminFooter from "./components/AdminFooter";
import AddAlbum from "./components/AddAlbum";
import axios from "axios";
import AdminUsers from "./components/AdminUsers";

let API = "http://localhost:3000/api/";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    fetchUser();
  }, [token]);

  function filterAlbums(searchTerm, albums) {
    const filtered = albums.filter((album) => {
      const titleLower = album.title.toLowerCase();
      const artistLower = album.artist.toLowerCase();
      const genreLower = album.genre.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return (
        titleLower.includes(searchTermLower) ||
        artistLower.includes(searchTermLower) ||
        genreLower.includes(searchTermLower)
      );
    });

    setFilteredAlbums(filtered);
    return filtered;
  }

  async function fetchUser() {
    try {
      const { data: json } = await axios.get(`${API}/users/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(json);
    } catch (err) {
      console.error("Unable to retrieve user.", err.message);
    }
  }

  function isAdmin() {
    return user?.role === "ADMIN";
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>
          {" "}
          <img id="comp-img" src="/computer.png"></img>Album Reviews
        </h1>
        <nav>
          <Link to="/" className="nav-link">
            Albums
          </Link>
          <Link to="/account" className="nav-link">
            My Account
          </Link>
          <Link to="/login" className="nav-link">
            Log In
          </Link>
        </nav>
        <SearchBar
          onSearch={(searchTerm) => filterAlbums(searchTerm, albums)}
          albums={albums}
        />
      </header>
      {isAdmin() ? <AdminFooter token={token} user={user} /> : <></>}

      <Routes>
        <Route
          path="/"
          element={
            <AllAlbums
              albums={albums}
              setAlbums={setAlbums}
              filteredAlbums={filteredAlbums}
            />
          }
        />
        <Route path="/albums/:id" element={<SingleAlbum token={token} />} />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/account" element={<Account token={token} />} />
        <Route
          path="/albums/:id/reviews"
          element={<AlbumReviews token={token} user={user} />}
        />
        <Route
          path="/albums/:id/reviews/:reviewId/comments"
          element={<Comments token={token} user={user} />}
        />
        <Route
          path="/admin/album"
          element={<AddAlbum token={token} user={user} />}
        />
        <Route
          path="/admin/users"
          element={<AdminUsers token={token} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;
