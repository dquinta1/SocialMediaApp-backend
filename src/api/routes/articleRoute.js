const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// TODO: Set router.param on user to specify articles authored by user and those followed by them

// POST new article authored by loggedInUser
router.post('/', async (req, res) => {
	const article = new Article({
		pid: req.body.pid,
		author: req.body.author,
		text: req.body.text,
	});
    try {
        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

module.exports = router;
