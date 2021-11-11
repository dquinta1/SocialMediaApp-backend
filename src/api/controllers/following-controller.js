const {
	QueryFollowingList,
	QueryFollowingByUsername,
	AddUserToFollowingList,
	DeleteFollowing,
} = require('../services/following-service');

async function GetAllFollowing(req, res) {
	const followingList = await QueryFollowingList(req, res);
	res.json(followingList);
}

async function GetFollowingByUsername(req, res) {
	const following = await QueryFollowingByUsername(req, res);
	res.json(following);
}

async function AddNewFollowing(req, res) {
	const following = await AddUserToFollowingList(req, res);
	res.json(following);
}

async function RemoveFollowing(req, res) {
	await DeleteFollowing(req, res);
	res.json({ message: 'User removed successfully' });
}

module.exports = {
	GetAllFollowing,
	GetFollowingByUsername,
	AddNewFollowing,
	RemoveFollowing,
};
