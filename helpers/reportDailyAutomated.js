const CronJob = require('cron').CronJob
require('dotenv').config()
const models = require('../models')
const Report = require('../models/report')
const Week = require('../models/report-weekly')
const axios = require('axios')
module.exports = {
	saveReportsDaily : ()=>{
		new CronJob(`0 55 23 * * *`, function() {
			var dateNow = new Date()
			const milisecond = 24 * 60 * 60 * 1000;
			const lastDate = dateNow.getTime() - milisecond;
			const resultDate = new Date(lastDate)
				models.Transaction.findAll({
					where:{
				    createdAt : {
				    	$between: [resultDate, dateNow]
				    }
					},
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
					]
				})
				.then(response=>{
					let finalResult = []
					var trxNumber = 1
					response.map((data, i)=>{
						var objTrx = {
							name: "Trx"+trxNumber++,
							id_order : data.dataValues.id_order,
							no_meja : data.dataValues.Order.no_meja,
							total_price : data.dataValues.Order.total_price,
							pay : data.dataValues.pay,
							refund : data.dataValues.refund,
							createdAt:data.dataValues.createdAt,
							menu_order : []
						}
						var trx = data.dataValues.Order.Menus
						trx.map((menu, j)=>{
							var objMenu = {
								id:menu.dataValues.id,
								name:menu.dataValues.name,
								qty_item:menu.dataValues.MenuOrder.qty_item,
								price:menu.dataValues.price,
								jumlah:menu.dataValues.MenuOrder.qty_item * menu.dataValues.price
							}
							objTrx.menu_order.push(objMenu)
						})
						finalResult.push(objTrx)
					})
					var resultMenu = []
					var totalTrx = {
						date:new Date().toLocaleString('en-US',{timeZone: 'Asia/Jakarta'}),
						total:null,
						menu_sub_total: menu_sub_total
					}
					var menu_sub_total = []
					var name = '';
					var jumlah_qty = 0;
					var sub_total = 0;

					finalResult.map((d,i)=>{
						totalTrx.total+=d.total_price
						d.menu_order.map((t,i)=>{
							var objMenuSub = {
								id:null,
								name:null,
								jumlah_qty: 0,
								sub_total:0
							}
							objMenuSub.id = t.id
							objMenuSub.name = t.name
							objMenuSub.jumlah_qty = t.qty_item
							objMenuSub.sub_total = (t.qty_item * t.price)
							menu_sub_total.push(objMenuSub)
						})
					})

					var sum = [];
					menu_sub_total.map(function(o) {
					    var existing = sum.filter(function(i) { return i.id === o.id })[0];
					    if (!existing){
					        sum.push(o);
					    }
					    else{
					        existing.jumlah_qty += o.jumlah_qty;
					      	existing.sub_total += o.sub_total;
					      }
					});
					sum.sort(function(a,b){
						return b.jumlah_qty - a.jumlah_qty
					})
					var result = {
						finalResult,
						totalTrx,
						sum
					}

					const date = new Date().toISOString().split('T')
					var insertReport = new Report({
						date: date[0],
	          reports : result
	        })

	        insertReport.save((err, result)=>{
	          if(!err){
	          	console.log("daily save")
	          }else{
	            console.log(err)
	          }
	        })
					 
				})
				.catch(err=>{
					console.log(err)
				})

		}, null, true, 'Asia/Jakarta');
	},
	saveReportsWeekly : ()=>{
		new CronJob(`0 55 23 * * *`, function() {
			var dateNow = new Date()
			const milisecond = 24 * 60 * 60 * 1000 * 7;
			const lastDate = dateNow.getTime() - milisecond;
			const resultDate = new Date(lastDate)
				models.Transaction.findAll({
					where:{
				    createdAt : {
				    	$between: [resultDate, dateNow]
				    }
					},
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
					]
				})
				.then(response=>{
					let finalResult = []
					var trxNumber = 1
					response.map((data, i)=>{
						var objTrx = {
							name: "Trx"+trxNumber++,
							id_order : data.dataValues.id_order,
							no_meja : data.dataValues.Order.no_meja,
							total_price : data.dataValues.Order.total_price,
							pay : data.dataValues.pay,
							refund : data.dataValues.refund,
							createdAt:data.dataValues.createdAt,
							menu_order : []
						}
						var trx = data.dataValues.Order.Menus
						trx.map((menu, j)=>{
							var objMenu = {
								id:menu.dataValues.id,
								name:menu.dataValues.name,
								qty_item:menu.dataValues.MenuOrder.qty_item,
								price:menu.dataValues.price,
								jumlah:menu.dataValues.MenuOrder.qty_item * menu.dataValues.price
							}
							objTrx.menu_order.push(objMenu)
						})
						finalResult.push(objTrx)
					})
					var resultMenu = []
					var totalTrx = {
						date:new Date().toLocaleString('en-US',{timeZone: 'Asia/Jakarta'}),
						total:null,
						menu_sub_total: menu_sub_total
					}
					var menu_sub_total = []
					var name = '';
					var jumlah_qty = 0;
					var sub_total = 0;

					finalResult.map((d,i)=>{
						totalTrx.total+=d.total_price
						d.menu_order.map((t,i)=>{
							var objMenuSub = {
								id:null,
								name:null,
								jumlah_qty: 0,
								sub_total:0
							}
							objMenuSub.id = t.id
							objMenuSub.name = t.name
							objMenuSub.jumlah_qty = t.qty_item
							objMenuSub.sub_total = (t.qty_item * t.price)
							menu_sub_total.push(objMenuSub)
						})
					})

					var sum = [];
					menu_sub_total.map(function(o) {
					    var existing = sum.filter(function(i) { return i.id === o.id })[0];
					    if (!existing){
					        sum.push(o);
					    }
					    else{
					        existing.jumlah_qty += o.jumlah_qty;
					      	existing.sub_total += o.sub_total;
					      }
					});
					sum.sort(function(a,b){
						return b.jumlah_qty - a.jumlah_qty
					})

				if(sum[0].name){
					axios.get(`https://api.edamam.com/search?q=${sum[0].name}&app_id=c7b09b36&app_key=3385e94ab3afe8bbd307b8d4a619e3c3`)
					.then(responseSugestion=>{
						let sugestions = responseSugestion.data.hits
						var sugestionMenu = []
						sugestions.map(sugestion=>{
							let objSugestion = {
								label : sugestion.recipe.label,
								ingredient : sugestion.recipe.ingredientLines,
								url: sugestion.recipe.url,
								image: sugestion.recipe.image
							}
							sugestionMenu.push(objSugestion)
						})
						var result = {
							finalResult,
							totalTrx,
							sum,
							sugestionMenu
						}
						const date = new Date().toISOString().split('T')
						var insertReport = new Week({
							date: date[0],
		          reports : result
		        })

		        insertReport.save((err, result)=>{
		        	if(err) console.error(err)
	          	console.log("Weekly save")
		        })
					})
					.catch(sugesErr=>{
						console.log(sugesErr)
					})
				}else{
					var result = {
						finalResult,
						totalTrx,
						sum
					}
					const date = new Date().toISOString().split('T')
						var insertReport = new Week({
							date: date[0],
		          reports : result
		        })

		        insertReport.save((err, result)=>{
		        	if(err) console.error(err)
	          	console.log("Weekly save Error")
		        })
				}	 
				})
				.catch(err=>{
					console.log(err)
				})

		}, null, true, 'Asia/Jakarta');
	}
}
