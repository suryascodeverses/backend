const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const CategoryType = require("./CategoryType");

const Course = sequelize.define(
  "Course",
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

    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    categoryTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryType,
        key: 'id'
      }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Course;
