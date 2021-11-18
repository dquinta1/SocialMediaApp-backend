const {
	QueryFollowingList,
	QueryFollowingByUsername,
	AddUserToFollowingList,
	DeleteFollowing,
} = require('../services/following-service');

async function GetFollowingByUsername(req, res) {
	if (!req.params.user) {
		const followingList = await QueryFollowingList(req, res);
		res.json(followingList);
	} else {
		const following = await QueryFollowingByUsername(req, res);
		// res.json(following);
	}
}

async function AddNewFollowing(req, res) {
	const followingList = await AddUserToFollowingList(req, res);
	res.json(followingList);
}

async function RemoveFollowing(req, res) {
	await DeleteFollowing(req, res);
}

module.exports = {
	GetFollowingByUsername,
	AddNewFollowing,
	RemoveFollowing,
};
