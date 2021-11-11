const User = require('../models/User');

async function ValidateUserAuthentication(req, res, next) {
	throw Error('Not implemented');
}

async function SignInWithUsernameAndPassword(req, res) {
	throw Error('Not Implemented');
}

async function SignUpWithUsernameAndPassword(req, res) {
	throw Error('Not Implemented');
}

module.exports = {
	ValidateUserAuthentication,
	SignInWithUsernameAndPassword,
	SignUpWithUsernameAndPassword,
};
