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
const CareerCounsellingForm = require("./CareerCounsellingForm");
const FreeResourceMaterial = require("./FreeResourceMaterials");

// ------------------- Associations ------------------- //

// CategoryType → hasMany → Category
CategoryType.hasMany(Category, {
  foreignKey: "categoryTypeId",
  as: "categoryTypeCategories",
});
Category.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

// CategoryType → hasMany → Achievement
CategoryType.hasMany(Achievement, {
  foreignKey: "categoryTypeId",
  as: "categoryTypeAchievements",
});
Achievement.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "achievementCategoryType",
});

// CategoryType → hasMany → Course
CategoryType.hasMany(Course, {
  foreignKey: "categoryTypeId",
  as: "courseCategoryType",
});
Course.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "courseCategoryType",
});

// CategoryType → hasMany → CareerCounselling
CategoryType.hasMany(CareerCounselling, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});
CareerCounselling.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "categoryType",
});

// CategoryType → hasMany → FreeResource
CategoryType.hasMany(FreeResource, {
  foreignKey: "categoryTypeId",
  as: "categoryTypeFreeResources",
});
FreeResource.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  as: "freeResourceCategoryType",
});

// Category → hasMany → Achievement
Category.hasMany(Achievement, {
  foreignKey: "categoryId",
  as: "categoryAchievements",
});
Achievement.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "achievementCategory",
});

// Category → hasMany → Course
Category.hasMany(CourseMaterial, {
  foreignKey: "categoryId",
  as: "courseMaterialCategory",
});
CourseMaterial.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "courseMaterialCategory",
});

// Category → hasMany → CareerCounselling
Category.hasMany(CareerCounselling, {
  foreignKey: "categoryId",
  as: "category",
});
CareerCounselling.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

// Category → hasMany → FreeResource
Category.hasMany(FreeResource, {
  foreignKey: "categoryId",
  as: "categoryFreeResources",
});
FreeResource.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "freeResourceCategory",
});

// Category → hasMany → CareerCounsellingForm
Category.hasMany(CareerCounsellingForm, {
  foreignKey: "categoryId",
  as: "categoryCareerCounsellingForms",
});
CareerCounsellingForm.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "careerCounsellingFormCategory",
});

// Course → hasMany → CourseMaterial
Course.hasMany(CourseMaterial, {
  foreignKey: "courseId",
  as: "courseMaterials",
});
CourseMaterial.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// const FreeResource = require('./FreeResource');
// const FreeResourceMaterial = require('./FreeResourceMaterial');
// const Category = require('./Category');
// const CategoryType = require('./CategoryType');

// Associations
FreeResourceMaterial.belongsTo(FreeResource, {
  foreignKey: "freeResourceId",
  onDelete: "CASCADE",
});
FreeResource.hasMany(FreeResourceMaterial, {
  foreignKey: "freeResourceId",
});

FreeResourceMaterial.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
Category.hasMany(FreeResourceMaterial, {
  foreignKey: "categoryId",
});

FreeResourceMaterial.belongsTo(CategoryType, {
  foreignKey: "categoryTypeId",
  onDelete: "CASCADE",
});
CategoryType.hasMany(FreeResourceMaterial, {
  foreignKey: "categoryTypeId",
});

// ------------------- Exports ------------------- //

module.exports = {
  sequelize,
  Sequelize,
  User,
  Admin,
  Category,
  CategoryType,
  Course,
  FreeResource,
  FreeResourceMaterial,
  Achievement,
  CareerCounselling,
  CourseMaterial,
  CareerCounsellingForm,
};
