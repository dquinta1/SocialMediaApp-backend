const express = require('express');
const router = express.Router();
const { AddNewArticle } = require('../controllers/articles-controller');

// TODO: Set router.param on user to specify articles authored by user and those followed by them

// POST new article authored by loggedInUser
router.post('/', AddNewArticle);

module.exports = router;
