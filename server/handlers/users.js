const dbConfig = require("../config/db.config");
require("dotenv").config();
const nodemailer = require("nodemailer");
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

//Send User Feedback
exports.sendFeedback = (req, res) => {
  return res
    .status(500)
    .send({ message: "This feature is currently not in place yet." });
  // const email = req.body.email;
  // const message = req.body.message;

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.NODEMAILER_ACCOUNT,
  //     pass: process.env.NODEMAILER_PASSWORD, //env
  //   },
  // });

  // console.log("transporter", transporter);

  // const mailOptions = {
  //   from: email,
  //   to: process.env.NODEMAILER_ACCOUNT,
  //   subject: `New Spaced email from ${email}`,
  //   text: message,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //     return res
  //       .status(500)
  //       .send({ message: "There was a problem :(", error: error });
  //   } else {
  //     return res.status(200).send({ message: "Thank you for your feedback" });
  //   }
  // });
};
