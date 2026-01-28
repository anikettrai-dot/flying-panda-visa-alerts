const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alertsController');

router.get('/', alertsController.getAlerts);
router.post('/', alertsController.createAlert);
router.get('/stats', alertsController.getStats);
router.put('/:id', alertsController.updateAlert);
router.delete('/:id', alertsController.deleteAlert);

module.exports = router;
