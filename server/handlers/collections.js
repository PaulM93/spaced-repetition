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

//Get Collections
exports.getCollections = (req, res) => {
  //CollectionID === req.user.userID
  try {
    db.query(
      "SELECT * FROM collections WHERE collectionID =?",
      [req.user.userID],
      (error, result) => {
        if (error) {
          res.status(500).send({ error: error });
        } else {
          if (result.length === 0) {
            return res.status(200).send([]);
          } else {
            console.log(result);
            res.status(200).send(result);
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

//Create Collectiion
exports.createCollection = (req, res) => {
  //We want to create a collection here
  try {
    const query = "INSERT INTO collections SET?";
    const insert = {
      collectionID: req.user.userID, //use the userID
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      nextStudyDate: "",
      lastStudyDate: "",
      cards: JSON.stringify([]),
    };
    //Where the user ID === the userID
    db.query(query, insert, function (err, result) {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (result) {
        console.log(result);
        res.status(200).send({
          collection: {
            ...insert,
            id: result.insertId,
          },
          message: "Collection Created",
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

//Update Collection
exports.updateCollection = (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const nextStudyDate = req.body.nextStudyDate;
    const lastStudyDate = req.body.lastStudyDate;
    console.log("NextStudyDate gerer", nextStudyDate);
    const cards = JSON.stringify(req.body.cards); //stringify array
    let query =
      "UPDATE collections SET title = ?, description = ?, category = ?, cards = ?, nextStudyDate = ?, lastStudyDate = ? WHERE id = ?";
    let data = [
      title,
      description,
      category,
      cards,
      nextStudyDate,
      lastStudyDate,
      id,
    ];
    db.query(query, data, (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: "There was an error", error: error });
      }
      console.log(results);
      res.status(200).send({
        message: "Collection Updated",
      });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

//Delete Collection
exports.deleteCollection = (req, res) => {
  try {
    const query = "DELETE FROM collections WHERE id =?";
    console.log("body", req.body);
    let data = [req.body.id];
    db.query(query, data, function (error, result) {
      if (error) {
        res.status(500).send({ message: "There was an error", error: error });
      }
      res.status(200).send({
        id: result.insertId,
        message: "Collection Deleted",
      });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
