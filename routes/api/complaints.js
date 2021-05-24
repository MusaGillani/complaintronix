const express = require("express");
const router = express.Router();
const db = require("../../models/dbfunctions");


//  GET all complaints
router.get("/all",(req,res) => {
  db.allcomplaints().then(result => res.send(result));
})

// GET complaints of a hostel
router.get("/", (req, res) => {
  console.log(req.query.hostel_no);
  db.getComplaints(req.query.hostel_no).then((result) => res.send(result));
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
  ).then((result) => res.send(result));
});

// (PUT) Update a complaint status
router.put("/", (req, res) => {
  db.updateComplaint(req.body.id).then((result) => res.send(result));
});

// DELETE a complaint
router.delete("/", (req, res) => {
  db.deleteComplaint(req.body.id).then((result) => res.send(result));
});


module.exports = router;
