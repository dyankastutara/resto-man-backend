const models = require('../models');

module.exports = {
	getAllOrders: (req, res)=>{
		models.Order.findAll({
		  include: [
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
	getDetailOrder: (req, res)=>{
		models.Order.findOne({
			where : {
				id: req.params.id
			},
		  include: [
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
		})
		.then(response=>{
			res.json(response)
		})
		.catch(err=>{
			res.json(err)
		})
	},
	addOrder:(req, res)=>{
		let finalResult = {
			id: null,
			no_meja: null,
			total_price: null,
			success: false,
			id_employee: null,
			message: ''
		}
		if(req.body.no_meja !== '' && req.body.id_employee !== '' && req.body.total_price !== ''){
			models.Order.create({
				id_employee: req.body.id_employee,
				no_meja: req.body.no_meja,
				total_price: req.body.total_price
			})
			.then(response=>{
				let menus = req.body.menu_order
				var menu_order = []

				menus.map(menu=>{
					models.MenuOrder.create({
						id_order : response.dataValues.id,
						id_menu : menu.id_menu,
						qty_item : menu.qty_item,
						total : menu.total,
						note : menu.note || ''
					})
					.then(responseMenuOrder=>{
						let id_menu_from_MenuOrder = responseMenuOrder.dataValues.id_menu
						let obj = {
							name:'',
							price: null
						}
						models.Menu.findAll({})
						.then(responseMenu=>{
							responseMenu.map(menu=>{
								if(menu.dataValues.id === id_menu_from_MenuOrder){
									return obj = {
										name:menu.dataValues.name,
										price: menu.dataValues.price
									}
								}
							})
							let objMenuOrder = {
								id_menu : id_menu_from_MenuOrder,
								name:obj.name,
								price:obj.price,
								qty_item : responseMenuOrder.dataValues.qty_item,
								total : responseMenuOrder.dataValues.total,
								note : responseMenuOrder.dataValues.note
							}					
						})
					})
				})

				finalResult.id = response.dataValues.id
				finalResult.no_meja = response.dataValues.no_meja
				finalResult.total_price = response.dataValues.total_price
				finalResult.id_employee = response.dataValues.id_employee
				finalResult.success = true
				finalResult.message = 'Order Added'
				res.json(finalResult)
			})
			.catch(err=>{
				res.json(finalResult)
			})
		}else{
			res.json(finalResult)
		}
	},
	deleteOrder: (req, res)=>{
		var finalResult = {
			id: null,
			success:false,
			message:''
		}
		models.MenuOrder.destroy({
			where:{
				id_order: req.params.id
			}
		})
		.then(response=>{
			models.Order.destroy({
				where:{
					id:req.params.id
				}
			})
			.then(responseOrder=>{
				finalResult.id = req.params.id
				finalResult.success = true
				finalResult.message = 'You Delete this order with MenuOrder'
				res.json(finalResult)
			})
			.catch(error=>{
				res.json(finalResult)
			})
		})
		.catch(err=>{
			res.json(finalResult)
		})
	},
	editOrder:(req, res)=>{
		let finalResult = {
			id: null,
			no_meja: null,
			total_price: null,
			success: false,
			id_employee: null,
			message: ''
		}
		if(req.body.no_meja !== '' && req.body.id_employee !== '' && req.body.total_price !== ''){
			models.Order.update(
				{
					id_employee: req.body.id_employee,
					no_meja: req.body.no_meja,
					total_price: req.body.total_price,
					updatedAt: new Date()
				},{
				where:{
					id:req.params.id
				}
			})
			.then(response=>{
				models.MenuOrder.destroy({
					where:{
						id_order: req.params.id
					}
				})
				.then(responseMenuOrderDelete=>{
					let menus = req.body.menu_order
					var menu_order = []

					menus.map(menu=>{
						models.MenuOrder.create({
							id_order : req.params.id,
							id_menu : menu.id_menu,
							qty_item : menu.qty_item,
							total : menu.total,
							note : menu.note || ''
						})
						.then(responseMenuOrder=>{
							let id_menu_from_MenuOrder = responseMenuOrder.dataValues.id_menu
							let obj = {
								name:'',
								price: null
							}
							models.Menu.findAll({})
							.then(responseMenu=>{
								responseMenu.map(menu=>{
									if(menu.dataValues.id === id_menu_from_MenuOrder){
										return obj = {
											name:menu.dataValues.name,
											price: menu.dataValues.price
										}
									}
								})
								let objMenuOrder = {
									id_menu : id_menu_from_MenuOrder,
									name:obj.name,
									price:obj.price,
									qty_item : responseMenuOrder.dataValues.qty_item,
									total : responseMenuOrder.dataValues.total,
									note : responseMenuOrder.dataValues.note
								}					
							})
						})
					})

					finalResult.id = req.params.id
					finalResult.no_meja = req.body.no_meja
					finalResult.total_price = req.body.total_price
					finalResult.id_employee = req.body.id_employee
					finalResult.success = true
					finalResult.message = 'Order Has Been Updated'
					res.json(finalResult)
				})
			})
		}else{
			res.json(finalResult)
		}
	}
}