const express = require("express");
const reviewsRouter = express.Router();
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = require('../db/reviews')

// const { requireUser, requiredNotSent } = require('./utils')

// GET request for all reviews 
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.send(reviews);
    } catch (err) {
        next(err);
    }
});


// GET request for a specific review by ID
reviewsRouter.get("/:id", async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);
        res.send(review);
    } catch (err) {
        next(err);
    }
});

// POST request for a new review
reviewsRouter.post("/", async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        // Check if rating and comment are provided
        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required" });
        }

        // Create a new review object
        const newReview = await createReview({
            userId: req.body.userId,  
            albumId: req.body.albumId,  
            rating: rating,
            comment: comment,
            reviewDate: new Date().toISOString(),
        });

        console.log("SQL Query:", newReview.query);

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (err) {
        next(err);
    }
});

// PATCH request to update reviews
reviewsRouter.patch("/:id", async (req, res, next) => {
    try {
        const updatedReview = await updateReview(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        next(error);
    }
});

// DELETE request to delete a review
reviewsRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedReview = await deleteReview(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review deleted successfully", review: deletedReview });
    } catch (error) {
        next(error);
    }
});

module.exports = reviewsRouter;