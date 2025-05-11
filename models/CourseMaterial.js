const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Category = require("./Category");
const Course = require("./Course");

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
      allowNull: true,
    },
    media: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Course,
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CourseMaterial;
