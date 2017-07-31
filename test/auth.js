const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
require('dotenv').config();
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('postgresql');

const models = require('../models')
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);

describe('Auth Test',()=>{
	describe('Login - Test login with admin access',()=>{

		it('Should be return all field Admin when Admin trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'admin',
				password: 'admin'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.have.property('id');
					res.body.should.have.property('username');
					res.body.should.have.property('role');
					res.body.should.have.property('message');
					res.body.should.have.property('success');
					res.body.should.have.property('token')
					done();
				}
			});
		});
	});
	
		it('Should be return role Admin when Admin trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'admin',
				password: 'admin'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.username.should.to.equal('admin');
					res.body.role.should.to.equal('Admin');
					res.body.success.should.to.equal(true);
					done();
				}
			});
		});


	describe('Login - Test login with waiters access',()=>{
		it('Should be return role waiter when waiters trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'waiters',
				password: 'waiters'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.username.should.to.equal('waiters');
					res.body.role.should.to.equal('Waiters');
					res.body.success.should.to.equal(true);
					done();
				}
			});
		});

		it('Should be return all field Waiter when Waiter trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'waiters',
				password: 'waiters'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.have.property('id');
					res.body.should.have.property('username');
					res.body.should.have.property('role');
					res.body.should.have.property('success');
					res.body.should.have.property('token')
					done();
				}
			});
		});
	});

	describe('Login - Test login with casier access',()=>{
		it('Should be return role casier when casier trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'cashier',
				password: 'cashier'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.username.should.to.equal('cashier');
					res.body.role.should.to.equal('Cashier');
					res.body.success.should.to.equal(true);
					done();
				}
			});
		});

		it('Should be return all field casier when Waiter trying to login',(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'cashier',
				password: 'cashier'
			})
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else{
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.have.property('id');
					res.body.should.have.property('username');
					res.body.should.have.property('role');
					res.body.should.have.property('success');
					res.body.should.have.property('token')
					done();
				}
			});
		});
	});

	describe('Login - Test login with access wrong',()=>{
		it('Should be return success false when trying to login with wrong username or password', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'pwd-wrong'
      }).end((err, res) => {
        if (err) {
					res.should.have.status(500);
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.success.should.to.equal(false)
          done()
        }
      });
    });

    it('Should be return token null when trying to login with wrong username or password', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'pwd-wrong'
      }).end((err, res) => {
        if (err) {
					res.should.have.status(500);
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          should.equal(res.body.token, null);
          done()
        }
      });
    });
	});
});