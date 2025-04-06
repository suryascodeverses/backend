const express = require("express");
const router = express.Router();
const categoryTypeController = require("../controller/categoryType.controller");

router.post("/", categoryTypeController.createCategoryType);
router.post("/add-all", categoryTypeController.createManyCategoryTypes);

router.get("/", categoryTypeController.getAllCategoryTypes);
router.get("/:id", categoryTypeController.getCategoryTypeById);
router.put("/:id", categoryTypeController.updateCategoryType);
router.delete("/:id", categoryTypeController.deleteCategoryType);

module.exports = router;
