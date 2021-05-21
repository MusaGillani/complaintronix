const express = require("express");
const router = express.Router();
const db = require("../../models/db");

// GET all complaints
router.get("/", (req, res) => {
  getComplaints(req.body.hostelNo).then((result) => res.send(result));
});

router.get("/heads", (req, res) => {
  checkHostelHead(req.body.name, req.body.email).then((result) =>
    res.send(result)
  );
});

function checkHostelHead(name, email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT name FROM hostel_heads WHERE name="${name}" AND email="${email}";`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result != 0 ? true : false);
    });
  });
}

function getComplaints(hostelNo) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM complaints
    WHERE hostel_no=${hostelNo};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = router;
