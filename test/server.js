const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const server = require('../app');

chai.use(chaiHttp); 
const should = chai.should();

describe('Server test', ()=>{
	describe('Express - Server active when httpServer Running', ()=>{
		it('Should be return {status: "running"} when to try access /test', (done)=>{
			chai.request(server)
			.get('/test')
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else {
					res.should.have.status(200);
					res.body.status.should.to.equal('running');
					done();
				}
			});
		});
	});

	describe('Database - Connection Database',()=>{
		it('Should be return {database: connected} when to try access /test/database', (done)=>{
			chai.request(server)
			.get('/test/database')
			.end((err, res)=>{
				if(err){
					res.should.have.status(500);
					done(err);
				}else {
					res.should.have.status(200);
					res.body.database.should.to.equal('connected');
					done();
				}
			});
		});
	});
});