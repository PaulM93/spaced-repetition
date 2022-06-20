const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const guard = require("express-jwt-permissions")();
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const oAuth = require("./middleware/oAuth");

//Cors
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));

app.use(express.json());
require("dotenv").config();
// app.use(oAuth);

const port = process.env.PORT || 3001;

// app.use(
//   expressJwt({
//     secret: jwks.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: "https://dev-f6e5vo5z.us.auth0.com/.well-known/jwks.json",
//     }),
//     audience: "https://www.spaced-repetition-api.com",
//     issuer: "https://dev-f6e5vo5z.us.auth0.com/",
//     algorithms: ["RS256"],
//   })
// );
// app.use(jwtCheck);

//Import mysql
const mysql = require("mysql");

//Set up database connection
const db = mysql.createConnection({
  user: "root", //standard terminology
  host: "localhost",
  password: "password",
  database: "spacedrepetition",
});
db.connect();

// function createUser(user, callback) {
//   const mysql = require("mysql");
//   const bcrypt = require("bcrypt");

//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "me",
//     password: "secret",
//     database: "mydb",
//   });

//   connection.connect();

//   const query = "INSERT INTO users SET ?";

//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) return callback(err);

//     const insert = {
//       password: hash,
//       email: user.email,
//     };

//     connection.query(query, insert, function (err, results) {
//       if (err) return callback(err);
//       if (results.length === 0) return callback();
//       callback(null);
//     });
//   });
// }

//Guard
/*
  The guard is a piece of middlewhere
  User must have access to the scope "read:collections"
*/
// const collectionsAPIEndpoint = "http://localhost:3001/retrieveCollections";

// app.get("/collections", async (req, res) => {
//   try {
//     const { access_token } = req.oAuth;
//     //We get the acess token and attach it to the axios call
//     const response = await axios({
//       method: "get",
//       url: collectionsAPIEndpoint,
//       headers: { "Authorization": `Bearer ${access_token}` },
//     });
//     //If auth correct we return the data
//     res.json(response.data);
//   } catch (error) {
//     if (error.response.status === 401) {
//       res.status(401).json("Unauthorized to access data");
//     } else if (error.response.status === 403) {
//       res.status(403).json("Permission denied");
//     } else {
//       res.status(500).json("Whoops, something went wrong");
//     }
//   }
// });

// app.get(
//   "/retrieveCollections",
//   guard.check(["read:collections"]),
//   function (req, res) {
//     res.json({
//       collection1: "First collection",
//       collection2: "second collection",
//     });
//   }
// );

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

app.post("/loginTest", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    //Select user where username and password are correct
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

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
      };

      //Query to insert daya into mysql
      db.query(query, insert, function (err, result) {
        if (err) {
          res.send({ err: err });
        }

        if (result) {
          res.send({ result: result });
          //Get user data here
        }
      });
    });
  } catch {
    res.status(500).send();
  }
});

//Login route
// app.post("/login", async (req, res) => {
//   //Check if user exists in database
//   try {
//     if (bycrpt.compare(req.body.password, user.password)) {
//       console.log("Same");
//     } else {
//       res.send("Not allowed");
//     }
//   } catch {}
// });

//Retrieve users
app.get("/users", (req, res) => {
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
  },
  {
    email: "Jim@gmail.com",
    bio: "fart",
  },
];

//Middlewear
app.get("/posts", autenticateToken, (req, res) => {
  console.log("here", req.user.email);
  //User the middlewear to verify that it is the correct user
  //We only have access to the data in the users where this is correct
  res.json(users.filter((user) => user.email === req.user.email));
});

//Login route
app.post("/login", (req, res) => {
  const emailVal = "paulmarley1993@outlook.com";
  const passwordVal = "password";

  //Retrieve the password from the database depending on the useremailVal

  //Authenticate the user
  try {
    //Compare the input password with the database password
    if (bcrypt.compare(req.body.password, passwordVal)) {
      //Password is the same
      const email = emailVal;
      //Create jwt with userinfo -- we could do this with the email
      const user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //create a random access token
      //Return the acces token which has the user info saved inside it
      //If the password etc matches we return the access token
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not allowed");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//Middleware
function autenticateToken(req, res, next) {
  //get the token
  //verify that it is the correct user
  //return the user

  //We get the authroization header and set the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //Check if token is null to deny access
  if (token == null) return res.sendStatus(401);

  //Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    //set the user
    req.user = user;
    //move on from middlwear
    next();
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


*/
