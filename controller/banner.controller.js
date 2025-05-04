const { Banner } = require("../models");
const server_url = process.env.SERVER_URL || "http://localhost:5000";
const { Op } = require("sequelize");

// Create
exports.createBanner = async (req, res) => {
  try {
    const { title, description, link, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required." });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Media file is required.",
      });
    }

    const media = {
      name: req.file.originalname,
      path: `${server_url}/uploads/images/${req.file.filename}`,
      type: "image",
    };

    const banner = await Banner.create({ title, description, link, status, media });

    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All
exports.getAllBanners = async (req, res) => {
  try {
    const { search, status } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    if (status !== undefined) {
      whereClause.status = status === 'true';
    }

    const banners = await Banner.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get One
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found." });
    }
    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
exports.updateBanner = async (req, res) => {
  try {
    const { title, description, link, status } = req.body;
    const banner = await Banner.findByPk(req.params.id);

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found." });
    }

    let media = banner.media;
    if (req.file) {
      media = {
        name: req.file.originalname,
        path: `${server_url}/uploads/images/${req.file.filename}`,
        type: "image",
      };
    }

    await banner.update({ title, description, link, status, media });

    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found." });
    }

    await banner.destroy();
    res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
