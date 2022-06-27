const multiparty = require('multiparty');

const formParser = async (req, res, next) => {
	try {
		if (
			req.headers['content-type'] &&
			req.headers['content-type'].includes('multipart/form-data')
		) {
			console.log('Parsing form-data...');
			// parse a file upload
			const data = null;
			const form = new multiparty.Form();
			form.parse(req, function (err, fields, files) {
				if (err) {
					throw err;
				}
				req.body = fields;
			});
		}
		next();
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = formParser;
