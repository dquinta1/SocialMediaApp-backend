const {
	QueryProfileByUsername,
	UpdateUserProfile,
	UpdateAvatar,
} = require('../services/profile-service');

async function GetProfile(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ profile: profile });
}

async function UpdateProfile(req, res) {
	const updatedProfile = await UpdateUserProfile(req, res);
	res.json({ profile: updatedProfile });
}

async function UploadAvatar(req, res) {
	const profile = await UpdateAvatar(req, res);
	res.json({ username: req.session.user, avatar: profile.avatar });
}

/***  redundant functions below ***/

async function GetHeadlineByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ username: req.params.user || req.session.username, headline: profile.headline });
}

async function GetEmailByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ username: req.params.user || req.session.username, email: profile.email });
}

async function GetDateOfBirthByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ username: req.params.user || req.session.username, dob: profile.dob });
}

async function GetZipcodeByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ username: req.params.user || req.session.username, zipcode: profile.zipcode });
}

async function GetAvatarByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json({ username: req.params.user || req.session.username, avatar: profile.avatar });
}

module.exports = {
	GetProfile,
	UpdateProfile,
	UploadAvatar,
	// redundant exports below
	GetHeadlineByUsername,
	GetEmailByUsername,
	GetDateOfBirthByUsername,
	GetZipcodeByUsername,
	GetAvatarByUsername,
};
