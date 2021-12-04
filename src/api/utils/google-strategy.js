const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: 'http://localhost:4000/auth/google/callback',
	},
	async function (accessToken, refreshToken, profile, done) {
		let user = {
			googleId: profile.id,
			email: profile.emails[0].value,
			username: profile.emails[0].value,
			token: accessToken,
		};
		// You can perform any necessary actions with your user at this point,
		// e.g. internal verification against a users table,
		// creating new user entries, etc.

        try {
			//find the user in our database 
			let newUser = await User.findOne({ googleId: profile.id })
  
			if (newUser) {
			  //If newUser present in our database.
			  done(null, newUser)
			} else {
			  // if newUser is not preset in our database save user data to database.
			  newUser = await User.create(user)
			  done(null, newUser)
			}
		  } catch (err) {
			console.error(err)
		  }
	}
);

module.exports = googleStrategy;
