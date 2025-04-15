const { CategoryType, Course, FreeResource } = require("../models");
const { Category } = require("../models");
const categoryTypeIds = require("../utils/categoryTypeIds");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createManyCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No categories provided." });
    }

    const createdCategories = await Category.bulkCreate(categories);
    res.status(201).json({ success: true, data: createdCategories });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCategoryByResource = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const resource = await FreeResource.findByPk(resourceId);
    const category = await Category.findAll({
      where: { categoryTypeId: resource.categoryTypeId },
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getResourceCategories = async (req, res) => {
  try {
    // const { courseId } = req.params;
    // const course = await Course.findByPk(courseId);
    const category = await Category.findAll({
      where: { categoryTypeId: categoryTypeIds.FreeResources },
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCourseCategories = async (req, res) => {
  try {
    // const { courseId } = req.params;
    // const course = await Course.findByPk(courseId);
    const category = await Category.findAll({
      where: { categoryTypeId: categoryTypeIds.Course },
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCounsellingCategories = async (req, res) => {
  try {
    // const { courseId } = req.params;
    // const course = await Course.findByPk(courseId);
    const category = await Category.findAll({
      where: { categoryTypeId: categoryTypeIds.Counselling },
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCategoryByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    const category = await Category.findAll({
      where: { categoryTypeId: course.categoryTypeId },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getCategoryByType = async (req, res) => {
  try {
    const { categoryTypeId } = req.params;
    const category = await Category.findAll({
      where: { categoryTypeId },
      include: {
        model: CategoryType,
        as: "categoryCategoryType", // must match the alias used in association
        attributes: ["id", "name"], // include only what you need
      },
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
