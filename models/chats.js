const db = require("../config/db");

function getRegFromEmail(email) {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT reg_no FROM students WHERE email='${email}';`;
    db.query(myQuery, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result.rows[0].reg_no);
      }
    });
  });
}

function addMessage(email, text) {
  return new Promise((resolve, reject) => {
    let reg;
    getRegFromEmail(email).then((result) => {
      reg = result;
      console.log(reg);

      let myQuery = `INSERT INTO chats(msgr_reg,msg_text) VALUES
        (${reg},'${text}');`;
      db.query({ text: myQuery }, (err, result) => {
        if (err) reject(err);
        else {
          myQuery = `SELECT c.msgr_reg, c.msg_text, s.email, c.messaged_at FROM chats c INNER JOIN students s ON c.msgr_reg=s.reg_no;`;
          db.query(myQuery, (err, result) => {
            if (err) reject(err);
            else {
              // console.log(result.rows);
              resolve(result.rows);
            }
          });
        }
      });
    });
  });
}

function getPreviousMessages() {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT c.msgr_reg, c.msg_text, s.email, c.messaged_at FROM chats c INNER JOIN students s ON c.msgr_reg=s.reg_no;`;
    db.query(myQuery, (err, result) => {
      if (err) reject(err);
      else {
        // console.log(result.rows);
        resolve(result.rows);
      }
    });
  });
}

module.exports = {
  addMessage,
  getPreviousMessages,
};
