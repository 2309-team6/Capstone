const express = require("express");
const albumRouter = express.Router();

const { getAlbum } = require("../db/albums");
const { getAllAlbums } = require("../db/albums");

albumRouter.get("/:id", async (req, res, next) => {
  try {
    const album = await getAlbum(req.params.id);
    res.send(album);
  } catch (err) {
    next(err);
  }
});

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
