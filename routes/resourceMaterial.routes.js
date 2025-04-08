const express = require('express');
const router = express.Router();
const controller = require('../controller/freeResourceMaterial.controller');
const upload = require('../middleware/uploder');

router.post('/', upload.single('media'), controller.createFreeResourceMaterial);
router.post('/bulk', controller.bulkCreateFreeResourceMaterials);
router.get('/', controller.getAllFreeResourceMaterials);
router.get('/resource/:freeResourceId', controller.getFreeResourceMaterialsByResource);
router.get('/:id', controller.getFreeResourceMaterialById);
router.put('/:id', upload.single('media'), controller.updateFreeResourceMaterial);
router.delete('/:id', controller.deleteFreeResourceMaterial);

module.exports = router;
