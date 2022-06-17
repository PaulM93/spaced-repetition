const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const guard = require("express-jwt-permissions")();
const { expressjwt: expressJwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const oAuth = require("./middleware/oAuth");
app.use(cors());

app.use(oAuth);

const port = process.env.PORT || 3001;

app.use(
  expressJwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-f6e5vo5z.us.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://www.spaced-repetition-api.com",
    issuer: "https://dev-f6e5vo5z.us.auth0.com/",
    algorithms: ["RS256"],
  })
);
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

function create(user, callback) {
  const mysql = require("mysql");
  const bcrypt = require("bcrypt");

  const connection = mysql.createConnection({
    host: "localhost",
    user: "me",
    password: "secret",
    database: "mydb",
  });

  connection.connect();

  const query = "INSERT INTO users SET ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return callback(err);

    const insert = {
      password: hash,
      email: user.email,
    };

    connection.query(query, insert, function (err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });
}

//Guard
/*
  The guard is a piece of middlewhere
  User must have access to the scope "read:collections"
*/
const collectionsAPIEndpoint = "http://localhost:3001/retrieveCollections";

app.get("/collections", async (req, res) => {
  try {
    const { access_token } = req.oAuth;
    //We get the acess token and attach it to the axios call
    const response = await axios({
      method: "get",
      url: collectionsAPIEndpoint,
      headers: { "Authorization": `Bearer ${access_token}` },
    });
    //If auth correct we return the data
    res.json(response.data);
  } catch (error) {
    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.get(
  "/retrieveCollections",
  guard.check(["read:collections"]),
  function (req, res) {
    res.json({
      collection1: "First collection",
      collection2: "second collection",
    });
  }
);

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

//Api endpoints
//app.get   app.post
//Req REQUESTS from front end -- res SENDS to front end
app.post("/createUser", (req, res) => {
  //Get variables from front end i.e. req.body.name
  // const email = req.body.email;
  // const password = req.body.password;

  const user = {
    email: "marleypaul91@gmail.com",
    password: "password",
  };

  const query = "INSERT INTO users SET ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return callback(err);

    const insert = {
      password: hash,
      email: user.email,
      id: uuid.v4(),
    };

    console.log("INSERT", insert);

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

  //id
  //email,
  //password
  //creation date
  //last access date

  //Insert data into users table - question mark represents properties
  // db.query(
  //   "INSERT INTO users (username, password) VALUES (?, ?)",
  //   [username, password],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send("Added");
  //     }
  //   }
  // );
}); //we must call a route

app.post("/login", (req, res) => {
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

//Retrieve users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM USERS", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
