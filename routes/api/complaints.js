const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// GET all complaints
router.get("/", (req, res) => {
  let result;
  db.query(
    `SELECT name FROM hostel_heads WHERE name="${req.body.name}" AND email="${req.body.email}";`,
    function (err, result, fields) {
      if (err) throw err;
      else {
        console.log(result.length);
        result = result.length != 0 ? true : false;
        res.send(result);
      }
    }
  );
});

function execQuery(name, email) {
  let myQuery = `SELECT name FROM hostel_heads WHERE name="${name}" AND email="${email}";`;
  db.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    else {
      console.log(result.length);
      return result.length != 0 ? true : false;
    }
  });
}

module.exports = router;
