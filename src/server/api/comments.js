const express = require("express");
const commentRouter = express.Router();


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
