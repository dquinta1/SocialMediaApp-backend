const { QueryArticles, QueryArticleById } = require('../services/articles-services');

async function GetAllArticles(req, res) {
	const articles = await QueryArticles(req, res);
	res.json(articles);
}

async function GetArticleById(req, res) {
	const article = await QueryArticleById(req, res);
	res.json(article);
}

// async function AddNewArticle(req, res) {
// 	const article = new Article({
// 		pid: req.body.pid,
// 		author: req.body.author,
// 		text: req.body.text,
// 	});
// 	try {
// 		const newArticle = await article.save();
// 		res.status(201).json(newArticle);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// }

module.exports = { GetAllArticles, GetArticleById };
