import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  const [reviews, setReviews] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch reviews datas
    axios.get(`${API}reviews`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error('Error fetching reviews:', error));

    // Fetch albums datas
    axios.get(`${API}albums`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error('Error fetching albums:', error));

    // Fetch users datas
    axios.get(`${API}users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="admin-container">
      <h1>Welcome, Admin!</h1>
      <nav>
        <Link to="/admin/reviews" className="nav-link">
          All Reviews
        </Link>
        <Link to="/admin/albums" className="nav-link">
          All Albums
        </Link>
        <Link to="/admin/users" className="nav-link">
          All Users
        </Link>
      </nav>

      <div>
        <h2>All Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              {/* Display review details */}
              {review.title} by {review.user.username}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>All Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {/* Display album details */}
              {album.title} by {album.artist}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {/* Display user details */}
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;