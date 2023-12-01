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
import axios from "axios";

let API = "http://localhost:3000/api/";

function App() {
  const [token, setToken] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  // console.log("All Albums:", albums);

  // console.log("Filtered Albums:", filteredAlbums);

  function filterAlbums(searchTerm, albums) {
    // console.log('Filtering with search term:', searchTerm);
    // console.log(albums);

    const filtered = albums.filter((album) => {
      const titleLower = album.title.toLowerCase();
      const artistLower = album.artist.toLowerCase();
      const genreLower = album.genre.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      // test to see what the term is comparing to
      // console.log('Comparing:', titleLower, artistLower, genreLower, 'with', searchTermLower);
      // console.log(titleLower.includes(searchTermLower), artistLower.includes(searchTermLower), genreLower.includes(searchTermLower));

      return (
        titleLower.includes(searchTermLower) ||
        artistLower.includes(searchTermLower) ||
        genreLower.includes(searchTermLower)
      );
    });

    // console.log('Filtered Albums:', filtered);
    setFilteredAlbums(filtered);
    return filtered;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>
          {" "}
          <img id="comp-img" src="/computer.png"></img>Album Review Project
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
          element={<AlbumReviews token={token} />}
        />
        <Route
          path="/albums/:id/reviews/:reviewId/comments"
          element={<Comments token={token} />}
        />
      </Routes>

      <AdminFooter token={token} />
    </div>
  );
}

export default App;
