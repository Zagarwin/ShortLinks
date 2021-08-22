var express = require('express');
var router = express.Router();

const auth = require('../auth/methods');

router.post('/register', auth.create);
router.post('/login', auth.authenticate);

module.exports = router;
