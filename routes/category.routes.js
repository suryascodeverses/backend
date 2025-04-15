const express = require("express");
const router = express.Router();
// internal
const categoryController = require("../controller/category.controller");

// get
router.get("/free-resource-categories", categoryController.getResourceCategories);
router.get("/course-categories", categoryController.getCourseCategories);
router.get("/counselling-categories", categoryController.getCounsellingCategories);
router.get("/category-by-type/:categoryTypeId", categoryController.getCategoryByType);
router.get("/get/:id", categoryController.getCategoryById);
// add
router.post("/add", categoryController.createCategory);
router.post("/add-all", categoryController.createManyCategories);
// add All Category
// router.post('/add-all', categoryController.addAllCategory);
// get all Category
router.get("/", categoryController.getAllCategories);
// get Product Type Category
// router.get('/show/:type', categoryController.getProductTypeCategory);
// get Show Category
// router.get('/show', categoryController.getShowCategory);
// delete category
router.delete("/delete/:id", categoryController.deleteCategory);
// delete product
router.patch("/edit/:id", categoryController.updateCategory);

module.exports = router;
