const { DataTypes } = require("sequelize");

const db = require("../config/db");

const HostelHead = db.define(
  "hostel_heads",
  {
    reg_no: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    head_name: DataTypes.STRING(20),
    email: DataTypes.STRING(20),
    assigned_hostel: { type: DataTypes.NUMBER, unique: true },
  },
  {
    timestamps: false,
  }
);

module.exports = HostelHead;
