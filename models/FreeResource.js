// models/FreeResource.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const FreeResource = sequelize.define('FreeResource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  type: DataTypes.STRING, // e.g., PDF, Video, etc.
  mediaUrl: DataTypes.STRING,
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: Category,
      key: 'id',
    }
  }
}, {
  timestamps: true,
});


module.exports = FreeResource;
