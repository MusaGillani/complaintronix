const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// const connection = mysqlDb.createConnection({
//   host: "us-cdbr-east-03.cleardb.com",
//   user: "b46fe1e6d30bcc",
//   password: "8cf61177",
//   database: "heroku_26af7665b162de1",
// });

// connection.connect((err) => {
//   if (err) console.log(err);
//   else {
//     connection.query("use heroku_26af7665b162de1;", (err) => {
//       if (err) throw err;
//     });
//     console.log("connection successful");
//   }
// });

// GET all complaints
router.get("/", (req, res) => {
  console.log(req.body);
  const result = execQuery();
  res.json(result);
  res.end();
});

function execQuery() {
  let myQuery = `SELECT * FROM hostel_heads;`;
  db.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    else {
      //   console.log(result);
      return result;
    }
  });
}

module.exports = router;
