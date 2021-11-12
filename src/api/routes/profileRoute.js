const express = require('express');
const router = express.Router();
const {
	GetProfile,
	UpdateProfile,
	// redundant imports below
	GetHeadline,
	GetEmail,
	GetDateOfBirth,
	GetZipcode,
	GetAvatar,
	GetHeadlineByUsername,
	GetEmailByUsername,
	GetDateOfBirthByUsername,
	GetZipcodeByUsername,
	GetAvatarByUsername,
} = require('../controllers/profile-controller');

// only use these endpoints in practice
router.get('/:user?', GetProfile);
router.patch('/', UpdateProfile);

// these are some redundant endpoints to meet requirements
router.get('/headline', GetHeadline);
router.get('/headline/:user', GetHeadlineByUsername);
router.get('/email', GetEmail);
router.get('/email/:user', GetEmailByUsername);
router.get('/dob', GetDateOfBirth);
router.get('/dob/:user', GetDateOfBirthByUsername);
router.get('/zipcode', GetZipcode);
router.get('/zipcode/:user', GetZipcodeByUsername);
router.get('/avatar', GetAvatar);
router.get('/avatar/:user', GetAvatarByUsername);
router.put('headline', UpdateProfile);
router.put('email', UpdateProfile);
router.put('zipcode', UpdateProfile);
router.put('avatar', UpdateProfile);

module.exports = router;
