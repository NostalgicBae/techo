const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const { uploadFile } = require('../controllers/upload');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(fileUpload());

router
    .route('/')
    .post(uploadFile)

module.exports = router;