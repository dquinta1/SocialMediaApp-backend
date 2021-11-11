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
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	comments: [],
});

module.exports = mongoose.model('Article', articleSchema);
