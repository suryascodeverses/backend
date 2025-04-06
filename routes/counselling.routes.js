const express = require("express");
const router = express.Router();
const counsellingController = require("../controller/careerCounselling.controller.js");

router.post("/", counsellingController.createCounselling);
router.get("/", counsellingController.getAllCounselling);
router.get("/:id", counsellingController.getCounsellingById);
router.put("/:id", counsellingController.updateCounselling);
router.delete("/:id", counsellingController.deleteCounselling);

module.exports = router;
