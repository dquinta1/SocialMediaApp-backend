const express = require('express');
const router = express.Router();
const {
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
	UpdateProfile,
} = require('../controllers/profile-controller');

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
router.patch('/', UpdateProfile);

module.exports = router;
