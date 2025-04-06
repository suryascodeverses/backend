const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sequelize } = require("../config/db");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: bcrypt.hashSync("12345678"),
    },

    confirmationToken: DataTypes.STRING,
    confirmationTokenExpires: DataTypes.DATE,
  },
  {
    timestamps: true,
  }
);

Admin.prototype.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  this.confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return token;
};

module.exports = Admin;
