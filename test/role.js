const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const server = require('../app');
const models = require('../models');
chai.use(chaiHttp);

describe('Role Test',()=>{
	describe('Read - Read data Role',()=>{
		it('Should be return length Role 3 from url /menu',(done)=>{
			chai.request(server)
			.get('/role')
			.end((err, res) => {
	    	if(err){
	    		res.should.have.status(500);
	    		done(err);
	    	}else{
	    		res.should.have.status(200);
	    		res.body.length.should.equal(3);
	    		done();
	    	}
	    });
		});
	});
});