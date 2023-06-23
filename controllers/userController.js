const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const EmailValidator = require('email-validator');


module.exports.signup = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;

    const minLength = 8;
    const maxLength = 20;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    // Perform the checks

    if (password.length < minLength || password.length > maxLength) {
      return res.status(400).json({ status: false, message: "Password must be between 8 and 20 characters." });
    }
    if (!hasUppercase) {
      return res.status(400).json({ status: false, message: "Password must contain at least one uppercase letter." });
    }
    if (!hasLowercase) {
      return res.status(400).json({ status: false, message: "Password must contain at least one lowercase letter." });
    }
    if (!hasNumber) {
      return res.status(400).json({ status: false, message: "Password must contain at least one number." });
    }
    if (!hasSpecialChar) {
      return res.status(400).json({ status: false, message: "Password must contain at least one special character (!@#$%^&*)." });
    }


    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ status: false, message: "Username already used" });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ status: false, message: "Email already used" });
    }

    const isValidEmail = EmailValidator.validate(email);

    if (!isValidEmail) {
      return res.status(400).json({ status: false, message: "Invalid Email entry" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        status: true,
        data: {
          // _id: user._id,
          // username: user.username,
          // email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(500).json({ status: false, message: "Failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }

  }

  module.exports.login = async (req, res, next) => {

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Incorrect Username No user exists !",
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          status: false,
          message: "Incorrect Password",
        });
      }
  
      const token = generateToken(user._id);
      res.json({
        status: true,
        data: {
          // _id: user._id,
          // username: user.username,
          // email: user.email,
          token: token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Server error",
      });
    }

  };

  
