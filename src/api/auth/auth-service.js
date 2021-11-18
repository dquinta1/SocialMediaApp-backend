// require('dotenv').config();
// const jwt = require('jsonwebtoken');
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

	// set auth params and send success message if no errors are found
	try {
		const isMatch = await bcrypt.compare(password, user.password);

		// wrong password provided
		if (!isMatch) {
			res.sendStatus(401);
		}

		/* Using session */
		req.session.isAuth = true;
		req.session.username = user.username;
		req.session._id = user._id;
		let msg = { username: username, result: 'success' };
		res.send(msg);
		/**END**/

		/* Using JWT */
		// const payload = {
		// 	user: {
		// 		username: user.username,
		// 	},
		// };

		// const token = jwt.sign(payload, process.env.JWT_SECRET, {
		// 	expiresIn: '1hr',
		// });

		// res.json({ token });
		/**END**/
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

	// save new user and send success message if no errors are found
	try {
		// create new User saving user's auth data
		user = new User({
			username: username,
			password: hasdPsw,
		});
		await user.save();

		// create new Profile with new User's info
		const { headline, email, zipcode, dob } = req.body;
		const profile = new Profile({
			_id: user._id,
			username: username,
			headline: headline,
			email: email,
			zipcode: zipcode,
			dob: dob,
			avatar: null,
		});
		await profile.save();

		/* Using sessions */
		req.session.isAuth = true;
		req.session.username = user.username;
		req.session._id = user._id;
		let msg = { username: username, result: 'success' };
		res.send(msg);
		/**END**/

		/* Using JWT */
		// const payload = {
		// 	user: {
		// 		username: user.username,
		// 	},
		// };

		// const token = jwt.sign(payload, process.env.JWT_SECRET, {
		// 	expiresIn: '1hr',
		// });

		// res.status(201).json({ token });
		/**END**/
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function SignOut(req, res) {
	/* Using sessions */
	await req.session.destroy((err) => {
		if (err) {
			res.status(500).json({ message: error.message });
		}
		res.sendStatus(200);
	});
	/**END**/

	/* Using JWT */
	// try {
	// 	req.cookie('jwt', '', { maxAge: 1});
	// } catch (error) {
	// 	res.status(500).json({ message: error.message });
	// }
	/**END**/
}

async function ReplacePassword(req, res) {
	const { oldPassword, newPassword } = req.body;

	// supply old and new password
	if (!oldPassword || !newPassword) {
		return res
			.status(401)
			.json({ message: 'oldPassword and newPassword must be provided' });
	}

	try {
		const user = await User.findById(req.session._id);
		const isMatch = await bcrypt.compare(oldPassword, user.password);

		// wrong password provided
		if (!isMatch) {
			res.sendStatus(401);
		}

		// hash password and save hash in DB
		const hasdPsw = await bcrypt.hash(newPassword, 12);

		// update hashed password on DB
		await User.findByIdAndUpdate(req.session._id, { password: hasdPsw });
		res.send({ useranme: req.session.username, result: 'success' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	SignInWithUsernameAndPassword,
	SignUpWithUsernameAndPassword,
	SignOut,
	ReplacePassword,
};
