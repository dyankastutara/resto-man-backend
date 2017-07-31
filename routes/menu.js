const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/',menuController.getAllMenu);
router.post('/',menuController.addMenu);
router.put('/:id',menuController.editMenu);
router.delete('/:id',menuController.deleteMenu);

module.exports = router