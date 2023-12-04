const express = require("express");
const commentRouter = express.Router();

const {createComment, deleteComment, getComments } = require('../db/comments');

//get all comments
commentRouter.get('/', async (req, res, next) => {
  try {
    const comments = await getComments();
    res.send(comments);
  } catch (err) {
    next(err);
  }
});


module.exports = commentRouter;
