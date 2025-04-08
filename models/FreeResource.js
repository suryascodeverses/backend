// models/FreeResource.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FreeResource = sequelize.define('FreeResource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('pdf', 'video'),
    allowNull: false
  }
}, {
  timestamps: true,
});

module.exports = FreeResource;
