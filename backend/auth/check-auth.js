const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'this_is_used_as_password_for_hashes');
    next();
  } catch (e) {
    res.status(401).json({
      error: "Not correct"
    })
  }
};
