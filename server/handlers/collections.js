const dbConfig = require("../config/db.config");
const db = dbConfig.connection;
/*
//What we want to do
    - Create Collection 
    - Get all collections
    - Get single collection
    - Update collection
    - Delete collection 
*/

// CREATE TABLE collections (
//     id int NOT NULL AUTO_INCREMENT,
//     collectionID int NOT NULL,
//     title varchar(255) NOT NULL,
//     description varchar(255),
//     category varchar(255),
//     PRIMARY KEY (id),
//     FOREIGN KEY (collectionID)
//         REFERENCES users(userID)
//         ON DELETE CASCADE
//     );
exports.getCollections = (req, res) => {
  //CollectionID === req.user.userID
  db.query(
    "SELECT * FROM collections WHERE collectionID =?",
    [req.user.userID],
    (error, result) => {
      if (error) {
        res.status(500).send({ error: error });
      } else {
        if (result.length === 0) {
          return res.status(200).send({ message: "You have no collections." });
        } else {
          res.status(200).send(result);
        }
      }
    }
  );
};

exports.createCollection = (req, res) => {
  //We want to create a collection here
  const query = "INSERT INTO collections SET?";
  const insert = {
    collectionID: req.user.userID, //use the userID
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  };
  //Where the user ID === the userID
  db.query(query, insert, function (err, result) {
    if (err) {
      res.send({ err: err });
    }
    if (result) {
      console.log(result);
      res.status(200).send({
        message: "Collection Created",
      });
    }
  });
};

//Update Collection
exports.updateCollection = (req, res) => {
  const userID = req.user.userID;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.title;
  let query =
    "UPDATE collections SET title = ?, description = ?, category = ? WHERE collectionID = ?";
  let data = [title, description, category, userID];
  db.query(query, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.status(200).send({
      message: "Collection Updated",
    });
  });
};

//Delete Collection
exports.deleteCollection = (req, res) => {
  const query = "DELETE FROM collections WHERE collectionID =?";
  let data = [req.body.collectionID];
  db.query(query, data, function (error, result) {
    if (error) {
      return console.error(error.message);
    }
    res.status(200).send({
      message: "Collection Deleted",
    });
  });
};
