const {
	QueryArticles,
	QueryArticleById,
	CreateNewArticle,
	UpdateArticleById,
} = require('../services/articles-service');
const { QueryFollowingList } = require('../services/following-service');
const { QueryProfileByUsername } = require('../services/profile-service');

/**
 * Returns an article if the id was specified, otherwise returns list of articles
 * authored by user and the users followed by them.
 * @param req The request
 * @param {optional} req.params.id The id of the specific article to return
 * @param res The response containing the specified article or list of articles
 */
async function GetArticles(req, res) {
	if (!req.params.id) {
		// find articles authored by loggedInUser
		req.pid = req.session._id;
		let articles = await QueryArticles(req, res);

		// get all articles authored by loggedInUser's followed users
		req.username = req.session.username;
		const loggedInUserProfile = await QueryProfileByUsername(req, res);
		if (loggedInUserProfile.following.length > 0) {
			const followingList = await QueryFollowingList(req, res);
			followingList.forEach(async (following) => {
				req.pid = following._id;
				let followingArticles = await QueryArticles(req, res);
				articles.concat(followingArticles);
			});
		}
		res.json(articles);
	} else {
		const article = await QueryArticleById(req, res);
		res.json(article);
	}
}

/**
 * Creates a new article authored by the loggedInUser
 * @param req The request containing the contents of the article to be created
 * @param res The response containing array of articles with newly added article
 */
async function AddNewArticle(req, res) {
	const articles = await CreateNewArticle(req, res);
	res.status(201).json(articles);
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
	GetArticles,
	AddNewArticle,
	UpdateArticle,
	AddNewComment,
	UpdateCommentAtIndex,
	RemoveCommentAtIndex,
};
