//Create User -- brcypt is sync
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../middleware/generateToken");
const bcrypt = require("bcrypt");
const dbConfig = require("../config/db.config");
const db = dbConfig.connection;

exports.signup = (req, res) => {
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
                  const user = { email: insert.email, userID: result.insertId };
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
                    userID: user.userID,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
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
          res
            .status(401)
            .send({ message: "Wrong username/password combination" });
        } else {
          //If there is a user we can compare the password and return an authtoken
          if (result) {
            //Compare the input password with the database password
            if (bcrypt.compareSync(password, result[0].password)) {
              //Password is the same
              const email = emailVal;
              const userID = result[0].userID;
              //Create jwt with userinfo -- we could do this with the userID
              const user = { email: email, userID: userID };
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
                userID: user.userID,
                accessToken: accessToken,
                refreshToken: refreshToken,
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
