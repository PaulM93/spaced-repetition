mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "spacedrepetition",
};
const connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
  if (err) {
    console.log("error connecting:" + err.stack);
  }
  console.log("connected successfully to DB.");
});
module.exports = {
  connection: mysql.createConnection(dbConfig),
};
