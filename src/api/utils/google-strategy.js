const GoogleStrategy = require('passport-google-oauth2').Strategy;

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        let user = {
            /*'email': profile.emails[0].value,
    'name' : profile.name.givenName + ' ' + profile.name.familyName,
    'id'   : profile.id,*/
            token: accessToken,
        };
        // You can perform any necessary actions with your user at this point,
        // e.g. internal verification against a users table,
        // creating new user entries, etc.

        return done(null, user);
        // User.findOrCreate(..., function(err, user) {
        //     if (err) { return done(err); }
        //     done(null, user);
        // });
    }
)

module.exports = googleStrategy;
