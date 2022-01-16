const express = require('express');
const router = express.Router();
const { getComplaints } = require('../controllers/complaints');

router
    .route('/')
    .get(getComplaints)

module.exports = router;