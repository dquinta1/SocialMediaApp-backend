const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
	avatar: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
