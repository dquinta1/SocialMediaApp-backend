require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// TODO: import libraries as needed
// TODO: import middlewares as needed
const articlesRouter = require('./api/routes/articlesRoute');
const articleRouter = require('./api/routes/articleRoute');
// TODO: import routes

mongoose.connection.on('connected', function (ref) {
	console.log('Connected to DB!');

	const app = express();

	// Add middleware set-up
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	// Add routes
	app.use('/articles', articlesRouter);
	app.use('/article', articleRouter);

	// Get the port from the environment, i.e., Heroku sets it
	const port = process.env.PORT || 3000;

	const server = app.listen(port, () => {
		const addr = server.address();
		console.log(`Server listening at http://${addr.address}:${addr.port}`);
	});
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
	console.error('Failed to connect to DB on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection to DB: disconnected');
});

var gracefulExit = function () {
	mongoose.connection.close(function () {
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
	console.log('Trying to connect to DB ');
} catch (err) {
	console.log('Sever initialization failed ', err.message);
}
