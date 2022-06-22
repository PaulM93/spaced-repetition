const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Middlewear
const authenticateToken = require("./middleware/authenticateToken");
//Cors
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors());

app.use(express.json());
require("dotenv").config();
// app.use(oAuth);

const port = process.env.PORT || 3001;

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "spacedrepetition",
});

db.connect();

//Users table

//Collections table
//Collections are s
//Card schema

/*
    Users table
            - id
            -name
            -country

    Collections table
            - id
            - name 
            - type
            - id(user)

    Cards table 
            - data 
            - id(collections table)


*/

//Create User -- brcypt is sync
app.post("/signup", async (req, res) => {
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
                  refreshTokens.push(refreshToken);
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
    res.status(500).send({ err: err });
  }
});

//Retrieve users
app.get("/users", (req, res) => {
  //use middlewear === where email address stored in jwt token === email in users table
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
      // res.send(result);
    }
  });
});

const users = [
  {
    email: "paulmarley1993@outlook.com",
    bio: "fat",
    other: "sdfsd",
  },
  {
    email: "Jim@gmail.com",
    bio: "fart",
  },
];

/**
 
  User tabel 
  - userID
  - email
  - password
  - primary key
  - collections


 Collections table
 - Title
 - Description 
 - Category 
 - Created At
 - Cards 
 - userID

 Cards 
- Front
- Back 

 */

//We should store refresh tokens in the database
let refreshTokens = [];
//Creating a new access token
app.post("/token", (req, res) => {
  //We user our existing refresh token if it exists
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
});

//Delete refresh tokens upon logout -- this would be from a database
app.delete("/logout", (req, res) => {
  //Removing token
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204); //token deleted
});

//Using middlewear to ensure it's the correct user -- we are using the user email address
app.get("/posts", authenticateToken, (req, res) => {
  //Get all posts where the user email in the jwt === the email in the database
  //Better to use the userID instead of email

  console.log("User Obj JWT", req.user);
  //User the middlewear to verify that it is the correct user
  //We only have access to the data in the users where this is correct
  res.json(users.filter((user) => user.email === req.user.email));
});

//Login route
app.post("/signin", (req, res) => {
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
              refreshTokens.push(refreshToken);
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
});

//Generate a jwt access token
function generateAccessToken(user) {
  //We set the expiry time of the token
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
    // expiresIn: "1000s",
  });
}

app.listen(3001, () => {
  console.log("Running");
});

//Database

/*
    Collections
    - Users
    - CardCollections 
            -Spanish
            -English etc
  
  */

/*
  Authentication 
  - We check if a user password and details match

  Authorisation - JWT (JSON Web Token)
  - We use this to check that the user who logged in in the same user
  - Authorising it is the correct user
  - 

  - JWT token has no expiration date 
  - We need to make a refresh token 
  - Access token should only be availble a short time and we use a refresh token to generate a new access token


– When the Access Token is expired, React automatically send Refresh Token request, receive new Access Token and use it with new request.


- JWT Flow
///////////
1) Create a JWT access token and refresh token upon login
2) This JWT has an expiry time so we use a refresh token to get a new one
3) Store refresh token in mysql with a valid_until timestamp
once it has expired
4) Use this refresh token to generate a new access token
  */
