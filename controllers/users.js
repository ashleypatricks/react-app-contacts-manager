const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const userModel = require('../models/User');

exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ serverMessage: 'Empty request body' });
  }

  const { name, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ serverMessage: 'User already exists' });
    }

    user = new userModel({
      name,
      email,
      password
    });

    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    // 360000 keeps the token valid for an hour.
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ serverMesaage: 'Server Error' });
  }
};
