const db = require("./db");

// TODO refactor functions to pass queries as param and store queries somewhere else

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

function addComplaint(reg, name, email, hostel_no, room_no, phone_no, type) {
  return new Promise((resolve, reject) => {
    let res = 200;
    let myQuery = `SELECT * FROM complaints WHERE reg_no=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else {
        if (result != 0) res = 409;
        resolve(res);
      }
    });
    // if(res == 200){
    myQuery = `INSERT INTO complaints(reg_no,student_name,email,hostel_no,room_no,phone_no,type,status)
      VALUES
      (${reg},'${name}','${email}',${hostel_no},${room_no},'${phone_no}','${type}','pending');`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else resolve(res);
    });
    // }
  });
}

function updateComplaint(reg, status) {
  return new Promise((resolve, reject) => {
    let myQuery = `UPDATE complaints set status='${status}'
      WHERE reg_no=${reg};`;
    db.query(myQuery, (err) => {
      if (err) throw err;
    });
    myQuery = `SELECT * FROM complaints
      WHERE reg_no=${reg};`;
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
      WHERE reg_no=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else res = result;
    });

    myQuery = `DELETE FROM complaints
      WHERE reg_no=${reg};`;
    db.query(myQuery, function (err, result, fields) {
      if (err) reject(err);
      else {
        console.log("deleted successfully");
        resolve(res);
      }
    });
  });
}

module.exports = {
  allcomplaints,
  getComplaints,
  addComplaint,
  updateComplaint,
  deleteComplaint,
};
