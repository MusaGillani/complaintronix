const express = require("express");

const logger = require("../../util/logging");
const students = require("../../models/students");

const router = express.Router();

// GET if student exists or not
router.get("/", (req, res) => {
  students.checkStudent(req.query.email,req.query.password)
    .then((result) => res.send(result))
    .catch((error) => {
      logger.error(error.toString());
      console.error(error);
    });
});

// ADD a student if not exists
router.post("/", (req, res) => {
    const data = req.body;
    students
      .addStudent(
        data.reg_no,
        data.name,
        data.email,
        data.password,
        data.hostel_no,
        data.room_no,
      )
      .then((result) => res.sendStatus(result));
  });

module.exports = router;
