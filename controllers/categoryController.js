const models = require('../models');

module.exports = {
	getAllCategory: (req, res)=>{
		models.Category.findAll({})
		.then(response=>{
			res.json(response)
		})
		.catch(err=>{
			res.json(err)
		})
	},
	addCategory: (req, res)=>{
		let finalResult = {
			id: null,
			name: '',
			success: false,
			message: ''
		}
		if(req.body.name !== ""){
			models.Category.create({
				name: req.body.name
			})
			.then(response=>{
				finalResult.id = response.dataValues.id
				finalResult.name = response.dataValues.name
				finalResult.success = true
				finalResult.message = "Category has been added"
				res.json(finalResult)
			})
			.catch(err=>{
				res.json(finalResult)
			})
		}else{
      finalResult.message = "Category name can't not Null"
			res.json(finalResult)
		}
	},
	editCategory: (req, res)=>{
		let finalResult = {
			id: null,
			name: null,
			success: false,
			message: ''
		}
		models.Category.findOne({
			where:{
				id: req.params.id
			}
		})
		.then(query=>{
			if(req.body.name !== ""){
	      query.updateAttributes({
	        name : req.body.name || query.dataValues.name,
	        createdAt : query.dataValues.createdAt,
	        updatedAt : new Date()
	      })
	      .then((response)=>{
	      	finalResult.id = response.dataValues.id
	      	finalResult.name = response.dataValues.name
	      	finalResult.success = true
	      	finalResult.message = "Category name is updated"
	        res.json(finalResult)
	      })
	      .catch((error)=>{
	      	finalResult.message = "Category name can't not Null"
	        res.json(finalResult)
	      })
	    }else{
	      finalResult.message = "Category name can't not Null"
	    	res.json(finalResult)
	    }
		})
		.catch(err=>{
    	finalResult.message = "Category name can't not Null"
			res.json(finalResult)
		})
	},
	deleteCategory:(req, res)=>{
		let finalResult = {
			record:null,
			success: false,
			message: ''
		}
		models.Category.destroy({
			where:{
				id: req.params.id
			}
		})
		.then(response=>{
			finalResult.record = response
			finalResult.success = true
			finalResult.message = 'Category has been delete'
			res.json(finalResult)
		})
		.catch(err=>{
			res.json(err)
		})
	}
}