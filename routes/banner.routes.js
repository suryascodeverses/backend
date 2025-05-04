const express = require("express");
const router = express.Router();
const bannerController = require("../controller/banner.controller");
const uploader = require("../middleware/uploder");

// POST - Add new banner
router.post(
  "/",
  uploader.single("media"),
  bannerController.createBanner
);

// GET - All banners
router.get("/", bannerController.getAllBanners);
// router.get('/banner-years', bannerController.getbannerYears);

// GET - Single banner by ID
router.get("/:id", bannerController.getBannerById);

// PUT - Update banner
router.put(
  "/:id",
  uploader.single("media"),
  bannerController.updateBanner
);

// DELETE - Delete banner
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
