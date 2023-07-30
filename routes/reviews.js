const catchAsync = require("../utils/catchAsync");
const ExpressError = require('../utils/ExpressError')
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require('../controllers/reviews')
const express = require('express')
const {reviewSchema} = require("../schemas");
const router = express.Router({ mergeParams: true });
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const {createReview} = require("../controllers/reviews");


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;