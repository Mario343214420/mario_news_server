const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	type: String,
	tel: String,
	com: Array,
	header: String,
	post: String,
	salary: String,
	company: String,
	info: String
})

module.exports = mongoose.model('Users', usersSchema);
