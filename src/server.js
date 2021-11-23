const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const redis = require('redis');
// TODO: import libraries as needed
// TODO: import middlewares as needed
const auth = require('./api/auth/auth');
const articlesRouter = require('./api/routes/articlesRoute');
const articleRouter = require('./api/routes/articleRoute');
const profileRouter = require('./api/routes/profileRoute');
const followingRouter = require('./api/routes/followingRoute');

// testing session caching with mongoDB
// const MongoDBStore = require('connect-mongodb-session')(session);
// const store = new MongoDBStore({
// 	collection: 'mySessions',
// 	uri: process.env.CONNECTION_STRING,
// });

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
	app.use(
		session({
			store: new RedisStore({ client: redisClient }),
			// store: store,
			cookie: { maxAge: 3600 * 1000 },
			secret: process.env.REDIS_SECRET,
			saveUninitialized: false,
			resave: false,
		})
	);
	// TODO: add middlewares as needed

	// validate user authentication
	auth(app);

	// Routes
	app.use('/articles', articlesRouter);
	app.use('/article', articleRouter);
	app.use('/user-profile', profileRouter);
	app.use('/following', followingRouter);

	// Get the port from the environment, i.e., Heroku sets it
	const port = process.env.PORT || 3000;

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
