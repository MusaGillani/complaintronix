const express = require("express");
const router = express.Router();
const complaints = require("../../models/complaints");

const logger = require("../../util/logging");
//  GET all complaints
router.get("/all", (req, res) => {
  complaints.allcomplaints().then(result => res.send(result));
});

// GET complaint status
router.get("/status", (req, res) => {
  complaints
    .getComplaintStatus(req.query.reg_no)
    .then((result) => res.send(result));
});

// GET complaints of a hostel
router.get("/", (req, res) => {
  // complaints.getComplaints(req.query.hostel_no).then((result) => res.send(result));
  complaints
  .getComplaints(req.query.hostel_no)
  .then(result=>res.send(result));
});

// (POST) Add a new complaint
router.post("/", (req, res) => {
  const data = req.body;
  complaints
    .addComplaint(
      data.reg_no,
      data.complaint_desc,
      data.complaint_type,
      data.hostel_no,
      data.room_no,
    )
    .then((result) => res.send(result));
});

// (PUT) Update a complaint status
router.put("/", (req, res) => {
  complaints
    .updateComplaint(req.body.reg_no, req.body.status)
    .then((result) => res.send(result));
});

// DELETE a complaint
router.delete("/", (req, res) => {
  complaints
    .deleteComplaint(req.body.reg_no)
    .then((result) => res.send(result));
});

// DELETE all complaints
router.delete("/all", (req, res) => {
  complaints.deleteAllComplaints().then((result) => res.send(result));
});

module.exports = router;
