const express = require('express');
const router = express.Router();
const {
	GetProfile,
	UpdateProfile,
	UploadAvatar,
} = require('../controllers/profile-controller');
const uploadImage = require('../middlewares/upload-image');

router.get('/:user?', GetProfile);
router.patch('/', UpdateProfile);
router.put('/avatar', uploadImage('avatar'), UploadAvatar);

module.exports = router;
