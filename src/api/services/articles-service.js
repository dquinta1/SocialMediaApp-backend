const Article = require('../models/Article');

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

module.exports = { QueryArticles, QueryArticleById, CreateNewArticle };
