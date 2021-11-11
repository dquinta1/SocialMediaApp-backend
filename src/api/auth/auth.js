const { login, register, isLoggedIn } = require('./auth-controller');

module.exports = (app) => {
	app.post('/login', login);
	app.post('/register', register);
	app.use(isLoggedIn);
};
