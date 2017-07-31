const models = require('../models');

module.exports = {
	getAllTransactions : (req, res)=>{
		models.Transaction.findAll({
			include:[
				{
					model: models.Order,
					include:[
			  		{
					    model: models.Employee
					  },
					  {
					    model: models.Menu,
					    include:[
					    	{
					    		model: models.Category
					    	}
					    ]
					  }
					]
				}
			],
			order: [
	    	['createdAt', 'DESC']
	    ]
		})
		.then(response=>{
			res.json(response)
		})
		.catch(err=>{
			res.json(err)
		})
	},
	addTransaction : (req, res)=>{
		let finalResult = {
			id: null,
			id_order: null,
			pay: null,
			refund: null,
			success: false,
			message: ''
		}
		models.Transaction.create({
			id_order: req.body.id_order,
			pay : req.body.pay,
			refund: req.body.refund
		})
		.then(response=>{
			finalResult.id= response.dataValues.id,
			finalResult.id_order= response.dataValues.id_order,
			finalResult.pay= response.dataValues.pay,
			finalResult.refund= response.dataValues.refund,
			finalResult.success= true,
			finalResult.message= 'Transaction has been added'
			res.json(finalResult)
		})
		.catch(err=>{
			res.json(finalResult)
		})
	}
}