const express = require('express');
const router = express.Router();
const { GetAllArticles, GetArticleById } = require('../controllers/articles-controller');

// TODO: Set router.param on user to specify articles authored by user and those followed by them

// GET all articles - TODO: only those that should appear in the loggedInUser's feed
router.get('/', GetAllArticles);

// GET article with specific id - TODO: only those that should appear in the loggedInUser's feed
router.get('/:id', GetArticleById);

// TODO: PUT update article with specific id

module.exports = router;
