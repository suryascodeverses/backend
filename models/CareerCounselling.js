const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Category = require("./Category");
const CategoryType = require("./CategoryType");

const CareerCounselling = sequelize.define(
  "CareerCounselling",
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
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    media: {
      type: DataTypes.JSON,
      allowNull: false,
    },  
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
    },
    categoryTypeId: {
      type: DataTypes.UUID,
      references: {
        model: CategoryType,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CareerCounselling;
