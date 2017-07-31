const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
	login: (req, res)=>{
    let finalResult = {
      id: null,
      username: null,
      role:null,
      token: null,
      success: false,
      message: ''
    }

    let username = req.body.username
		models.Employee.findOne({
			where:{
				username:username
			}
		})
		.then(response=>{
			if(response !== null){
				if(bcrypt.compareSync(req.body.password, response.dataValues.password)){
					let id_role = response.dataValues.id_role
					models.Role.findAll({})
					.then(responseRole=>{
						let role = ''
						responseRole.map(roleValue=>{
							if(roleValue.dataValues.id === id_role){
								role = roleValue.dataValues.type
								return role
							}
						})
						let token = jwt.sign({
							id: response.dataValues.id,
							username: response.dataValues.username,
							role: role
						}, 'secret')

						finalResult.id = response.dataValues.id
						finalResult.username = response.dataValues.username
						finalResult.role = role
						finalResult.token = token
						finalResult.success = true
						finalResult.message = 'Login Success'
						res.json(finalResult)
					})
					.catch(err=>{
						console.log(err)
					})
				}else{
					finalResult.message = 'Username or Password is wrong'
					res.json(finalResult)
				}
			}else{
				finalResult.message = 'Username not Found'
				res.json(finalResult)
			}
		}) 
		.catch(err=>{
			res.status(500)
			res.json(err)
		})
	}
}