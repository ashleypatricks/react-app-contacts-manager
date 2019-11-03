const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const userModel = require('../models/User');

exports.userAuthAndLogin = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ serverMessage: 'Empty request body' });
  }

  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ serverMesssage: 'Invalid User' });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ serverMessage: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

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
