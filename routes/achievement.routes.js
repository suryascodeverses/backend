const express = require("express");
const router = express.Router();
const achievementController = require("../controller/achievement.controller");
const uploader = require("../middleware/uploder");

// POST - Add new achievement
router.post(
  "/",
  uploader.single("media"),
  achievementController.createAchievement
);

// GET - All achievements
router.get("/", achievementController.getAllAchievements);

// GET - Single achievement by ID
router.get("/:id", achievementController.getAchievementById);

// PUT - Update achievement
router.put(
  "/:id",
  uploader.single("media"),
  achievementController.updateAchievement
);

// DELETE - Delete achievement
router.delete("/:id", achievementController.deleteAchievement);

module.exports = router;
