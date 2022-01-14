const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Student = db.define(
  "students",
  {
    reg_no: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    student_name: DataTypes.STRING(20),
    email: DataTypes.STRING(20),
    hostel_no: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    room_no: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Student;
