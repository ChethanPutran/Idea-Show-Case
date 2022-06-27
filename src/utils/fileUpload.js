const multer = require('multer');

const fileUpload = (fileTypes) => {
	console.log('Handling file...');
	const filter_file = (req, file, cb) => {
		if (fileTypes.includes(file.mimetype.split('/')[1])) {
			cb(null, true);
		} else {
			cb(
				new Error(`Only ${fileTypes.join('/')} file is allowed!`),
				false
			);
		}
	};

	return multer({
		storage: multer.memoryStorage(),
		limits: { fileSize: 2000000 },
		fileFilter: filter_file,
	});
};

module.exports = fileUpload;
