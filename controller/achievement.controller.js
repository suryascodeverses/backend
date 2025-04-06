const { Achievement } = require("../models");

exports.createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: achievement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.status(200).json({ success: true, data: achievements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id);
    if (!achievement)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: achievement });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const [updated] = await Achievement.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    const updatedAchievement = await Achievement.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedAchievement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
