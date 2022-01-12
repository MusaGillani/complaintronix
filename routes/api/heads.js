const express = require("express");
const router = express.Router();
const complaints = require("../../models/Complaints");
const hostelHeads = require("../../models/HostelHeads");
const students = require("../../models/Students");
const logs = require("../../models/Logs");
const chats = require("../../models/Chats");
const handlers = require("../../models/ComplaintHandlers");
const services = require("../../models/Services");

// GET if hostel head or not
router.get("/", (req, res) => {
  // checkHostelHead(req.query.email).then((result) =>
  //   res.send(result)
  // );
  complaints
    .findAll()
    .then((gigs) => console.log(gigs))
    .catch((err) => console.log(err));
});

function checkHostelHead(email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT hostel_no FROM hostel_heads WHERE email="${email}";`;
    complaints.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result != 0 ? result : false);
    });
  });
}

module.exports = router;
