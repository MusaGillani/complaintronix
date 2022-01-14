const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Complaints = db.define(
  "complaints",
  {
    complaint_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // complaintee_reg: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    complaint_desc: DataTypes.STRING(150),
    complaint_type: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [
          ["Ethernet Issue", "Short Cable", "Cable Broken", "Router Problem"],
        ],
      },
    },
    complaint_status: {
      type: DataTypes.STRING(20),
      validate: { isIn: [["UNASSIGNED", "ASSIGNED", "RESOLVED"]] },
    },
    // hostel_no: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    room_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // assigned_to: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = Complaints;
