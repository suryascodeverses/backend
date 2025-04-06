const { CategoryType } = require("../models");

exports.createCategoryType = async (req, res) => {
  try {
    const categoryType = await CategoryType.create(req.body);
    res.status(201).json({ success: true, data: categoryType });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.createManyCategoryTypes = async (req, res) => {
  try {
    const { types } = req.body;

    if (!Array.isArray(types) || types.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const categoryTypes = types.map((type) => ({ name: type })); // Assuming 'name' is the column
    const createdCategoryTypes = await CategoryType.bulkCreate(categoryTypes);

    res.status(201).json({ success: true, data: createdCategoryTypes });
  } catch (error) {
    console.log(error);
    next(error)
  }
};
exports.getAllCategoryTypes = async (req, res) => {
  try {
    const types = await CategoryType.findAll();
    res.status(200).json({ success: true, data: types });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategoryTypeById = async (req, res) => {
  try {
    const type = await CategoryType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: type });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategoryType = async (req, res) => {
  try {
    const [updated] = await CategoryType.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    const updatedType = await CategoryType.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedType });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCategoryType = async (req, res) => {
  try {
    const deleted = await CategoryType.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
