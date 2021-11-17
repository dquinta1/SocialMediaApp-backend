const multer = require('multer');
const stream = require('stream');
const cloudinary = require('../utils/cloudinary');

const doUpload = (publicId, req, res, next) => {
	const uploadStream = cloudinary.uploader.upload_stream(
		(result) => {
			// capture the url and public_id and add to the request
			req.fileurl = result.url;
			req.fileid = result.public_id;
			next();
		},
		{ public_id: req.body[publicId] }
	);

	const s = new stream.PassThrough();
	s.end(req.file.buffer);
	s.pipe(uploadStream);
	s.on('end', uploadStream.end);
};

const uploadImage = (publicId) => (req, res, next) =>
	multer().single('image')(req, res, () => doUpload(publicId, req, res, next));

module.exports = uploadImage;
