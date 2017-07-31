const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/',orderController.getAllOrders);
router.post('/',orderController.addOrder);
router.get('/:id', orderController.getDetailOrder);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id', orderController.editOrder);

module.exports = router