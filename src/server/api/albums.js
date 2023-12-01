const express = require("express");
const albumRouter = express.Router();

const {getAlbum} = require('../db/albums');

albumRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await getAlbum(req.params.id);
    res.send(album);
  }catch (err) {
    next(err);
  }
});


module.exports = albumRouter;
