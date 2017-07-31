const models = require('../models')
const axios = require('axios')
const Report = require('../models/report')
const Week = require('../models/report-weekly')
module.exports = {
	currentReport : (req, res)=>{
		var dateNow = new Date()
		var dateMidnight = new Date(`${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`)
			models.Transaction.findAll({
				where:{
			    createdAt : {
			    	$between: [dateMidnight, dateNow]
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
				res.json(result)
			})
			.catch(err=>{
				console.log(err)
			})
	},
	reportDaily : (req, res)=>{
		Report.findOne({
			date : req.body.date
		  }, (err, result)=>{
			if(err) res.send(err)

			if(!result){
				let obj = {
				    finalResult: [],
				    totalTrx: {
				        date: new Date(),
				        total: null
				    },
				    sum: []
				}
				res.json(obj);
			}else{
				res.json(result.reports)
			}
		})
	},
	reportWeekly : (req, res)=>{
		Week.findOne({
			date : req.body.date
		  }, (err, result)=>{
			if(err) res.send(err)
			
			if(!result){
				let obj = {
				    finalResult: [],
				    totalTrx: {
				        date: new Date(),
				        total: null
				    },
				    sum: []
				}
				res.json(obj);
			}else{
				res.json(result.reports)
			}
		})
	}
}