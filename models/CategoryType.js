// models/CategoryType.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Course = require("./Course");

const CategoryType = sequelize.define(
  "CategoryType",
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
  },
  {
    timestamps: true,
  }
);


module.exports = CategoryType;
