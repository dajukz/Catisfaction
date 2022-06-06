const express = require('express');

const controller = require('./controller');
const router = express.Router();

router
    .route('/')
    .get(controller.getReview);

router
    .route('/reviewpost')
    .post(controller.postReview);

router
    .route('/getStars')
    .get(controller.getStars)
module.exports = router;