const express = require('express');
const router = express.Router();

const { userAuthAndLogin, getLoggedInUser } = require('../controllers/auth');

const { authenticateLoginValidator } = require('../validation');
const auth = require('../middleware/auth');

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, getLoggedInUser);

// @route POST api/auth
// @desc POST Auth user & get token
// @access Public
router.post('/', authenticateLoginValidator, userAuthAndLogin);

module.exports = router;
