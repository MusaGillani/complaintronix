const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Student = db.define(
  "students",
  {
    reg_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    student_name: DataTypes.STRING(20),
    email: DataTypes.STRING(20),
    hostel_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Student;
