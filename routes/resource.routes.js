const express = require('express');
const router = express.Router();
const freeResourceController = require('../controller/freeResource.controller');

router.post('/', freeResourceController.createFreeResource);
router.post('/bulk', freeResourceController.bulkCreateFreeResources);
router.get('/', freeResourceController.getAllFreeResources);
router.get('/:id', freeResourceController.getFreeResourceById);
router.put('/:id', freeResourceController.updateFreeResource);
router.delete('/:id', freeResourceController.deleteFreeResource);

module.exports = router;
