const userModel = require('../models/User');
const contactModel = require('../models/Contact');

/**
 * Get All Contacts
 */
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel
      .find({ user: req.user.id })
      .sort({ date: -1 });

    res.json(contacts);
  } catch (err) {
    console.error(error.message);
    res.status(500).json({ serverMessage: 'Server Error' });
  }
};

/**
 * Add A New Contact
 */
exports.addNewContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new contactModel({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ serverMessage: 'Server Error' });
  }
};

/**
 * Update A Contact
 */

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, type } = req.body;

  try {
    const result = await contactModel.findOneAndUpdate(
      { _id: id },
      { name, email, phone, type },
      { new: true }
    );

    res.json({ result });
  } catch (error) {
    res.status(500).json({ serverMessage: error });
  }
};

/**
 * Delete A Contact
 */
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await contactModel.deleteOne({ _id: id });

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ serverMessage: 'Server Error' });
  }
};
