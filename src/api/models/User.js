const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	headline: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	zipcode: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	avatar: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', userSchema);
