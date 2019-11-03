/***
 * Create User Validator
 */

const createUserValidator = (req, res, next) => {
  req
    .check('name', 'Please include a name.')
    .not()
    .isEmpty();
  req.check('email', 'Please include a valid email.').isEmail();
  req
    .check('password', 'Please enter a password with 6 or more characters.')
    .isLength({ min: 6 });

  const errors = req.validationErrors();

  if (errors) {
    const errorCollection = errors.map(error => error.msg);
    return res.status(400).json({ errors: errorCollection });
  }

  next();
};

/***
 * User Auth & Login
 */

const authenticateLoginValidator = async (req, res, next) => {
  req.check('email', 'Please provide a valid email').isEmail();
  req.check('password', 'Password is required.').exists();

  const errors = req.validationErrors();

  if (errors) {
    const errorCollection = errors.map(error => error.msg);
    return res.status(400).json({ serverMessage: errorCollection });
  }

  next();
};

module.exports = {
  createUserValidator,
  authenticateLoginValidator
};
