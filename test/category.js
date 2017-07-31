const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();

const server = require('../app');
const models = require('../models');
chai.use(chaiHttp);

describe('Category Test',()=>{

	describe('Read - Read data Category',()=>{
		it('Should be return length Category 2 from databases',(done)=>{
	    models.Category.findAll({})
	    .then((res) => {
	    		res.length.should.equal(2);
	    		done();
	    })
	    .catch(err=>{
	    	done(err)
	    });
		});

		it('Should be return length Category 2 from url /menu',(done)=>{
			chai.request(server)
			.get('/category')
			.end((err, res) => {
	    	if(err){
	    		res.should.have.status(500);
	    		done(err);
	    	}else{
	    		res.should.have.status(200);
	    		res.body.length.should.equal(2);
	    		done();
	    	}
	    });
		});
	});

  describe('Create - Add category',()=>{
  	it('Should be return all field category when trying to add category',(done)=>{
  		chai.request(server)
  		.post('/category')
  		.send({
  			name: 'Category 2'
  		})
  		.end((err, res)=>{
  			if(err){
  				res.should.have.status(500);
  				done(err);
  			}else{
  				res.should.have.status(200);
  				res.body.should.have.property('id');
  				res.body.should.have.property('name');
  				done();
  			}
  		});
  	});

  	it('Should be return success false while trying to add category with field name is empty',(done)=>{
  		chai.request(server)
  		.post('/category')
  		.send({
  			name: ''
  		})
  		.end((err, res)=>{
  			if(err){
  				res.should.have.status(500);
  				done(err);
  			}else{
  				res.should.have.status(200);
  				res.body.success.should.be.equal(false)
  				done();
  			}
  		});
  	});
  });

  describe('Update - Update data category',()=>{
		it('Should be return success true when trying to update data category', (done)=>{
			models.Category.create({
				name: 'Category Update'
			})
			.then((query)=>{
				chai.request(server)
				.put('/category/'+query.id)
				.send({
					name: 'Category di update',
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
			});
		});

		it('Should be return success false when trying to update data category if field name is empty', (done)=>{
			models.Category.create({
				name: 'Category Update'
			})
			.then((query)=>{
				chai.request(server)
				.put('/category/'+query.id)
				.send({
					name: '',
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

	describe('Delete - Delete data category', ()=>{
		it('Should be return success true when trying to delete category',(done)=>{
			models.Category.create({
				name: 'Category Delete'
			})
			.then((query)=>{
				chai.request(server)
				.delete('/category/'+query.id)
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
			});
		})
	});
});