const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const server = require('../app');
const models = require('../models');
chai.use(chaiHttp);

describe('Menu Test', ()=>{

	describe('Create - Add Menu', ()=>{
		it('Should be return all field / property when trying to Add data Menu', (done)=>{
			chai.request(server)
			.post('/menu')
			.send({
				name: 'Test Menu Create',
				description: 'Test Menu Create Description',
				price: 15000,
				id_category: 1
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.have.property('id');
					res.body.should.have.property('name');
					res.body.should.have.property('description');
					res.body.should.have.property('price');
					done();
				}
			});
		});

		it('Should be return success true when trying Add data Menu', (done)=>{
			chai.request(server)
			.post('/menu')
			.send({
				name: 'Test Menu Create success true',
				description: 'Test Menu Create Description success true',
				price: 15000,
				id_category: 1
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.body.success.should.be.equal(true);
					done();
				}
			});
		});

		it('Should be return success false when trying Register if field name is empty', (done)=>{
			chai.request(server)
			.post('/menu')
			.send({
				name: '',
				description: 'Test Menu Create Description success false',
				price: 15000,
				id_category: 1
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.body.success.should.be.equal(false);
					done();
				}
			});
		});

		it('Should be return success false when trying Add menu if field price is empty', (done)=>{
			chai.request(server)
			.post('/menu')
			.send({
				name: 'Test Menu Create success true',
				description: 'Test Menu Create Description success true',
				price: '',
				id_category:1
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.body.success.should.be.equal(false);
					done();
				}
			});
		});
	});

	describe('Update - Update data Menu',()=>{
		it('Should be return success true when trying to update data Menu', (done)=>{
			models.Menu.create({
				name: 'Menu update',
				description: 'Menu update Description',
				price: 15000,
				id_category: 1
			})
			.then((query)=>{
				chai.request(server)
				.put('/menu/'+query.id)
				.send({
					name: 'Menu update baru',
					description: 'Menu update Description baru',
					price: 15000,
					id_category: 1,
					updatedAt: new Date()
				})
				.end((err,res)=>{
					if(err){
						res.should.have.status(500);
						done(err);
					}else{
						res.should.have.status(200);
						res.body.success.should.be.equal(true);
						done();
					}
				});
			})
			.catch(err=>{
				done(err)
			})
		});

		it('Should be return success false when trying to update data Menu if field name is empty', (done)=>{
			models.Menu.create({
				name: 'Menu Update Baru False',
				description: 'Menu update Description baru',
				price: 15000,
				id_category: 1
			})
			.then((query)=>{
				chai.request(server)
				.put('/menu/'+query.id)
				.send({
					name: '',
					description: 'Menu update Description baru',
					price: 15000,
					id_category: 1,
					updatedAt: new Date()
				})
				.end((err,res)=>{
					if(err){
						res.should.have.status(500);
						done(err);
					}else{
						res.should.have.status(200);
						res.body.success.should.be.equal(false);
						done();
					}
				});
			});
		});
	});

	describe('Delete - Delete data Menu', ()=>{
		it('Should be return success true when trying to delete Menu',(done)=>{
			models.Menu.create({
				name: 'Menu Makan Delete',
				description: 'Menu update Description baru',
				price: 15000,
				id_category: 1
			})
			.then((query)=>{
				chai.request(server)
				.delete('/menu/'+query.id)
				.end((err,res)=>{
					if(err){
						res.should.have.status(500);
						done(err);
					}else{
						res.should.have.status(200);
						// res.body.success.should.be.equal(true);
						done();
					}
				});
			});
		})
	});
});