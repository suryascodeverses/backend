// controller/careerCounsellingForm.controller.js

const { CareerCounsellingForm, Category } = require("../models");

// ✅ Create a new form
exports.createCareerCounsellingForm = async (req, res) => {
  try {
    const { name, email, phone, description, categoryId } = req.body;

    if (!name || !email || !phone || !categoryId) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newForm = await CareerCounsellingForm.create({
      name,
      email,
      phone,
      description,
      categoryId,
    });

    return res.status(201).json(newForm);
  } catch (error) {
    console.error("Error creating form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all forms with category
exports.getAllForms = async (req, res) => {
  try {
    const forms = await CareerCounsellingForm.findAll({
      include: {
        model: Category,
        as: "careerCounsellingFormCategory",
        attributes: ["id", "name"],
      },
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: forms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get form by ID
exports.getCareerCounsellingFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await CareerCounsellingForm.findByPk(id, {
      include: {
        model: Category,
        as: "careerCounsellingFormCategory",
        attributes: ["id", "name"],
      },
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete form by ID
exports.deleteCareerCounsellingForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CareerCounsellingForm.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
