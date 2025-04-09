const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");
const courseMaterialController = require("../controller/courseMaterial.controller");
const uploader = require("../middleware/uploder");
// Course Material routes (with media)
router.post(
  "/add",
  uploader.single("media"),
  courseMaterialController.createCourseMaterial
);
router.get("/", courseMaterialController.getAllCourseMaterials);
router.get(
  "/courseId/:courseId",
  courseMaterialController.getAllCourseMaterialsByCourse
);
router.get("/:id", courseMaterialController.getCourseMaterialById);
router.put(
  "/:id",
  uploader.single("media"),
  courseMaterialController.updateCourseMaterial
);
router.delete("/:id", courseMaterialController.deleteCourseMaterial);
module.exports = router;
