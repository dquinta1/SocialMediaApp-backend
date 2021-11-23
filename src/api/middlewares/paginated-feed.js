module.exports = (req, res, next) => {
	if (req.query.page) {
		const page = parseInt(req.query.page);
		req.startIndex = page * 5;
	}
	next();
};
