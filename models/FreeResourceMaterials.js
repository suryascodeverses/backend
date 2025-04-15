const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const FreeResource = require("./FreeResource");
const CategoryType = require("./CategoryType");
const Category = require("./Category");

const FreeResourceMaterial = sequelize.define(
  "FreeResourceMaterial",
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
    media: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("pdf", "video"),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    categoryTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryType,
        key: "id",
      },
    },
    freeResourceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: FreeResource,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FreeResourceMaterial;
