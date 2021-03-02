const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// COPY GOOGLE ACCOUNT DETAILS OR UPDATE
router.post("/", async (req, res) => {
  //   console.log(req);
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  //   console.log("Comes from", ticket);
  const { sub, email, name } = ticket.getPayload();

  User.findOneAndUpdate(
    { googleId: sub },
    { email: email, name: name },
    { new: true, upsert: true }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
