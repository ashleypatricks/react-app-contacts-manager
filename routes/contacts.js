const express = require('express');
const router = express.Router();

const { getAllContacts, addNewContact } = require('../controllers/contacts');
const auth = require('../middleware/auth');
const { createContactValidator } = require('../validation');

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', auth, getAllContacts);

// @route POST api/contacts
// @desc Add a new contact
// @access Private
router.post('/', auth, createContactValidator, addNewContact);

// @route PUT api/contact/:id
// @desc Update a contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update a contact');
});

// @route DELETE api/contact/:id
// @desc Delete a contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
