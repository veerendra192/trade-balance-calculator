// src/routes/balanceRoutes.js

const express = require('express');
const { calculateBalance } = require('../controllers/balanceController');

const router = express.Router();

// Route to calculate balance
router.post('/balance', calculateBalance);

module.exports = router;
