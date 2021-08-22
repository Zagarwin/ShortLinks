var express = require('express');
var router = express.Router();

const shortlinks = require('../controllers/shortlinks');

/* Redirect short links */
router.get('/:shortId', shortlinks.redirect);

/* Creates a new short URL */
router.post('/createShort', shortlinks.increment, shortlinks.create);

module.exports = router;
