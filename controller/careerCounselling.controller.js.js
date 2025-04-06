const { CareerCounselling } = require("../models");

exports.createCounselling = async (req, res) => {
  try {
    const counselling = await CareerCounselling.create(req.body);
    res.status(201).json({ success: true, data: counselling });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllCounselling = async (req, res) => {
  try {
    const counsellingList = await CareerCounselling.findAll();
    res.status(200).json({ success: true, data: counsellingList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCounsellingById = async (req, res) => {
  try {
    const counselling = await CareerCounselling.findByPk(req.params.id);
    if (!counselling)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: counselling });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCounselling = async (req, res) => {
  try {
    const [updated] = await CareerCounselling.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    const updatedCounselling = await CareerCounselling.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedCounselling });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCounselling = async (req, res) => {
  try {
    const deleted = await CareerCounselling.destroy({
      where: { id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
