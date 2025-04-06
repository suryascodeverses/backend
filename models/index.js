const Sequelize = require("sequelize");
const { sequelize } = require("../config/db");

const User = require("./User");
const Admin = require("./Admin");

const Category = require("./Category");
const CategoryType = require("./CategoryType");
const Course = require("./Course");
const Achievement = require("./Achievement");
const CareerCounselling = require("./CareerCounselling");
const FreeResource = require("./FreeResource");

const CourseMaterial = require("./CourseMaterial");

// Define associations here AFTER importing all models
//
// has many
CategoryType.hasMany(Category, {
  foreignKey: "categoryId",
  as: "categories",
});

CategoryType.hasMany(Achievement, {
  foreignKey: "achievementId",
  as: "achievements",
});

CategoryType.hasMany(Course, {
  foreignKey: "courseId",
  as: "courses",
});

CategoryType.hasMany(CareerCounselling, {
  foreignKey: "careerCounsellingId",
  as: "careerCounsellings",
});

CategoryType.hasMany(FreeResource, {
  foreignKey: "freeResourceId",
  as: "freeResources",
});

// category has many

Category.hasMany(Category, {
  foreignKey: "categoryId",
  as: "categories",
});

Category.hasMany(Achievement, {
  foreignKey: "achievementId",
  as: "achievements",
});

Category.hasMany(Course, {
  foreignKey: "courseId",
  as: "courses",
});

Category.hasMany(CareerCounselling, {
  foreignKey: "careerCounsellingId",
  as: "careerCounsellings",
});

Category.hasMany(FreeResource, {
  foreignKey: "freeResourceId",
  as: "freeResources",
});

//belongs to
Category.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

FreeResource.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

FreeResource.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

Achievement.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

Achievement.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

CareerCounselling.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

CareerCounselling.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

Course.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Course.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

Course.hasMany(CourseMaterial, {
  foreignKey: "courseMaterialId",
  as: "courseMaterial",
});

CourseMaterial.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Admin,
  Category,
  CategoryType,
  Course,
  FreeResource,
  Achievement,
  CareerCounselling,
  CourseMaterial
};
