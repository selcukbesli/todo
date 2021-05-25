require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//GET THE TOKEN
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //CHECK THE TOKEN
  if (!token)
    return res
      .status(401)
      .json({ msg: "No token, authorization denied!! Middleware" });

  if (token.length < 200) {
    try {
      //VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // ADD TOKEN PAYLOAD TO REQUEST
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  } else {
    try {
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { sub, exp, iat } = ticket.getPayload();
        req.user = { sub, iat, exp };
        next();
      }

      verify();
    } catch (err) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  }
}

module.exports = auth;
