const { FreeResource } = require('../models');

// Create
exports.createFreeResource = async (req, res) => {
  try {
    const { title, type } = req.body;
    if (!title || !type) {
      return res.status(400).json({ success: false, message: 'Title and type are required.' });
    }

    const newResource = await FreeResource.create({ title, type });
    res.status(201).json({ success: true, data: newResource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All
exports.getAllFreeResources = async (req, res) => {
  try {
    const resources = await FreeResource.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: resources });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get By ID
exports.getFreeResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await FreeResource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'FreeResource not found' });
    }

    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update
exports.updateFreeResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type } = req.body;

    const resource = await FreeResource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'FreeResource not found' });
    }

    await resource.update({ title, type });
    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete
exports.deleteFreeResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await FreeResource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'FreeResource not found' });
    }

    await resource.destroy();
    res.status(200).json({ success: true, message: 'FreeResource deleted successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Bulk Create
exports.bulkCreateFreeResources = async (req, res) => {
  try {
    const resources = req.body; // [{ title, type }, ...]

    if (!Array.isArray(resources) || resources.length === 0) {
      return res.status(400).json({ success: false, message: 'Provide an array of resources to create.' });
    }

    const createdResources = await FreeResource.bulkCreate(resources, { validate: true });
    res.status(201).json({ success: true, data: createdResources });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
