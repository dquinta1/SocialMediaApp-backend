const express = require('express');
const router = express.Router();
const {
	GetAllArticles,
	GetArticleById,
	UpdateArticle,
	AddNewComment,
	UpdateCommentAtIndex,
	RemoveCommentAtIndex,
} = require('../controllers/articles-controller');

router.get('/', GetAllArticles);
router.get('/:id', GetArticleById);
router.patch('/:id', UpdateArticle);
router.post('/:id/comment', AddNewComment);
router.patch('/:id/comments/:index', UpdateCommentAtIndex);
router.delete('/:id/comments/:index', RemoveCommentAtIndex);

module.exports = router;
