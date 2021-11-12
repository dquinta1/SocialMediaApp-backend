const express = require('express');
const router = express.Router();
const { AddNewArticle } = require('../controllers/articles-controller');

router.post('/', AddNewArticle);

module.exports = router;
