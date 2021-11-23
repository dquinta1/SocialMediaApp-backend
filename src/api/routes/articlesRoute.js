const express = require('express');
const router = express.Router();
const {
	GetArticles,
	UpdateArticle,
	AddNewComment,
	UpdateCommentAtIndex,
	RemoveCommentAtIndex,
} = require('../controllers/articles-controller');

router.get('/:id?', GetArticles);
router.put('/:id', UpdateArticle);
router.post('/:id/comment', AddNewComment);
router.put('/:id/comments/:index', UpdateCommentAtIndex);
router.delete('/:id/comments/:index', RemoveCommentAtIndex);

module.exports = router;