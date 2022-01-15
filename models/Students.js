const { DataTypes } = require("sequelize");

const db = require("../config/db");

//! since reg_no is a primary key in hsotel heads
// sequelize takes that as a foreign key tho we do not use it
// either change foreign key in heads table
// or use non primary key here

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
      references: {
        model: "hostel_heads",
        key: "assigned_hostel",
      },
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
