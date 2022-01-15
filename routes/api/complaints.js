const express = require("express");
const router = express.Router();
const db = require("../../models/dbfunctions");

const logger = require("../../util/logging");
//  GET all complaints
router.get("/all", (req, res) => {
  // db.allcomplaints().then(result => res.send(result));
});

// GET complaint status
router.get("/status", (req, res) => {
  db.getComplaintStatus(req.query.email).then((result) => res.send(result));
});

// GET complaints of a hostel
router.get("/", (req, res) => {
  // db.getComplaints(req.query.hostel_no).then((result) => res.send(result));
});

// (POST) Add a new complaint
router.post("/", (req, res) => {
  const data = req.body;
  db.addComplaint(
    data.reg_no,
    data.student_name,
    data.email,
    data.hostel_no,
    data.room_no,
    data.phone_no,
    data.type
  ).then((result) => res.sendStatus(result));
});

// (PUT) Update a complaint status
router.put("/", (req, res) => {
  db.updateComplaint(req.body.reg_no, req.body.status).then((result) =>
    res.send(result)
  );
});

// DELETE a complaint
router.delete("/", (req, res) => {
  db.deleteComplaint(req.body.reg_no).then((result) => res.send(result));
});

// DELETE all complaints
router.delete("/all", (req, res) => {
  db.deleteAllComplaints().then((result) => res.send(result));
});

module.exports = router;
