const express = require("express");
const router = express.Router();
const db = require("../../models/dbfunctions");
const complaints = require("../../models/Complaints");
const services = require("../../models/Services");

//  GET all complaints
router.get("/all", (req, res) => {
  // db.allcomplaints().then(result => res.send(result));
  // complaints
  services
    .findAll()
    .then((gigs) => {
      console.log(gigs);
      res.send(gigs);
    })
    .catch((err) => console.log(err));
});

// TODO change api call to check if complaint exists and returns its status or status code 404 if does not
// GET complaint status
router.get("/status", (req, res) => {
  db.getComplaintStatus(req.query.email).then((result) => res.send(result));
});

// GET complaints of a hostel
router.get("/", (req, res) => {
  // db.getComplaints(req.query.hostel_no).then((result) => res.send(result));
  // services
  complaints
    .create({
      complaint_desc: "111",
      complaint_type: "Short Cable",
      complaint_status: "UNASSIGNED",
      room_no: "1",
    })
    .then(() =>
      complaints
        .findAll()
        .then((gigs) => {
          console.log(gigs);
          res.send(gigs);
        })
        .catch((err) => console.log(err))
    );
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
