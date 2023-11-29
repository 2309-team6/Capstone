const db = require("./client");

const createAlbum = async ({ title, artist, genre, releaseDate, imgUrl }) => {
  try {
    const {
      rows: [album],
    } = await db.query(
      `
      INSERT INTO albums(title, artist, genre, releaseDate, imgUrl)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [title, artist, genre, releaseDate, imgUrl]
    );

    return album;
  } catch (err) {
    console.error("Unable to create album. ", err.message);
    throw err;
  }
};

const createAlbumReviews = async ({
  userId,
  albumId,
  rating,
  comment,
  reviewDate,
}) => {
  try {
    const {
      rows: [albumReviews],
    } = await db.query(
      `
      INSERT INTO albumreviews(userId,
        albumId,
        rating,
        comment,
        reviewDate)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [userId, albumId, rating, comment, reviewDate]
    );

    return albumReviews;
  } catch (err) {
    console.error("Unable to create album reviews. ", err.message);
    throw err;
  }
};

// Database Functions
async function getAllAlbums() {
  try {
    const { rows } = await db.query(
      `
      SELECT * 
      FROM albums; 
      `
    );
    return rows;
  } catch (error) {
    console.error("Could not get all albums: ", err.message);
    throw err;
  }
}

module.exports = { createAlbum, createAlbumReviews, getAllAlbums };
