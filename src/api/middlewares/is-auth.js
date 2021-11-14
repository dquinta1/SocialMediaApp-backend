// require('dotenv').config();
// const jwt = require('jsonwebtoken');

/* Authorization using JWT */
// module.exports = (req, res, next) => {
// 	const authHeader = req.header('Authorization');

// 	// no auth token found in header
// 	if (!authHeader) {
// 		res.sendStatus(401);
// 	}

// 	// validate token
// 	try {
// 		const decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);

// 		req.username = decodedToken.user.username;

// 		next();
// 	} catch (err) {
// 		res.sendStatus(401);
// 	}
// };
/**END**/

/* Authorization using session */
module.exports = (req, res, next) => {
	if (req.session.isAuth) {
		next();
	} else {
		return res.sendStatus(401);
	}
};
/**END**/