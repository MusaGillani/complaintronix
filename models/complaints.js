const hstore = require("pg-hstore")();
const db = require("../config/db");

// TODO refactor functions to pass queries as param and store queries somewhere else

function test() {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM hostel_heads;`;
    // db.query(text,params,callback)
    // if no params, can omit passing that
    db.query({ text: myQuery, rowMode: "array" }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function allcomplaints() {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM complaints;`;
    db.query(myQuery, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
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

function getComplaintStatus(email) {
  return new Promise((resolve, reject) => {
    console.log(email);
    myQuery = `SELECT * FROM complaints inner join students on complaints.complaintee_reg=students.reg_no  where students.email = '${email}';`;
    db.query(myQuery, (err, result, fields) => {
      if (err) reject(err);
      else {
        console.log(result.rows);
        resolve(result.rows.length != 0 ? result.rows : "empty");
      }
    });
  });
}

function addComplaint(email, complaint_desc, complaint_type) {
  return new Promise((resolve, reject) => {
    let reg_no, hostel_no, room_no;
    console.log(email);
    db.query(
      `SELECT reg_no, hostel_no, room_no from students where email='${email}';`,
      (err, result, fields) => {
        console.log(result);
        reg_no = result.rows[0].reg_no;
        hostel_no = result.rows[0].hostel_no;
        room_no = result.rows[0].room_no;
        console.log(reg_no);
        console.log(hostel_no);
        console.log(room_no);
        let res = 200;
        let myQuery = `SELECT * FROM complaints WHERE complaintee_reg=${reg_no};`;
        db.query(myQuery, (err, result, fields) => {
          if (err) reject(err);
          else {
            console.log(result);
            if (result.rows.length == 0) {
              myQuery = `INSERT INTO complaints(complaintee_reg,complaint_desc, complaint_type, hostel_no, room_no) VALUES
              (${reg_no},'${complaint_desc}','${complaint_type}',${hostel_no},${room_no});`;
              db.query(myQuery, function (err, result, fields) {
                if (err) reject(err);
                else resolve("added");
              });
            } else resolve("exists");
          }
        });
      }
    );
  });
}

function updateComplaint(reg, status) {
  return new Promise((resolve, reject) => {
    let myQuery = `UPDATE complaints set complaint_status='${status}'
      WHERE complaintee_reg=${reg};`;
    db.query(myQuery, (err) => {
      if (err) throw err;
    });
    myQuery = `SELECT * FROM complaints
      WHERE complaintee_reg=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function deleteComplaint(reg) {
  return new Promise((resolve, reject) => {
    let res;
    let myQuery = `SELECT * FROM complaints
      WHERE complaintee_reg=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else res = result;
    });

    myQuery = `DELETE FROM complaints
      WHERE complaintee_reg=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else {
        console.log("deleted successfully");
        resolve(res);
      }
    });
  });
}

function deleteAllComplaints() {
  return new Promise((resolve, reject) => {
    let myQuery = `DELETE FROM complaints;`;
    db.query(myQuery, (err, result, fields) => {
      if (err) reject(err);
      else resolve("deleted successfully");
    });
  });
}

module.exports = {
  test,
  allcomplaints,
  getComplaints,
  getComplaintStatus,
  addComplaint,
  updateComplaint,
  deleteComplaint,
  deleteAllComplaints,
};
