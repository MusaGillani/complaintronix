const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// GET if hostel head or not
router.get("/", (req, res) => {
  checkHostelHead(req.query.email).then((result) =>
    res.send(result)
  );
});

function checkHostelHead(email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT hostel_no FROM hostel_heads WHERE email="${email}";`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result != 0 ? result : false);
    });
  });
}

module.exports = router;