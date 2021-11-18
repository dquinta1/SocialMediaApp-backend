const {
	login,
	register,
	logout,
	UpdatePassword,
} = require('./auth-controller');
const isAuth = require('../middlewares/is-auth');

module.exports = (app) => {
	app.post('/login', login);
	app.post('/register', register);
	app.use(isAuth);
	app.put('/password', UpdatePassword);
	app.put('/logout', logout);
};
