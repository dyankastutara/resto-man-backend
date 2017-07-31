const models = require('../models');

module.exports = {
	getAllRole : (req, res)=>{
		models.Role.findAll({})
		.then(response=>{
			res.json(response);
		})
		.catch(err=>{
			res.send(err);
		})
	}
}