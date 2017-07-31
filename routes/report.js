const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/current',reportController.currentReport);
router.post('/daily',reportController.reportDaily);
router.post('/weekly',reportController.reportWeekly);

module.exports = router