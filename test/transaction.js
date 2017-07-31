const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const server = require('../app');
const models = require('../models');
chai.use(chaiHttp);

describe('Transaction Test', ()=>{

 	describe('Create - Add Transaction', ()=>{
		it('Should be return all field / property when trying to Add data Transaction', (done)=>{
			chai.request(server)
			.post('/transaction')
			.send({
				id_order: 2,
				pay: 20000,
				refund: 0
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.body.should.have.property('id');
					res.body.should.have.property('id_order');
					res.body.should.have.property('pay');
					res.body.should.have.property('refund');
					done();
				}
			});
		});

		it('Should be return success true when trying Add data Transaction', (done)=>{
			chai.request(server)
			.post('/transaction')
			.send({
				id_order: 2,
				pay: 20000,
				refund: 0
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

		it('Should be return success false when trying Add if field pay is empty', (done)=>{
			chai.request(server)
			.post('/transaction')
			.send({
				id_order: 2,
				pay: null,
				refund: 0
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
});