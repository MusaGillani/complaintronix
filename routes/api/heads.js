const express = require("express");

const logger = require("../../util/logging");
const db = require("../../models/dbfunctions");
// const HostelHeads = require("../../models/HostelHeads");

const router = express.Router();

// GET if hostel head or not
router.get("/", (req, res) => {
  db.test()
    .then((result) => res.send(result))
    .catch((error) => {
      logger.error(error.toString());
      console.error(error);
    });
  // checkHostelHead(req.query.email).then((result) =>
  //   res.send(result)
  // );
  // HostelHeads.findAll()
  //   .then((gigs) => {
  //     console.log(gigs);
  //     logger.debug(gigs);
  //     res.send(gigs);
  //   })
  //   .catch((error) => {
  //     logger.error(error.toString());
  //     console.error(error);
  //   });
});

/*
router.get("/run", (req, res) => {
  HostelHeads.bulkCreate([
    {
      reg_no: 2018468,
      head_name: "syed nabeel",
      email: "u2018468@giki.edu.pk",
      assigned_hostel: 1,
    },
    {
      reg_no: 2018460,
      head_name: "syed musa",
      email: "u2018460@giki.edu.pk",
      assigned_hostel: 2,
    },
    {
      reg_no: 2018146,
      head_name: "hassan raza",
      email: "u2018146@giki.edu.pk",
      assigned_hostel: 3,
    },
    {
      reg_no: 2018047,
      head_name: "ahmed nadeem",
      email: "u2018047@giki.edu.pk",
      assigned_hostel: 4,
    },
    {
      reg_no: 2018129,
      head_name: "hamza bashir",
      email: "u2018129@giki.edu.pk",
      assigned_hostel: 5,
    },
    {
      reg_no: 2018116,
      head_name: "fawad ahmed",
      email: "u2018116@giki.edu.pk",
      assigned_hostel: 6,
    },
    {
      reg_no: 2018229,
      head_name: "Zainab Khan",
      email: "u2018229@giki.edu.pk",
      assigned_hostel: 7,
    },
    {
      reg_no: 2018515,
      head_name: "Zain Ul Abideen",
      email: "u2018515@giki.edu.pk",
      assigned_hostel: 8,
    },
    {
      reg_no: 2018143,
      head_name: "Hassan Attique",
      email: "u2018143@giki.edu.pk",
      assigned_hostel: 9,
    },
    {
      reg_no: 2018102,
      head_name: "Danial Khan",
      email: "u2018102@giki.edu.pk",
      assigned_hostel: 10,
    },
    {
      reg_no: 2018121,
      head_name: "Saad Khan",
      email: "u2018121@giki.edu.pk",
      assigned_hostel: 11,
    },
    {
      reg_no: 2018453,
      head_name: "Syed Eisa",
      email: "u2018453@giki.edu.pk",
      assigned_hostel: 12,
    },
  ])
    .then(() => {
      logger.debug("added heads");
      console.log("added heads");
      // try {
      // require("../../models/Students")
      //   .bulkCreate([
      //     // {
      //     //   reg_no: 2021001,
      //     //   student_name: "Hamza Khan",
      //     //   email: "u2018453@giki.edu.pk",
      //     //   assigned_hostel: 12,
      //     // },
      //     [
      //       {
      //         reg_no: 2021002,
      //         student_name: "Maziyar Khan",
      //         email: "u2021002@giki.edu.pk",
      //         hostel_no: 1,
      //         room_no: 67,
      //       },
      //       {
      //         reg_no: 2021003,
      //         student_name: "Shah Fahad",
      //         email: "u2021003@giki.edu.pk",
      //         hostel_no: 9,
      //         room_no: 100,
      //       },
      //       {
      //         reg_no: 2020456,
      //         student_name: "Rehan Khan",
      //         email: "u2021456@giki.edu.pk",
      //         hostel_no: 4,
      //         room_no: 1,
      //       },
      //       {
      //         reg_no: 2021089,
      //         student_name: "Nimra Khan",
      //         email: "u2021453@giki.edu.pk",
      //         hostel_no: 4,
      //         room_no: 100,
      //       },
      //     ],
      //   ])
      //   // } catch (err) {
      //   //   logger.error(err.toString());
      //   //   console.log(err);
      //   // }
      //   .then(() => res.send("added students"))
      //   .catch((err) => {
      //     logger.error(err.toString());
      //     console.log(err);
      //   });
      res.send();
    })
    .catch((err) => {
      logger.error(err.toString());
      console.log(err);
    });
});
*/

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
