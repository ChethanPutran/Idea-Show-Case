const parseFormData = (req, res, next) => {
	if (req.method === 'POST') {
		if (!req.headers['content-type']) {
			next();
			return;
		}
		if (req.headers['content-type'].includes('multipart/form-data')) {
			// Use latin1 encoding to parse binary files correctly
			req.setEncoding('latin1');
			let rawData = '';

			req.on('data', (chunk) => {
				rawData += chunk;
			});
			req.on('end', () => {
				const formData = {};

				function getData(data) {
					try {
						let data_ = data.split('\n').map((item) => item.trim());
						const boundaryPrefix = '------WebKitFormBoundary';
						let boundary = data_.find((item) =>
							item.startsWith(boundaryPrefix)
						);
						data_ = data_.filter(
							(item) => item !== boundary && item !== ''
						);

						return data_;
					} catch (err) {
						return null;
					}
				}
				const data = getData(rawData);
				if (data) {
					data.forEach((item, index) => {
						// Use non-matching groups to exclude part of the result
						const match = item.match(/(?:name=")(.+?)(?:")/);
						const name = match ? match[1] : null;
						if (name) {
							const value = data[index + 1].trim();
							if (value) {
								formData[name] = value;
							}
						}
					});

					// Attach form data in request object
					req.body = formData;
				}

				next();
			});
		} else {
			next();
		}
	} else {
		next();
	}
};

module.exports = parseFormData;
