const multer = require('multer');
const stream = require('stream');
const cloudinary = require('../utils/cloudinary');

const doUpload = (publicId, req, res, next) => {
	const uploadStream = cloudinary.uploader.upload_stream(
		{ public_id: req.body[publicId] },
		(error, result) => {
			if (error) {
				console.log(error);
			} else {
				// capture the url and public_id and add to the request
				req.fileurl = result.url;
				req.fileid = result.public_id;
				next();
			}
		}
	);

	const s = new stream.PassThrough();
	s.end(req.file.buffer);
	s.pipe(uploadStream);
	s.on('end', uploadStream.end);
};

const uploadImage = (publicId) => (req, res, next) =>
	multer().single('image')(req, res, () => doUpload(publicId, req, res, next));

module.exports = uploadImage;
