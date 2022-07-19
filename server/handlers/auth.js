//Create User -- brcypt is sync
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../middleware/generateToken");
const bcrypt = require("bcrypt");
const dbConfig = require("../config/db.config");
const db = dbConfig.connection;
const { isEmailValid, validatePassword } = require("./utilFunctions");

exports.signup = (req, res) => {
  let errorMessage = "";
  if (!isEmailValid(req.body.email)) {
    errorMessage = "Email poorly formatted";
  }
  // const passwordValidate =
  if (validatePassword(req.body.password)) {
    errorMessage = "Password must be 8 characters";
  }
  if (errorMessage === "") {
    try {
      //Check if user already exists
      db.query(
        "SELECT COUNT(*) AS cnt FROM users WHERE email = ? ",
        req.body.email,
        function (err, data) {
          if (err) {
            res.status(500).send({ err: err });
          } else {
            if (data[0].cnt > 0) {
              // Already exist
              return res.status(409).send({ message: "User already exists" });
            } else {
              const query = "INSERT INTO users SET ?";
              bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) return callback(err);
                //Object to insert into the database
                const insert = {
                  password: hash,
                  email: req.body.email,
                  //userID automatically created
                };
                //Query to insert daya into mysql
                db.query(query, insert, function (err, result) {
                  if (err) {
                    res.send({ err: err });
                  }
                  if (result) {
                    //insertID identifies userID
                    const user = {
                      email: insert.email,
                      userID: result.insertId,
                    };
                    const accessToken = generateAccessToken(user); //create a random access token
                    //Create a refresh token
                    const refreshToken = jwt.sign(
                      user,
                      process.env.REFRESH_TOKEN_SECRET // no expirationd time -- we manually handle this instead of jwt
                    );
                    //Store refresh tokens in a db -- find more info
                    // refreshTokens.push(refreshToken);
                    //Return user data when created
                    res.status(202).send({
                      message: "Welcome to Spaced",
                      user: {
                        userID: user.userID,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                      },
                    });
                  }
                });
              });
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  } else {
    res.status(500).send({ message: errorMessage });
  }
};

//Login route
exports.signin = (req, res) => {
  const emailVal = req.body.email;
  const password = req.body.password;
  //Authenticate the user
  try {
    db.query(
      //Select user where username and password are correct
      "SELECT * FROM users WHERE email = ?",
      [emailVal],
      (err, result) => {
        if (err) {
          res.status(500).send({ err: err });
        }
        if (result.length === 0) {
          //No user exists
          res.status(401).send({ message: "No user exists with this email" });
        } else {
          //If there is a user we can compare the password and return an authtoken
          if (result) {
            //Compare the input password with the database password
            if (bcrypt.compareSync(password, result[0].password)) {
              //Password is the same
              const email = emailVal;
              const userID = result[0].userID;
              const userName = result[0].username;
              const bio = result[0].bio;
              //Create jwt with userinfo -- we could do this with the userID
              const user = {
                email: email,
                userID: userID,
                userName: userName,
                bio: bio,
              };
              console.log("user", user);
              const accessToken = generateAccessToken(user); //create a random access token
              //Create a refresh token
              const refreshToken = jwt.sign(
                user,
                process.env.REFRESH_TOKEN_SECRET // no expirationd time -- we manually handle this instead of jwt
              );
              //Store refresh tokens in a db -- find more info
              // refreshTokens.push(refreshToken);
              //Return the access token and refresh token which has the user info saved inside it
              //If the password etc matches we return the access token
              //Also return user data
              res.status(202).send({
                user: {
                  userName: userName,
                  bio: bio,
                  userID: user.userID,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                },
                message: "Welcome back to Spaced",
              });
            } else {
              //Potential incorrect password etc
              res
                .status(401)
                .send({ message: "Wrong username/password combination" });
            }
          } else {
            //If incorrect an error is returned
            res
              .status(401)
              .send({ message: "Wrong username/password combination" });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

exports.logout = (req, res) => {
  //Remove the token
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.changePassword = (req, res) => {
  let errorMessage = "";
  if (validatePassword(req.body.newPassword)) {
    errorMessage = "Password must be 8 characters";
  }
  /*
    1) Request the user original password and a new password
    2) Check if the original password is correct 
    3) If correct generate a new password and set as the password in the user 
  */
  //  const email = req.body.email
  // const password = req.body.passwowrd
  // const newPassword = req.body.newPassword

  // "SELECT * FROM collections WHERE collectionID =?",
  if (errorMessage === "") {
    try {
      const userID = req.user.userID;
      const password = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      db.query(
        "SELECT * FROM users WHERE userID =?",
        [userID],
        (err, result) => {
          if (err) {
            res.status(500).send({ err: err });
          }
          if (result.length === 0) {
            //No user exists
            res.status(401).send({ message: "No user exists" });
          } else {
            if (result) {
              if (bcrypt.compareSync(password, result[0].password)) {
                //Update password
                bcrypt.hash(newPassword, 10, function (err, hash) {
                  if (err) return callback(err);
                  let query = "UPDATE users SET password = ? WHERE userID = ?";
                  let data = [hash, userID];
                  db.query(query, data, (error, results, fields) => {
                    if (error) {
                      console.log(error);
                      res
                        .status(500)
                        .send({ message: "There was an error", error: error });
                    }
                    res.status(202).send({
                      message: "Password updated",
                    });
                  });
                });
              } else {
                //Potential incorrect password etc
                res
                  .status(401)
                  .send({ message: "Your current password is incorrect" });
              }
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "There was an error", error: error });
    }
  } else {
    res.status(500).send({ message: errorMessage });
  }
};

exports.changeEmail = (req, res) => {
  /*
    1) Show the original email of the user
    2) Ask for the new email of the user and the password
    2) Check if the original password is correct 
    3) If correct set the new email
  */
  const currentEmail = req.body.currentEmail;
  const newEmail = req.body.newEmail;
  const userID = req.user.userID;
  const validEmail = isEmailValid(rnewEmail);
  if (validEmail) {
    try {
      db.query(
        "SELECT * FROM users WHERE userID =?",
        [userID],
        (err, result) => {
          if (err) {
            return res.status(500).send({ err: err });
          }
          if (result.length === 0) {
            //No user exists
            return res.status(401).send({ message: "No user exists" });
          } else {
            console.log("result", result[0].email);
            console.log("current", currentEmail);
            if (result[0].email === currentEmail) {
              console.log("does not match");
              let query = "UPDATE users SET email = ? WHERE userID = ?";
              let data = [newEmail, userID];
              db.query(query, data, (error, results, fields) => {
                if (error) {
                  console.log(error);
                  return res
                    .status(500)
                    .send({ message: "There was an error", error: error });
                }
                return res.status(202).send({
                  message: "Email updated",
                });
              });
            } else {
              console.log("here");
              return res
                .status(401)
                .send({ message: "Your current email is incorrect." });
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.send(err);
    }
  } else {
    res.status(500).send({ message: "New email poorly formatted" });
  }
};

let refreshTokens = [];
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  console.log("Refresh token", refreshToken);
  //If no refresh token exists we return status
  if (refreshToken === null) return res.sendStatus(401);
  //Check if we have a valid refresh token
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  //If there is a oken we verify it
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("Refresh token user", user);
    //If no err now we can create an access token
    const accessToken = generateAccessToken({
      userID: user.userID,
      email: user.email,
    }); //if we have a valid refresh token we return an access token
    //Return the access token
    res.json({ accessToken: accessToken });
  });
};
