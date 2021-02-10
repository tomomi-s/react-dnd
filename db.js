const mongoose = require('mongoose');
// const db = 'mongodb://localhost/merntemplate';
require('dotenv').config()

const connectDB = async () =>{
	try {
		await mongoose
		.connect(process.env.TESTSERVER, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})

		console.log('MongoDB connected')
	} catch(err){
		console.log(err.message);
		process.exit(1)
	}
	
}

module.exports = connectDB;