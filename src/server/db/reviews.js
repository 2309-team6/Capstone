const db = require("./client")

async function getReviews() {
    try {
        const { rows } = await db.query(`SELECT * FROM albumReviews;`)
        return rows;
    } catch (err) {
        throw err;
    }
}

async function getReviewById(id) {
    try {
        const { rows } = await db.query('SELECT * FROM albumReviews WHERE id=$1', [id]);
        return rows[0];
    } catch (err) {
        throw err;
    }
}

const createReview = async ({ userId, albumId, rating, comment, reviewDate }) => {
    try {
        const {
            rows: [reviews],
        } = await db.query(
            `
            INSERT INTO albumReviews(userId, albumId, rating, comment, reviewDate)
            VALUE($1, $2, $3)
            RETURNING *
            `,
            [ userId, albumId, rating, comment, reviewDate ]
        );

        return reviews;
    } catch (err) {
        console.error("Review created failed", err.message);
        throw err;
    }
};


const updateReview = async (reviewId, { userId, albumId, rating, comment, reviewDate }) => {
    try {
        const {
            rows: [updatedReview],
        } = await db.query(
            `
            UPDATE albumReviews
            SET userId = $2, albumId = $3, rating = $4, comment = $5, reviewDate = $6
            WHERE reviewId = $1
            RETURNING *
            `,
            [reviewId, userId, albumId, rating, comment, reviewDate]
        );

        if (!updatedReview) {
            throw new Error('Review not found');
        }

        return updatedReview;
    } catch (err) {
        console.error('Unable to update review. ', err.message);
        throw err;
    }
};

const deleteReview = async (reviewId) => {
    try {
        const {
            rows: [deletedReview],
        } = await db.query('DELETE FROM albumReviews WHERE reviewId = $1 RETURNING *', [reviewId]);

        if (!deletedReview) {
            throw new Error('Review not found');
        }

        return deletedReview;
    } catch (err) {
        console.error('Unable to delete review. ', err.message);
        throw err;
    }
};


module.exports = { getReviews, getReviewById, createReview, updateReview, deleteReview }; 