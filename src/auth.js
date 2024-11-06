const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Don't have token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); //Has token, but don't have access
    }

    req.user = user;
    next();
  });
}

function generateToken(id) {
  const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });

  return token;
}

module.exports = { generateToken, authenticateToken };
