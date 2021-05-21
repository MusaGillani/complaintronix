const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// GET all complaints
router.get("/", (req, res) => {
  execQuery(req.body.name,req.body.email).then((result) => res.send(result));
});

function execQuery(name, email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT name FROM hostel_heads WHERE name="${name}" AND email="${email}";`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else {
        console.log(result.length);
        // return result.length != 0 ? true : false;
        resolve(result != 0 ? true : false);
      }
    });
  });
}

module.exports = router;
