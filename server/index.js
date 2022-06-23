const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
//Middlewear
const authenticateToken = require("./middleware/authenticateToken");
const generateAccessToken = require("./middleware/generateToken");
//Port
const PORT = process.env.PORT || 3001;

//Auth
const { signup, signin } = require("./handlers/auth");
//User
const { getUser, updateUser } = require("./handlers/users");

//Auth Routes
app.post("/signup", signup);
app.post("/signin", signin);
//User Routes
app.get("/user", authenticateToken, getUser);
app.post("/user", authenticateToken, updateUser);

//Retrieve users
// app.get("/users", (req, res) => {
//   //use middlewear === where email address stored in jwt token === email in users table
//   db.query("SELECT * FROM USERS", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(users);
//       // res.send(result);
//     }
//   });
// });

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

app.listen(PORT, () => {
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
