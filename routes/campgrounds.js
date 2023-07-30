const express = require('express');
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} = require("../schemas");
const {isLoggedIn, storeReturnTo, isAuthor, validateCampground} = require('../middleware')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.array('image'),(req, res) => {
        res.send(req.body, req.file)
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router