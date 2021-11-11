const {
	ValidateUserAuthentication,
	SignInWithUsernameAndPassword,
	SignUpWithUsernameAndPassword,
} = require('./auth-service');

async function isLoggedIn(req, res, next) {
	await ValidateUserAuthentication(req, res, next);
}

async function login(req, res) {
	await SignInWithUsernameAndPassword(req, res);
}

async function register(req, res) {
	await SignUpWithUsernameAndPassword(req, res);
}

module.exports = { login, register, isLoggedIn };
