const db = require("../config/db");

// TODO refactor functions to pass queries as param and store queries somewhere else

function checkHostelHead(reg_no, hostel_no) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM hostel_heads WHERE reg_no='${reg_no}' AND assigned_hostel='${hostel_no}';`; // query to get check if a hostel_head exists
    db.query({ text: myQuery, rowMode: "array" }, (err, result) => {
      if (err) reject(err);
      else resolve(result != 0 ? result : "empty");
    });
  });
}

module.exports = {
  checkHostelHead,
};
