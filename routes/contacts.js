const express = require('express');
const router = express.Router();

const {
  getAllContacts,
  addNewContact,
  deleteContact,
  updateContact
} = require('../controllers/contacts');
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
router.put('/:id', auth, updateContact);

// @route DELETE api/contact/:id
// @desc Delete a contact
// @access Private
router.delete('/:id', auth, deleteContact);

module.exports = router;
