const multiparty = require('multiparty');

const formParser = (req, res, next) => {
	if (!req.headers['content-type']) {
		next();
		return;
	}
	if (req.headers['content-type'].includes('multipart/form-data')) {
		// parse a file upload
		var form = new multiparty.Form();
		form.parse(req, function (err, fields, files) {
			console.log(fields, files);
			req.body = fields;
			req.files = files;
		});
		next();
	}
	next();
};

module.exports = formParser;
