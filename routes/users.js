const express = require('express');
const router = express.Router();

const { createUser } = require('../controllers/users');
const { createUserValidator } = require('../validation/index');
const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', createUserValidator, createUser);

module.exports = router;
