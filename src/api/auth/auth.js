const {
	login,
	register,
	isLoggedIn,
	logout,
	UpdatePassword,
} = require('./auth-controller');

module.exports = (app) => {
	app.post('/login', login);
	app.post('/register', register);
	app.use(isLoggedIn);
	app.post('/password', UpdatePassword);
	app.put('/logout', logout);
};
