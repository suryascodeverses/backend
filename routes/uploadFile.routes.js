const express = require('express');
const { fileUpload } = require('../controller/upload.controller');
const uploader = require('../middleware/uploder');

const router = express.Router();

// routes
router.post('/single',uploader.single('image'),fileUpload)

module.exports = router;