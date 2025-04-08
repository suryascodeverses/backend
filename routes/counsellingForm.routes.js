// routes/careerCounsellingForm.routes.js

const express = require("express");
const router = express.Router();
const controller = require("../controller/careerCounsellingForm.controller");

// POST - Create new form
router.post("/", controller.createCareerCounsellingForm);

// GET - Get all forms
router.get("/", controller.getAllForms);

// GET - Get form by ID
router.get("/:id", controller.getCareerCounsellingFormById);

// DELETE - Delete form by ID
router.delete("/:id", controller.deleteCareerCounsellingForm);

module.exports = router;
