// controllers/courseMaterialController.js
const { CourseMaterial, Category, Course } = require("../models");
const path = require("path");
const { Op } = require("sequelize");

const server_url = process.env.SERVER_URL;

// Create Course Material
exports.createCourseMaterial = async (req, res) => {
  try {
    const { title, description, duration, fees, courseId, categoryId } =
      req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Media file is required" });
    }

    const filePath = `${server_url}/uploads${
      req.file.destination.split("uploads")[1]
    }/${req.file.filename}`;
    const media = {
      name: req.file.originalname,
      path: filePath,
      type: req.file.mimetype,
    };

    const material = await CourseMaterial.create({
      title,
      description,
      duration,
      fees,
      media,
      courseId,
      categoryId,
    });

    res.status(201).json({ success: true, data: material });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Course Materials
exports.getAllCourseMaterials = async (req, res) => {
  try {
    const materials = await CourseMaterial.findAll({
      include: [
        {
          model: Category,
          as: "courseMaterialCategory", // must match the alias used in association
          attributes: ["id", "name"], // include only what you need
        },
        {
          model: Course,
          as: "courseMaterialCourse", // must match the alias used in association
          attributes: ["id", "title"], // include only what you need
        },
      ],
    });
    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCourseMaterialsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { search, categoryId } = req.query;

    const whereClause = {
      courseId,
    };

    // Handle search filter (on 'title' — change as needed)
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` }; // Use Op.like for MySQL
    }

    // Handle multiple categoryId filters (OR condition)
    if (categoryId) {
      const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];
      whereClause.categoryId = { [Op.in]: categoryIds };
    }

    const materials = await CourseMaterial.findAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: "courseMaterialCategory", // must match the alias used in association
          attributes: ["id", "name"], // include only what you need
        },
        {
          model: Course,
          as: "courseMaterialCourse", // must match the alias used in association
          attributes: ["id", "title"], // include only what you need
        },
      ],
    });

    res.status(200).json({ success: true, data: materials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Course Material by ID
exports.getCourseMaterialById = async (req, res) => {
  try {
    const material = await CourseMaterial.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "courseMaterialCategory", // must match the alias used in association
          attributes: ["id", "name"], // include only what you need
        },
        {
          model: Course,
          as: "courseMaterialCourse", // must match the alias used in association
          attributes: ["id", "title"], // include only what you need
        },
      ],
    });
    if (!material)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: material });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Course Material
exports.updateCourseMaterial = async (req, res) => {
  try {
    const { title, description, duration, fees, courseId, categoryId } =
      req.body;

    let media = null;
    if (req.file) {
      const filePath = `${server_url}/uploads${
        req.file.destination.split("uploads")[1]
      }/${req.file.filename}`;
      media = {
        name: req.file.originalname,
        path: filePath,
        type: req.file.mimetype,
      };
    }

    const [updated] = await CourseMaterial.update(
      {
        title,
        description,
        duration,
        fees,
        categoryId,
        courseId,
        ...(media && { media }),
      },
      { where: { id: req.params.id } }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    const updatedMaterial = await CourseMaterial.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedMaterial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Course Material
exports.deleteCourseMaterial = async (req, res) => {
  try {
    const deleted = await CourseMaterial.destroy({
      where: { id: req.params.id },
    });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
