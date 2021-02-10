const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
	title :{type: String, require: true},
	description:{type: String, require: true},
	phase:{type: String, require: true},
	date: {type: Date}
})

module.exports = mongoose.model('Project', ProjectSchema)