const express = require("express");
const router = express.Router();
const resourceController = require("../controller/freeResource.controller");

router.post("/", resourceController.createFreeResource);
router.get("/", resourceController.getAllFreeResources);
router.get("/:id", resourceController.getFreeResourceById);
router.put("/:id", resourceController.updateFreeResource);
router.delete("/:id", resourceController.deleteFreeResource);

module.exports = router;
