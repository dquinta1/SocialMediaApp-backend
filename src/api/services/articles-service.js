const Article = require('../models/Article');
const Comment = require('../models/Comment');

async function QueryArticles(req, res) {
	try {
		const articles = await Article.find();
		return articles; // TODO: return only the articles authored by loggedInUser and Followings
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function QueryArticleById(req, res) {
	let article;
	try {
		article = await Article.findById(req.params.id);
		if (article == null) {
			return res.status(404).json({ message: 'Cannot find article' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	return article;
}

async function CreateNewArticle(req, res) {
	const article = new Article({
		pid: req.body.pid, // TODO: replace for _id of the loggedInUser
		author: req.body.author, // TODO: replace for username of loggedInUser
		text: req.body.text,
	});
	try {
		const newArticle = await article.save();
		return newArticle;
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

/**
 * PATCH Article properties given url params. 
 *   '/:id'                  updates the article itself
 * 	 '/:id/comment'  		 adds a new comment to list of comments  
 *   '/:id/comments/:index'  updates or deletes a comment at specified index
 * @param req.params.id ID of the Article to update
 * @param req.params.body Contains Article properties to update or a Comment to create/update
 * @param req.action String defining what action to perform on the Article to update it
 * @param {optional} req.params.index Index of the comment to update/delete in the Article
 * @param res The response
 * @return The updated article passed to the controller if no errors are found 
 * @error 
 */
async function UpdateArticleById(req, res) {
	let article = await QueryArticleById(req, res);

	// perform specified action
	switch (req.action) {
		case 'updateArticle':
			// TODO: replace article properties with those in req.body
			throw Error('Not Implemented');
		case 'addComment':
			// TODO: push comment from req.body into article.comments
			throw Error('Not Implemented');
		case 'updateComment':
			// TODO: replace comment at article.comments[req.params.index] with comment in req.body
			throw Error('Not Implemented');
		case 'deleteComment':
			// TODO: remove comment at article.comments[req.params.index]
			throw Error('Not Implemented');
		default:
			res.status(400).json({ message: 'Invalid Action' });
	}
	// attempt to updat article in DB, then return it
	try {
		const newArticle = await article.save();
		return newArticle;
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

module.exports = {
	QueryArticles,
	QueryArticleById,
	CreateNewArticle,
	UpdateArticleById,
};
