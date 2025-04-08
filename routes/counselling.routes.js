const express = require("express");
const router = express.Router();
const counsellingController = require("../controller/careerCounselling.controller");
// const { counsellingUpload } = require("../middlewares/upload");
// const {
//     createCounselling,
//     getAllCounselling,
//     getCounsellingById,
//     updateCounselling,
//     deleteCounselling,
//   } = require("../controller/careerCounselling.controller");
const uploader = require("../middleware/uploder");
router.post(
  "/",
  uploader.single("media"),
  counsellingController.createCounselling
);
router.get("/", counsellingController.getAllCounselling);
router.get("/:id", counsellingController.getCounsellingById);
router.put(
  "/:id",
  uploader.single("media"),
  counsellingController.updateCounselling
);
router.delete("/:id", counsellingController.deleteCounselling);

module.exports = router;
