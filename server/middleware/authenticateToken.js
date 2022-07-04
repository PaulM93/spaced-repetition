const jwt = require("jsonwebtoken");
const autheticateToken = (req, res, next) => {
  //Everytime we make a request we must use middlewear to ensure it is the correct user
  //get the token
  //verify that it is the correct user
  //return the user

  //We get the authroization header and set the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // const token = authHeader && authHeader.split(" ")[1];
  //Check if token is null to deny access -- returns unauthorised
  if (token == null) return res.sendStatus(401);

  //Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send({ message: err });
    console.log(err);
    // console.log("User authenticate token", user);
    //set the user
    req.user = user;
    //move on from middlwear
    next();
  });
};

module.exports = autheticateToken;
