// models/Achievement.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const Achievement = sequelize.define('Achievement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  media: DataTypes.JSON, // images/videos/testimonials
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


module.exports = Achievement;
