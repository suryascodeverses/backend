const { Achievement } = require("../models");
const server_url = process.env.SERVER_URL || "http://localhost:5000";
const { Op } = require("sequelize");

// Create
exports.createAchievement = async (req, res) => {
  try {
    const { title, type, year, media: url } = req.body;

    if (!title || !type || !year) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (type === "gallery" && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Media file is required for gallery type.",
      });
    }

    let media = {};
    if (type === "gallery") {
      media = {
        name: req.file.originalname,

        path: `${server_url}/uploads/images/${req.file.filename}`,
        type: "image",
      };
    } else if (type === "video") {
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "Media URL is required for video type.",
        });
      }
      media = {
        name: "video",
        path: url,
        type: "video",
      };
    }

    const achievement = await Achievement.create({ title, type, year, media });

    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All

exports.getAllAchievements = async (req, res) => {
  try {
    const { search, type, year } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` }; // Use Op.like for MySQL
    }

    if (type) {
      whereClause.type = type;
    }

    if (year) {
      whereClause.year = year;
    }

    const achievements = await Achievement.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, data: achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get One
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id);
    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Achievement not found." });
    }
    res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAchievementYears = async (req, res) => {
  try {
    const years = await Achievement.findAll({
      attributes: ["year"],
      group: ["year"],
      order: [["year", "DESC"]], // Optional: sort years in descending order
      raw: true,
    });

    const distinctYears = years.map((item) => item.year);

    res.status(200).json({ success: true, data: distinctYears });
  } catch (error) {
    console.error("Error fetching achievement years:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update
exports.updateAchievement = async (req, res) => {
  try {
    const { title, type, year, media: url } = req.body;
    const achievement = await Achievement.findByPk(req.params.id);

    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Achievement not found." });
    }

    let media = achievement.media;
    if (type === "gallery" && req.file) {
      media = {
        name: req.file.originalname,

        path: `${server_url}/uploads/images/${req.file.filename}`,
        type: "image",
      };
    } else if (type === "video" && url) {
      media = {
        name: "video",

        path: url,
        type: "video",
      };
    }

    await achievement.update({ title, type, year, media });

    res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id);
    if (!achievement) {
      return res
        .status(404)
        .json({ success: false, message: "Achievement not found." });
    }

    await achievement.destroy();
    res
      .status(200)
      .json({ success: true, message: "Achievement deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
