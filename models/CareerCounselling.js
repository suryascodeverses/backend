// models/CareerCounselling.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./Category');

const CareerCounselling = sequelize.define('CareerCounselling', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  highlight: DataTypes.BOOLEAN,
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



module.exports = CareerCounselling;
