const dbConfig = require("../config/db.config");
const db = dbConfig.connection;
//Get User
exports.getUser = (req, res) => {
  //get the id of the user of the token
  //Token = req.user.userID
  console.log("Token", req.user.userID);
  db.query(
    "SELECT * FROM users WHERE userID = ?",
    [req.user.userID],
    (err, result) => {
      if (err) {
        res.status(500).send({ err: err });
      } else {
        if (result.length === 0) {
          console.log("no user exists");
        } else {
          res.send(result);
        }
      }
    }
  );
};

//Update user
exports.updateUser = (req, res) => {
  const userID = req.user.userID;
  const bio = req.body.bio;
  const displayName = req.body.displayName;
  console.log("Update user");
  let query = "UPDATE users SET bio = ?, displayName = ? WHERE userID = ?";
  let data = [bio, displayName, userID];
  db.query(query, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.status(200).send({
      message: "Profile Updated",
    });
    res.send(results);
  });
};
