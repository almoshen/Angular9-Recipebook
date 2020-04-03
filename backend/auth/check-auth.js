const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const realToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: realToken.email, userId: realToken.userId, username: realToken.username, firstname: realToken.firstname,
      lastname: realToken.lastname};
    next();
  } catch (e) {
    res.status(401).json({
      error: "Not correct"
    })
  }
};
