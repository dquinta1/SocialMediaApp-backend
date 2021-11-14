const {
	SignInWithUsernameAndPassword,
	SignUpWithUsernameAndPassword,
	SignOut,
	ReplacePassword,
} = require('./auth-service');

async function login(req, res) {
	await SignInWithUsernameAndPassword(req, res);
}

async function register(req, res) {
	await SignUpWithUsernameAndPassword(req, res);
}

async function logout(req, res) {
	await SignOut(req, res);
}

async function UpdatePassword(req, res) {
	await ReplacePassword(req, res);
}

module.exports = { login, register, logout, UpdatePassword };
