const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');

async function QueryArticles(req, res) {
	try {
		const profile = await Profile.findById(req.session._id);
		let usernames = profile.following != null ? profile.following : [];
		usernames.push(req.session.username);
		const startIndex = req.startIndex || 0;
		const articles = await Article.find({ author: { $in: usernames } })
			.sort('-date')
			.limit(5)
			.skip(startIndex);
		return articles;
	} catch (error) {
		return res.status(500).json({ message: error.message });
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
	const { _id, username } = req.session;
	const { title, description } = req.body;
	const article = new Article({
		pid: _id,
		author: username,
		title,
		description,
	});
	try {
		await article.save();
		return article;
	} catch (error) {
		return res.status(400).json({ message: error.message });
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
	try {
		// perform specified action
		switch (req.action) {
			case 'updateArticle':
				const newArticle = await Article.findByIdAndUpdate(
					req.params.id,
					req.body,
					{ returnDocument: 'after' }
				);
				return newArticle;
			case 'addComment':
				const profile = await Profile.findById(req.session._id);
				const article = await Article.findById(req.params.id);
				const newComment = new Comment({
					pid: req.session._id,
					author: req.session.username,
					text: req.body.text,
					avatar: profile.avatar,
				});
				if (article.comments) {
					article.comments.push(newComment);
				} else {
					article.comments = [newComment];
				}
				const updatedArticle = await Article.findByIdAndUpdate(
					req.params.id,
					{ comments: article.comments },
					{ returnDocument: 'after' }
				);
				return updatedArticle;
			case 'updateComment':
				let _article = await Article.findById(req.params.id);
				let updatedComment = _article.comments[req.params.index];
				updatedComment.text = req.body.text;
				_article.comments[req.params.index] = updatedComment;
				const _updatedArticle = await Article.findByIdAndUpdate(
					req.params.id,
					{ comments: _article.comments },
					{ returnDocument: 'after' }
				);
				return _updatedArticle;
			case 'deleteComment':
				let cur_article = await Article.findById(req.params.id);
				let temp = cur_article.comments[cur_article.comments.length - 1];
				cur_article.comments[cur_article.comments.length - 1] =
					cur_article.comments[req.params.index];
				cur_article.comments[req.params.index] = temp;
				cur_article.comments.pop();
				const updArticle = await Article.findByIdAndUpdate(
					req.params.id,
					{ comments: cur_article.comments },
					{ returnDocument: 'after' }
				);
				return updArticle;
			default:
				return res.status(400).json({ message: 'Invalid Action' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function UploadArticleImageById(req, res) {
	try {
		const updatedArticle = await Article.findByIdAndUpdate(
			req.params.id,
			{ img: req.fileurl },
			{ returnDocument: 'after' }
		);
		return updatedArticle;
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	QueryArticles,
	QueryArticleById,
	CreateNewArticle,
	UpdateArticleById,
	UploadArticleImageById,
};
