const express = require("express");
const albumRouter = express.Router();

const { getAlbum, deleteAlbumById } = require("../db/albums");
const { getAllAlbums } = require("../db/albums");
const { isLoggedIn } = require("./roles");

// GET /api/albums/:id
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

// DELETE /api/albums/:id
albumRouter.delete("/:id", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const deletedAlbum = await deleteAlbumById(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not Found" });
    }
    res.json({
      message: "Album deleted Successfully",
      comment: deletedAlbum,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = albumRouter;
