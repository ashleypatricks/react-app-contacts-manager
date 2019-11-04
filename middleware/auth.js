const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if the token exists
  if (!token) {
    return res
      .status(401)
      .json({ serverMessage: 'No token, authorisation denied' });
  }

  try {
    //Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ serverMessage: 'Token is not valid' });
  }
};
