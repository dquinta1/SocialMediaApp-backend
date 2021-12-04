const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
const passport = require('passport');
// TODO: import libraries as needed
// TODO: import middlewares as needed
const auth = require('./api/auth/auth');
const googleStrategy = require('./api/utils/google-strategy');
const articlesRouter = require('./api/routes/articlesRoute');
const articleRouter = require('./api/routes/articleRoute');
const profileRouter = require('./api/routes/profileRoute');
const followingRouter = require('./api/routes/followingRoute');

const corsOptions = { origin: 'http://localhost:3000', credentials: true };

mongoose.connection.on('connected', (ref) => {
	console.log('Connected to DB!');

	const app = express();

	// Redis memcache set-up
	let RedisStore = require('connect-redis')(session);
	let redisClient = redis.createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		auth_pass: process.env.REDIS_PASSWORD,
	});
	redisClient.on('error', (err) => console.log('Redis Client Error', err));

	// Middleware set-up
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));
	app.use(
		session({
			store: new RedisStore({ client: redisClient }),
			cookie: { maxAge: 3600 * 1000 },
			secret: process.env.REDIS_SECRET,
			saveUninitialized: false,
			resave: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function (user, done) {
		done(null, user);
	});
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});
	passport.use(googleStrategy);
	// TODO: add middlewares as needed

	// Google Auth
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile','email'],
		})
	);
	app.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect: 'http://daq2-social-media-app-frontend.surge.sh/',
        failureRedirect: 'http://daq2-social-media-app-frontend.surge.sh/login' }));

	// validate user authentication
	auth(app);

	// Routes
	app.use('/articles', articlesRouter);
	app.use('/article', articleRouter);
	app.use('/profile', profileRouter);
	app.use('/following', followingRouter);

	// Get the port from the environment, i.e., Heroku sets it
	const port = process.env.PORT || 4000;

	const server = app.listen(port, () => {
		const addr = server.address();
		console.log(`Server listening at http://${addr.address}:${addr.port}`);
	});
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	console.error('Failed to connect to DB on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection to DB: disconnected');
});

var gracefulExit = () => {
	mongoose.connection.close(() => {
		console.log(
			'Mongoose default connection with DB: is disconnected through app termination'
		);
		process.exit(0);
	});
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {
	// options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };
	mongoose.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Trying to connect to DB');
} catch (err) {
	console.log('Sever initialization failed ', err.message);
}
