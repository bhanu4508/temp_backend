const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

module.exports.signup = async (req, res, next) => {
    
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
    //   delete user.password;
      // return res.json({ status: true, user });

      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      
      } else{
        res.status(400);
        throw new Error("User not found");
      }

  }

  module.exports.login = async (req, res, next) => {
    // try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
    //   delete user.password;
    //   return res.json({ status: true, user });
    // } catch (ex) {
    //   next(ex);
    // }

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }

  };

  
