const { DataTypes } = require("sequelize");
const sequelize = require("../database/postgres");

const Users = sequelize.define("admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  resetCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  resetCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = Users;
