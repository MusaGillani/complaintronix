const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Services = db.define(
  "services",
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    service_desc: DataTypes.STRING(150),
    service_ip: DataTypes.STRING(150),
  },
  {
    timestamps: false,
  }
);

module.exports = Services;
