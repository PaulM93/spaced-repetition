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
app.use(cors(corsOptions));

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
app.post("/users", async (req, res) => {
  try {
    //Query -- Insert into the "users" schema
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
          res.send({ message: "User successfully created", result: result });
          //Get user data here
        }
      });
    });
  } catch {
    res.status(500).send();
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
app.post("/login", (req, res) => {
  const emailVal = req.body.email;
  const password = req.body.password;

  //Retrieve the password from the database depending on the useremailVal

  //Authenticate the user
  try {
    db.query(
      //Select user where username and password are correct
      "SELECT * FROM users WHERE email = ?",
      [emailVal],
      (err, result) => {
        if (err) {
          console.log(err);
          //If incorrect an error is returned
          res.send({ err: err });
        }
        if (result.length === 0) {
          res.send("No user with this email exists");
        } else {
          //If there is a user we can compare the password and return an authtoken
          if (result) {
            //Compare the input password with the database password
            if (bcrypt.compareSync(password, result[0].password)) {
              //Password is the same
              console.log("result", result);
              const email = emailVal;
              const userID = result[0].userId;
              //Create jwt with userinfo -- we could do this with the userID
              const user = { email: email, userID: userID };
              const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET
              ); //create a random access token
              //Return the access token which has the user info saved inside it
              //If the password etc matches we return the access token
              res.json({
                message: "Successfully signed in",
                accessToken: accessToken,
              });
            } else {
              //Potential incorrect password etc
              res.send("Not allowed");
            }
          } else {
            //If incorrect an error is returned
            res.send({ message: "Wrong username/password combination" });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

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


*/
