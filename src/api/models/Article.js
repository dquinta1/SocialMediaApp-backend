const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	pid: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	img: '',
	comments: [],
});

module.exports = mongoose.model('Article', articleSchema);
