const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

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
    },
    categoryTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    freeResourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FreeResourceMaterial;
