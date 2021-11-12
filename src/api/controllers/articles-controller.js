const {
	QueryArticles,
	QueryArticleById,
	CreateNewArticle,
	UpdateArticleById,
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

/**
 * Update Article's properties by setting req.action = 'updateArticle'
 * @param req The request containing new Article properties to update
 * @param res The response containing the updated article
 */
async function UpdateArticle(req, res) {
	req.action = 'updateArticle';
	const updatedArticle = await UpdateArticleById(req, res);
	res.json(updatedArticle);
}

/**
 * Add new comment to Article's comments by setting req.action = 'addComment'.
 * @param req The request containing the new comment to add
 * @param res The response containing the updated article
 */
async function AddNewComment(req, res) {
	req.action = 'addComment';
	const updatedArticle = await UpdateArticleById(req, res);
	res.status(201).json(updatedArticle);
}

/**
 * Update comment at specified index in Article's comments by setting req.action = 'updateComment'.
 * @param req The request containing the comment to update
 * @param req.param.index The index of the comment to be updated
 * @param res The response containing the updated article
 */
async function UpdateCommentAtIndex(req, res) {
	req.action = 'updateComment';
	const updatedArticle = await UpdateArticleById(req, res);
	res.json(updatedArticle);
}

/**
 * Remove comment at specified index in Article's comments by setting req.action = 'deleteComment'.
 * @param req The request
 * @param req.params.index The index of the comment to be removed
 * @param res The response containing the updated article
 */
async function RemoveCommentAtIndex(req, res) {
	req.action = 'deleteComment';
	const updatedArticle = await UpdateArticleById(req, res);
	res.json(updatedArticle);
}

module.exports = {
	GetAllArticles,
	GetArticleById,
	AddNewArticle,
	UpdateArticle,
	AddNewComment,
	UpdateCommentAtIndex,
	RemoveCommentAtIndex,
};
