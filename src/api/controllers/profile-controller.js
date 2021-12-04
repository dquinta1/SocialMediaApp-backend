const {
	QueryProfileByUsername,
	UpdateUserProfile,
	UpdateAvatar,
} = require('../services/profile-service');

async function GetProfile(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile);
}

async function UpdateProfile(req, res) {
	const updatedProfile = await UpdateUserProfile(req, res);
	res.json(updatedProfile);
}

async function UploadAvatar(req, res) {
	const profile = await UpdateAvatar(req, res);
	res.json({ username: req.session.user, avatar: profile.avatar });
}

module.exports = {
	GetProfile,
	UpdateProfile,
	UploadAvatar,
};
