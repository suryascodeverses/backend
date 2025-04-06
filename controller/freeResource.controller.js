const { FreeResource } = require("../models");

exports.createFreeResource = async (req, res) => {
  try {
    const resource = await FreeResource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllFreeResources = async (req, res) => {
  try {
    const resources = await FreeResource.findAll();
    res.status(200).json({ success: true, data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFreeResourceById = async (req, res) => {
  try {
    const resource = await FreeResource.findByPk(req.params.id);
    if (!resource)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateFreeResource = async (req, res) => {
  try {
    const [updated] = await FreeResource.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });
    const updatedResource = await FreeResource.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedResource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteFreeResource = async (req, res) => {
  try {
    const deleted = await FreeResource.destroy({
      where: { id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
