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

async function deleteComment(id) {
  try {
    const { rows } = await db.query(
      "DELETE FROM usercomments WHERE id=$1 RETURNING *",
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

async function getComments() {
  try {
    const { rows } = await db.query(`SELECT * FROM usercomments;`);
    return rows;
  } catch (err) {
    throw err;
  }
}

// async function getCommentsByUserId(){
//   try {
//     const { rows } =
//   } catch (err) {
//     throw err;
//   }
// }

module.exports = { createComment, getComments, deleteComment };

