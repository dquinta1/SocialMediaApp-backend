const express = require('express');
const router = express.Router();

const {
	GetFollowingByUsername,
	AddNewFollowing,
	RemoveFollowing,
} = require('../controllers/following-controller');

router.get('/:user?', GetFollowingByUsername);
router.put('/:user', AddNewFollowing);
router.delete('/:user', RemoveFollowing);

module.exports = router;
