const chai = require('chai');
let should = chai.should(); 
const request = require('supertest');

const connectDB = require('./db');
const app = require('./server');

describe('Projects', ()=>{
	before((done) => {
		connectDB()
      	.then(() => done())
		.catch((err)=>done(err))
	})
	it('Success get projects', (done)=>{
		request(app).get('/api/projects')
		.then((res)=>{
			const body = res.body;
			body.should.be.an('array')
			let item = body[0];
			item.should.have.property('title').to.equal('Project A')
			done();
		})
	})
	
})