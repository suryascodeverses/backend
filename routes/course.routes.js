const express = require("express");
const router = express.Router();
const courseController = require("../controller/course.controller");
const courseMaterialController = require("../controller/courseMaterial.controller");
const uploader = require("../middleware/uploder");

// Course routes (no media)
router.post("/add", courseController.createCourse);
router.post("/add-all", courseController.bulkCreateCourses);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);
router.put("/add/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

// // Course Material routes (with media)
// router.post(
//   "/material/add",
//   uploader.single("media"),
//   courseMaterialController.createCourseMaterial
// );
// router.get("/material/courseId/:courseId", courseMaterialController.getAllCourseMaterialsByCourse);
// router.get("/material", courseMaterialController.getAllCourseMaterials);
// router.get("/material/:id", courseMaterialController.getCourseMaterialById);
// router.put(
//   "/material/:id",
//   uploader.single("media"),
//   courseMaterialController.updateCourseMaterial
// );
// router.delete("/material/:id", courseMaterialController.deleteCourseMaterial);

module.exports = router;
