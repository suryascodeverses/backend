const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CourseMaterial = sequelize.define(
  "CourseMaterial",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // duration: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    media: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CourseMaterial;
