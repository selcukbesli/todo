const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SIGN UP A USER
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exist" });

    const newUser = new User({ name, email, password });

    // HASH A PASSWORD AND STORE
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
          // CREATING A JWT
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) throw err;
              // SEND BACK A RES
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
