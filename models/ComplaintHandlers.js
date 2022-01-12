const { DataTypes } = require("sequelize");

const db = require("../config/db");

const ComplaintHandlers = db.define("complaint_handlers", {
  reg_no: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    allowNull: false,
  },
  handler_name: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  hostel_assigned: { type: DataTypes.INTEGER, allowNull: false },
  room_no: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = ComplaintHandlers;
