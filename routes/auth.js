const express = require('express');
const router = express.Router();

const { userAuthAndLogin } = require('../controllers/auth');
const { authenticateLoginValidator } = require('../validation');

// @route GET api/contacts
// @desc Get logged in user
// @access Public
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route POST api/auth
// @desc POST Auth user & get token
// @access Public
router.post('/', authenticateLoginValidator, userAuthAndLogin);

module.exports = router;
