const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Logs = db.define(
  "logs",
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    operation_type: DataTypes.STRING(20),
    table_name: DataTypes.STRING(20),
    logged_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Logs;
