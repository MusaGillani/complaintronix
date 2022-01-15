const db = require("../config/db");

// TODO refactor functions to pass queries as param and store queries somewhere else

function test() {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM students;`;
    // db.query(text,params,callback)
    // if no params, can omit passing that
    db.query(myQuery, (err, result) => {
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

function getComplaintStatus(reg_no) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM complaints WHERE complaintee_reg='${reg_no}';`; // query to get complaint status
    db.query(myQuery, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result != 0 ? result : "empty");
    });
  });
}

function addComplaint(
  reg_no,
  complaint_desc,
  complaint_type,
  hostel_no,
  room_no
) {
  return new Promise((resolve, reject) => {
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
