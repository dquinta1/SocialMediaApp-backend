const express = require('express');
const router = express.Router();
const { GetAllArticles, GetArticleById } = require('../controllers/articles-controller');

// TODO: Set router.param on user to specify articles authored by user and those followed by them

router.get('/', GetAllArticles);
router.get('/:id', GetArticleById);
// TODO: PUT update article with specific id

module.exports = router;
