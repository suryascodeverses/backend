// models/Category.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const CategoryType = require('./CategoryType');
const Course = require('./Course');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryTypeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: CategoryType,
      key: 'id'
    }
  }
}, {
  timestamps: true,
});


module.exports = Category;
