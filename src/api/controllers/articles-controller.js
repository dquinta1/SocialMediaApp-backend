const {
	QueryArticles,
	QueryArticleById,
	CreateNewArticle
} = require('../services/articles-service');

async function GetAllArticles(req, res) {
	const articles = await QueryArticles(req, res);
	res.json(articles);
}

async function GetArticleById(req, res) {
	const article = await QueryArticleById(req, res);
	res.json(article);
}

async function AddNewArticle(req, res) {
	const newArticle = await CreateNewArticle(req, res);
	res.status(201).json(newArticle);
}

module.exports = { GetAllArticles, GetArticleById, AddNewArticle };
