const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

async function SignInWithUsernameAndPassword(req, res) {
	const { username, password } = req.body;

	// supply username and password
	if (!username || !password) {
		return res.sendStatus(400);
	}

	// check that a user with provided username exists in collection
	const user = await User.findOne({ username });

	// unauthorized log-in, user does not exist
	if (!user) {
		res.sendStatus(401);
	}

	try {
		const isMatch = await bcrypt.compare(password, user.password);

		// wrong password provided
		if (!isMatch) {
			res.sendStatus(401);
		}

		// set auth params and send success message if no errors are found
		req.session.isAuth = true;
		req.session.username = user.username;
		let msg = { username: username, result: 'success' };
		res.send(msg);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function SignUpWithUsernameAndPassword(req, res) {
	const { username, password } = req.body;

	// supply username and password
	if (!username || !password) {
		return res.sendStatus(400);
	}

	let user = await User.findOne({ username });

	// username is already in use, unauthorized
	if (user) {
		return res.sendStatus(401);
	}

	let hasdPsw;

	try {
		// hash password and save hash in DB
		hasdPsw = await bcrypt.hash(password, 12);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	// create new User saving user's auth data
	user = new User({
		username,
		password: hasdPsw,
	});

	// create new Profile with new User's info
	const { headline, email, zipcode, dob } = req.body;
	const profile = new Profile({
		username,
		headline,
		email,
		zipcode,
		dob,
	});

	try {
		// save new user and send success message if no errors are found
		await user.save();
		await profile.save();
		let msg = { username: username, result: 'success' };
		res.send(msg);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function SignOut(req, res) {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json({ message: error.message });
		}
		res.send({ result: 'success' });
	});
}

async function ReplacePassword(req, res) {
	throw Error('Not Implemented');
}

module.exports = {
	SignInWithUsernameAndPassword,
	SignUpWithUsernameAndPassword,
	SignOut,
	ReplacePassword,
};
