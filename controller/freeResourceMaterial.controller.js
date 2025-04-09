const {
  FreeResourceMaterial,
  FreeResource,
  CategoryType,
} = require("../models");
const path = require("path");

const server_url = process.env.SERVER_URL;

// Create Free Resource Material
exports.createFreeResourceMaterial = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      categoryTypeId,
      freeResourceId,
      type,
      media: url,
    } = req.body;

    if (type !== "video" && !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Media file is required" });
    }

    let media = {};
    if (type === "pdf") {
      media = {
        path: `${server_url}/uploads${
          req.file.destination.split("uploads")[1]
        }/${req.file.filename}`,
        type: "pdf",
      };
    } else if (type === "video") {
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "Media URL is required for video type.",
        });
      }
      media = {
        path: url,
        type: "video",
      };
    }

    const material = await FreeResourceMaterial.create({
      title,
      media,
      categoryId,
      categoryTypeId,
      freeResourceId,
      type,
    });

    res.status(201).json({ success: true, data: material });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Bulk Create Free Resource Materials (media must come as URL or in media object in body)
exports.bulkCreateFreeResourceMaterials = async (req, res) => {
  try {
    const materials = req.body.materials;

    if (!Array.isArray(materials) || materials.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Materials array is required" });
    }

    const created = await FreeResourceMaterial.bulkCreate(materials);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Free Resource Materials
exports.getAllFreeResourceMaterials = async (req, res) => {
  try {
    const materials = await FreeResourceMaterial.findAll({
      include: [
        {
          model: FreeResource,
          as: "materialFreeResource", // Alias used in association
          attributes: ["id", "title", "type"],
        },
        {
          model: CategoryType,
          as: "materialCategoryType", // Alias used in association
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Free Resource Materials by Free Resource ID
exports.getFreeResourceMaterialsByResource = async (req, res) => {
  try {
    const { freeResourceId } = req.params;
    const materials = await FreeResourceMaterial.findAll({
      where: { freeResourceId },
    });
    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Free Resource Material by ID
exports.getFreeResourceMaterialById = async (req, res) => {
  try {
    const material = await FreeResourceMaterial.findByPk(req.params.id);
    if (!material)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Free Resource Material
exports.updateFreeResourceMaterial = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      categoryTypeId,
      freeResourceId,
      type,
      media: url,
    } = req.body;

    let media = {};
    if (type === "pdf") {
      media = {
        path: `${server_url}/uploads${
          req.file.destination.split("uploads")[1]
        }/${req.file.filename}`,
        type: "pdf",
      };
    } else if (type === "video") {
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "Media URL is required for video type.",
        });
      }
      media = {
        path: url,
        type: "video",
      };
    }

    const [updated] = await FreeResourceMaterial.update(
      {
        title,
        categoryId,
        categoryTypeId,
        freeResourceId,
        ...(media && { media }),
      },
      { where: { id: req.params.id } }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    const updatedMaterial = await FreeResourceMaterial.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedMaterial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Free Resource Material
exports.deleteFreeResourceMaterial = async (req, res) => {
  try {
    const deleted = await FreeResourceMaterial.destroy({
      where: { id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
