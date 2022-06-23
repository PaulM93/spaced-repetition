const jwt = require("jsonwebtoken");
//Generate a jwt access token
function generateAccessToken(user) {
  //We set the expiry time of the token
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10000s",
    // expiresIn: "1000s",
  });
}

module.exports = generateAccessToken;
