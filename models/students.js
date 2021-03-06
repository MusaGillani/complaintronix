const db = require("../config/db");

function addStudent(reg_no, name, email, password, hostel_no, room_no) {
  return new Promise((resolve, reject) => {
    let res = 200;
    let myQuery = `SELECT * FROM students WHERE reg_no=${reg_no};`;
    db.query(myQuery, (err, result, fields) => {
      if (err) reject(err);
      else {
        console.log(result);
        if (result.rows.length == 0) {
          myQuery = `INSERT INTO students VALUES
      (${reg_no},'${name}','${email}','${password}',${hostel_no},${room_no});`;
          db.query(myQuery, function (err, result, fields) {
            if (err) reject(err);
            else resolve("added");
          });
        } else resolve("exists");
      }
    });
  });
}

function checkStudent(email, password) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM students WHERE email='${email}' AND password='${password}';`; // query to get check if a hostel_head exists
    db.query({ text: myQuery, rowMode: "array" }, (err, result) => {
      if (err) reject(err);
      else resolve(result.rows.length != 0 ? result : "empty");
    });
  });
}

module.exports = {
  addStudent,
  checkStudent,
};
