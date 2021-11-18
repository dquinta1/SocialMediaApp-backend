const Profile = require('../models/Profile');

async function QueryProfileByUsername(req, res) {
	// query loggedInUser's profile if no specific username is passed
	if (!req.params.user) {
		try {
			const profile = await Profile.findOne({ username: req.session.username });
			return profile;
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	} else {
		try {
			const profile = await Profile.findOne({ username: req.params.user });
			return profile;
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

async function UpdateUserProfile(req, res) {
	try {
		const newProfile = await Profile.findByIdAndUpdate(
			req.session._id,
			req.body,
			{ returnDocument: 'after' }
		);
		return newProfile;
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function UpdateAvatar(req, res) {
	try {
		const newProfile = await Profile.findByIdAndUpdate(
			req.session._id,
			{ avatar: req.fileurl },
			{ returnDocument: 'after' }
		);
		return newProfile;
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	QueryProfileByUsername,
	UpdateUserProfile,
	UpdateAvatar,
};
