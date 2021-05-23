const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// GET if hostel head or not
router.get("/", (req, res) => {
  print(res.body);
  checkHostelHead(req.body.email).then((result) =>
    res.send(result)
  );
});

function checkHostelHead(email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT name FROM hostel_heads WHERE email="${email}";`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result != 0 ? true : false);
    });
  });
}

module.exports = router;