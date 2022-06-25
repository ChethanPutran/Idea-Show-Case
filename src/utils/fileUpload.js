const multer = require('multer');

const fileUpload = (fileTypes) => {
	//For Disk-Storage
	// const multerStorage = multer.diskStorage({
	//     destination: (req, file, cb) => {
	//         cb(null, destination);
	//     },
	//     filename: (req, file, cb) => {
	//         const ext = file.mimetype.split("/")[1];

	//         cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
	//     },
	// });
	const multerFilter = (req, file, cb) => {
		console.log('Red');
		console.log(file);
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
		fileFilter: multerFilter,
	});
};

module.exports = fileUpload;
