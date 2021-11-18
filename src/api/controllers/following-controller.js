const {
	QueryFollowingList,
	QueryFollowingByUsername,
	AddUserToFollowingList,
	DeleteFollowing,
} = require('../services/following-service');

async function GetFollowingByUsername(req, res) {
	if (!req.params.user) {
		const followingList = await QueryFollowingList(req, res);
	} else {
		const following = await QueryFollowingByUsername(req, res);
	}
}

async function AddNewFollowing(req, res) {
	const followings = await AddUserToFollowingList(req, res);
}

async function RemoveFollowing(req, res) {
	await DeleteFollowing(req, res);
}

module.exports = {
	GetFollowingByUsername,
	AddNewFollowing,
	RemoveFollowing,
};
