const Profile = require('../models/Profile');

async function QueryFollowingList(req, res) {
	try {
		// get loggedInUser profile to access list of following
		const profile = await Profile.findById(req.session._id);
		console.log('QueryFollowingList', profile);
		console.log('QueryFollowingList', profile.following[0]);

		// check that user follows at least one other user
		if (profile.following.length > 0) {
			let followingList = [];

			// query the users' profiles using the list of _id in loggedInUser's profile
			await profile.following.forEach(async (following_username) => {
				const newFollowing = await Profile.findOne({
					username: following_username,
				});
				console.log('newFollowing', newFollowing);
				followingList.push(newFollowing);
			});
			res.send(followingList);
		} else {
			res.send(profile.following);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function QueryFollowingByUsername(req, res) {
	try {
		// get loggedInUser profile to access list of following
		const profile = await Profile.findById(req.session._id);

		// check that user follows at least one other user
		if (profile.following.length > 0) {
			const followingUser = await Profile.findOne({
				username: req.params.user,
			});

			// user does not exist
			if (followingUser == null) {
				return res.status(404).json({ message: 'This user does not exist' });
			}

			// if user's username matches one of the usernames in list of following, user is found
			profile.following.forEach((following_username) => {
				console.log('following_username', following_username);
				if (following_username === followingUser.username) {
					console.log('following_username', following_username);
					res.send(followingUser);
				}
			});

			// user exists but is not being followed by loggedInUser
			return res.status(404).json({ message: 'You do not follow this user' });
		} else {
			return res
				.status(404)
				.json({ message: 'You are not following any users' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function AddUserToFollowingList(req, res) {
	try {
		const newFollowing = await Profile.findOne({ username: req.params.user });

		// user does not exist
		if (newFollowing == null) {
			return res.status(404).json({ message: 'This user does not exist' });
		}

		// get loggedInUser's profile to access list of following
		const profile = await Profile.findById(req.session._id);

		if (profile.following.length > 0) {
			profile.following.forEach((following_username) => {
				// user is already being followed by loggedInUser
				if (newFollowing.username === following_username) {
					return res
						.status(400)
						.json({ message: 'You already follow this user' });
				}
			});

			// add following id to list and update loggedInUser's profile
			let newFollowingList = profile.following;
			newFollowingList.push(newFollowing.username);
			await Profile.findByIdAndUpdate(
				req.session._id,
				{ following: newFollowingList },
				{ returnDocument: 'after' }
			);
		} else {
			// update loggedInUser's following list with new user
			await Profile.findByIdAndUpdate(
				req.session._id,
				{ following: [newFollowing.username] },
				{ returnDocument: 'after' }
			);
		}
		// return updated list of following Users
		await QueryFollowingList(req, res);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

async function DeleteFollowing(req, res) {
	try {
		// get loggedInUser profile to access list of following
		const profile = await Profile.findById(req.session._id);

		// check that user follows at least one other user
		if (profile.following.length > 0) {
			const following = await Profile.findOne({ username: req.params.user });

			// user does not exist
			if (following == null) {
				return res.status(404).json({ message: 'This user does not exist' });
			}

			// if user's id matches one of the ids in list of following, user is found
			for (let index = 0; index < profile.following.length; index++) {
				const following_username = profile.following[index];
				if (following_username === following.username) {
					let temp = profile.following[profile.following.length - 1];
					profile.following[profile.following.length - 1] =
						profile.following[index];
					profile.following[index] = temp;
					profile.following.pop();
					await Profile.findByIdAndUpdate(req.session._id, {
						following: profile.following,
					});
					res.sendStatus(200);
				}
			}

			// user exists but is not being followed by loggedInUser
			return res.status(404).json({ message: 'You do not follow this user' });
		} else {
			return res
				.status(404)
				.json({ message: 'You are not following any users' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	QueryFollowingList,
	QueryFollowingByUsername,
	AddUserToFollowingList,
	DeleteFollowing,
};
