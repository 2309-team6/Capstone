const express = require("express");
const albumRouter = express.Router();

const { getAllAlbums } = require("../db/albums");

// GET /api/albums/
albumRouter.get("/", async (req, res, next) => {
  try {
    const albums = await getAllAlbums();
    res.send(albums);
  } catch (error) {
    console.error("Could not get all albums: ", err.message);
    throw err;
  }
});

module.exports = albumRouter;
