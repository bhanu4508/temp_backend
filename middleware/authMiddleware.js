const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function authMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.header('Authorization');

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    const userId = decoded.userId;

    // Find the user in the database
    User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Authorization denied' });
      }

      // Attach the user object to the request for further use
      req.user = user;

      // Proceed to the next middleware or route
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
