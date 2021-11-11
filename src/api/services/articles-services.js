const Article = require('../models/Article');

async function QueryArticles(req, res) {
	try {
		const articles = await Article.find();
		return articles;
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

module.exports = { QueryArticles, QueryArticleById };
