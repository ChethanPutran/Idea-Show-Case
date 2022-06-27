const verifyAuthToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
		return decodedToken;
	} catch (err) {
		throw new Error('Invalid Token!');
	}
};

const authenticate = async (req, res, next) => {
	try {
		console.log('Auth running...');

		//Cookie Handler
		// const token = req.cookies.jwt;
		//const decodedToken = verifyAuthToken(token);
		// const user = await User.findOne({
		// 	_id: decodedToken._id,
		// 	'tokens.token': token,
		// });
		const user_id = req.session.user_id;

		if (!user_id) {
			throw new Error('Session Expired!');
		}
		next();
	} catch (err) {
		console.log(err.message);
		res.redirect('/login');
	}
};

module.exports = authenticate;
