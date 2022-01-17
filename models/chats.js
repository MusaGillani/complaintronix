const db = require("../config/db");

function addMessage(reg, text) {
  return new Promise((resolve, reject) => {
    let myQuery = `INSERT INTO chats(msgr_reg,msg_text) VALUES
    (${reg},'${text}');`;
    db.query({ text: myQuery }, (err, result) => {
      if (err) reject(err);
      else {
        myQuery = `SELECT * FROM chats;`;
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
}

function getPreviousMessages() {
  return new Promise((resolve, reject) => {
    let myQuery = `SELECT * FROM chats;`;
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
