const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Chats = db.define("chats", {
  msg_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  msgr_reg: { type: DataTypes.INTEGER, allowNull: false },
  msg_text: DataTypes.STRING(1000),
  messaged_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Chats;
