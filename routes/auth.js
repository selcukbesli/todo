const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// SIGN IN
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // SIMPLE VALIDATION
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // CHECK FOR EXISTING USER
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User doesn't exist" });
    if (user.googleId)
      return res.status(400).json({ msg: "Try to Sign In via Google" });

    // CHECK THE  PASSWORD
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Wrong password" });
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

// Validate user with the token
router.get("/user", auth, (req, res) => {
  //   console.log(req.user.id);
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// SIGN IN WITH GOOGLE
router.post("/google", (req, res) => {
  const { token } = req.body;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, name } = ticket.getPayload();
    User.findOneAndUpdate(
      { email },
      { email, name, googleId: sub },
      { new: true, upsert: true }
    )
      .then((data) =>
        res.json({
          token,
          user: {
            id: data._id,
            name: data.name,
            email: data.email,
            googleId: data.googleId,
          },
        })
      )
      .catch((err) => res.json({ msg: err }));
  }

  verify();
});

module.exports = router;
