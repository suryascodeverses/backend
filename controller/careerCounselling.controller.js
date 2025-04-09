const { CareerCounselling, Category, CategoryType } = require("../models");
const server_url = process.env.SERVER_URL || "http://localhost:5000";

// Create
exports.createCounselling = async (req, res) => {
  try {
    const { title, description, price, categoryId, categoryTypeId } = req.body;

    if (!title || !price || !categoryId || !categoryTypeId || !req.file) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "All required fields must be filled and media must be uploaded.",
        });
    }

    const media = {
      path: `${server_url}/uploads${req.file.destination.split("uploads")[1]}/${
        req.file.filename
      }`,
      type: "image",
    };
    const created = await CareerCounselling.create({
      title,
      description,
      price,
      media,
      categoryId,
      categoryTypeId,
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All

exports.getAllCounselling = async (req, res) => {
  try {
    const counsellingList = await CareerCounselling.findAll({
      include: [
        {
          model: Category,
          as: "category", // Alias used in association
          attributes: ["id", "name"],
        },
        {
          model: CategoryType,
          as: "categoryType", // Alias used in association
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json({ success: true, data: counsellingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get One
exports.getCounsellingById = async (req, res) => {
  try {
    const data = await CareerCounselling.findByPk(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Career counselling record not found.",
        });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
exports.updateCounselling = async (req, res) => {
  try {
    const { title, description, price, categoryId, categoryTypeId } = req.body;
    const item = await CareerCounselling.findByPk(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Career counselling not found." });
    }

    let media = item.media;

    if (req.file) {
      media = {
        path: `${server_url}/uploads${
          req.file.destination.split("uploads")[1]
        }/${req.file.filename}`,
        type: "image",
      };
    }

    await item.update({
      title,
      description,
      price,
      categoryId,
      categoryTypeId,
      media,
    });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
exports.deleteCounselling = async (req, res) => {
  try {
    const item = await CareerCounselling.findByPk(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Career counselling not found." });
    }

    await item.destroy();
    res
      .status(200)
      .json({ success: true, message: "Career counselling deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
