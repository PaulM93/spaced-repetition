const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
//Middlewear
const authenticateToken = require("./middleware/authenticateToken");
const generateAccessToken = require("./middleware/generateToken");
//Port
const PORT = process.env.PORT || 3001;

//Auth
const { signup, signin, refreshToken } = require("./handlers/auth");
//User
const { getUser, updateUser } = require("./handlers/users");
//Collecions
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("./handlers/collections");
const dbConfig = require("./config/db.config");

//Auth Routes
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/token", refreshToken);
//User Routes
app.get("/user", authenticateToken, getUser);
app.post("/user", authenticateToken, updateUser);
//Collection Routes
app.get("/user/collection", authenticateToken, getCollections);
app.post("/user/collection", authenticateToken, createCollection);
app.post("/user/collection/update", authenticateToken, updateCollection);
app.post("/user/collection/delete", authenticateToken, deleteCollection);

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

//Delete refresh tokens upon logout -- this would be from a database
app.delete("/logout", (req, res) => {
  //Removing token
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204); //token deleted
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
