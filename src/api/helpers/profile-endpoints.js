const {
	GetHeadlineByUsername,
	GetEmailByUsername,
	GetDateOfBirthByUsername,
	GetZipcodeByUsername,
	GetAvatarByUsername,
	UpdateProfile,
	UploadAvatar,
} = require('../controllers/profile-controller');
const uploadImage = require('../middlewares/upload-image');

module.exports = (app) => {
	app.get('/headline/:user?', GetHeadlineByUsername);
	app.get('/email/:user?', GetEmailByUsername);
	app.get('/dob/:user?', GetDateOfBirthByUsername);
	app.get('/zipcode/:user?', GetZipcodeByUsername);
	app.get('/avatar/:user?', GetAvatarByUsername);
	app.put('/headline', UpdateProfile);
	app.put('/email', UpdateProfile);
	app.put('/zipcode', UpdateProfile);
	app.put('/avatar', uploadImage('avatar'), UploadAvatar);
};
