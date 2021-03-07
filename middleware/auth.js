require("dotenv").config();
const jwt = require("jsonwebtoken");

//GET THE TOKEN
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //CHECK THE TOKEN
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    //VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ADD TOKEN PAYLOAD TO REQUEST
    req.user = decoded;
    // console.log(decoded);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
