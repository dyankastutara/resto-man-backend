const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/',employeeController.getAllEmployee);
router.post('/',employeeController.addEmployee);
router.put('/:id',employeeController.editEmployee);
router.delete('/:id',employeeController.deleteEmployee);

module.exports = router