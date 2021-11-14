const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
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
	following: []
});

module.exports = mongoose.model('Profile', profileSchema);
