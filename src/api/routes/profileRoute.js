const express = require('express');
const router = express.Router();
const {
	GetProfile,
	UpdateProfile,
	// redundant imports below
	GetHeadlineByUsername,
	GetEmailByUsername,
	GetDateOfBirthByUsername,
	GetZipcodeByUsername,
	GetAvatarByUsername,
} = require('../controllers/profile-controller');

/* ONLY USE THESE ENDPOINTS IN PRACTICE */
// router.get('/:user?', GetProfile);
router.patch('/', UpdateProfile);

/* these are some redundant endpoints to meet requirements DO NOT USE IN PRACTICE*/
router.get('/headline/:user?', GetHeadlineByUsername);
router.get('/email/:user?', GetEmailByUsername);
router.get('/dob/:user?', GetDateOfBirthByUsername);
router.get('/zipcode/:user?', GetZipcodeByUsername);
router.get('/avatar/:user?', GetAvatarByUsername);
router.put('/headline', UpdateProfile);
router.put('/email', UpdateProfile);
router.put('/zipcode', UpdateProfile);
router.put('/avatar', UpdateProfile);

module.exports = router;
