const db = require("./client");

const createComment = async ({ content, reviewId, userId }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
      INSERT INTO usercomments(content, reviewid, userid)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [content, reviewId, userId]
    );

    return comment;
  } catch (err) {
    console.error("Unable to create comment. ", err.message);
    throw err;
  }
};

module.exports = { createComment };
