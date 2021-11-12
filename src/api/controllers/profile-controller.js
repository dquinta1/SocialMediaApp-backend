const {
	QueryProfileByUsername,
	UpdateUserProfile,
} = require('../services/profile-service');

async function GetProfile(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile);
}

async function UpdateProfile(req, res) {
	const updatedProfile = await UpdateUserProfile(req, res);
	res.json(updatedProfile);
}

/***  redundant functions below ***/

async function GetHeadline(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.headline);
}

async function GetEmail(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.email);
}

async function GetDateOfBirth(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.dob);
}

async function GetZipcode(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.zipcode);
}

async function GetAvatar(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.avatar);
}

async function GetHeadlineByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.headline);
}

async function GetEmailByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.email);
}

async function GetDateOfBirthByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.dob);
}

async function GetZipcodeByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.zipcode);
}

async function GetAvatarByUsername(req, res) {
	const profile = await QueryProfileByUsername(req, res);
	res.json(profile.avatar);
}

module.exports = {
	GetProfile,
	UpdateProfile,
	// redundant exports below
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
};
