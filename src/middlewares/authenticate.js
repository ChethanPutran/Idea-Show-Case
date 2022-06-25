const User = require('../modals/user');
const jwt = require('jsonwebtoken');

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
		// const token = req.header('Authorization').replace('Bearer ', '');
		const token = req.cookies.jwt;
		const decodedToken = verifyAuthToken(token);
		const user = await User.findOne({
			_id: decodedToken._id,
			'tokens.token': token,
		});

		if (!user) {
			throw new Error('Session Expired!');
		}
		req.token = token;
		// req.token =
		// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM5NjRlNjhkODE0OTBlNGM0ZDA2ZWYiLCJpYXQiOjE2NDQwNTkyOTgsImV4cCI6MTY0NDY2NDA5OH0.-oFsyQeZO7qz5jeTvVUMQ0ZNLBYMNg3gQvpprIZbEMs';
		// req.user = {
		// 	_id: '613964e68d81490e4c4d06ef',
		// 	name: 'Rock Joker',
		// 	email: 'rockjoker@gmail.com',
		// 	phone: '7624853557',
		// 	about: 'Innovation is going on...',
		// 	loggedIn: true,
		// };

		// req.user = user;
		next();
	} catch (err) {
		res.status(401).render('login');
	}
};

module.exports = authenticate;
