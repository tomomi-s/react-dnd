const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	firstname:{type: String, require: true},
	lasttname:{type: String, require: true},
	email:{type: String, require: true, unique: true},
	password:{type: String, require: true},
	date:{type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema)