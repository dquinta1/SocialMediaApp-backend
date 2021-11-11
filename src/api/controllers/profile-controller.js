const {
	QueryHeadline,
	QueryEmail,
	QueryDateOfBirth,
	QueryZipcode,
	QueryAvatar,
	QueryHeadlineByUsername,
	QueryEmailByUsername,
	QueryDateOfBirthByUsername,
	QueryZipcodeByUsername,
	QueryAvatarByUsername,
	UpdateUserProfile,
} = require('../services/profile-service');

async function GetHeadline(req, res) {
	const headline = await QueryHeadline(req, res);
	res.json(headline);
}

async function GetEmail(req, res) {
	const email = await QueryEmail(req, res);
	res.json(email);
}

async function GetDateOfBirth(req, res) {
	const dob = await QueryDateOfBirth(req, res);
	res.json(dob);
}

async function GetZipcode(req, res) {
	const zipcode = await QueryZipcode(req, res);
	res.json(zipcode);
}

async function GetAvatar(req, res) {
	const avatar = await QueryAvatar(req, res);
	res.json(avatar);
}

async function GetHeadlineByUsername(req, res) {
	const headline = await QueryHeadlineByUsername(req, res);
	res.json(headline);
}

async function GetEmailByUsername(req, res) {
	const email = await QueryEmailByUsername(req, res);
	res.json(email);
}

async function GetDateOfBirthByUsername(req, res) {
	const dob = await QueryDateOfBirthByUsername(req, res);
	res.json(dob);
}

async function GetZipcodeByUsername(req, res) {
	const zipcode = await QueryZipcodeByUsername(req, res);
	res.json(zipcode);
}

async function GetAvatarByUsername(req, res) {
	const avatar = await QueryAvatarByUsername(req, res);
	res.json(avatar);
}

async function UpdateProfile(req, res) {
	const profile = await UpdateUserProfile(req, res);
	res.json(profile);
}

module.exports = {
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
};
