const pngToDataUri = (data) => {
	if (data && data.buffer) {
		const dataBase64 = data.buffer.toString('base64');
		return String('data:image/png;base64,' + dataBase64);
	} else {
		return null;
	}
};
module.exports = pngToDataUri;
