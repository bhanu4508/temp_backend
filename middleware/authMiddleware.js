const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function authMiddleware(req, res, next) {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token);
  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    req.user = user;
    next();
  });

}

module.exports = authMiddleware;



// Get the JWT token from the request headers
  // const token = req.header('Authorization'); 

  // console.log(token);

  // // Check if the token is present
  // if (!token) {
  //   return res.status(401).json({ error: 'Authorization denied' });
  // }

  // try {
  //   // Verify the token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   // Extract the user ID from the decoded token
  //   const userId = decoded.userId;

  //   // Find the user in the database
  //   User.findById(userId, (err, user) => {
  //     if (err || !user) {
  //       return res.status(401).json({ error: 'Authorization denied' });
  //     }

  //     // Attach the user object to the request for further use
  //     req.user = user;

  //     // Proceed to the next middleware or route
  //     next();
  //   });
  // } catch (error) {
  //   res.status(401).json({ error: 'Invalid token' });
  // }

  // let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     token = req.headers.authorization.split(" ")[1];

  //     //decodes token id
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     req.user = await User.findById(decoded.id).select("-password");

  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized, token failed");
  //   }
  // }

  // if (!token) {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }
