const express = require('express');
const authenticate = require('../middlewares/authenticate');
const User = require('../modals/user');
const formParser = require('../utils/parseForm');
const { ObjectId } = require('mongodb');

const router = new express.Router();

router.get('/login', (req, res) => {
	res.status(200).render('login', { message: req.flash('message') });
});
router.get('/', authenticate, async (req, res) => {
	try {
		const user = await User.findById(new ObjectId(req.session.user_id));

		res.status(200).render('home', {
			user: user,
			message: req.flash('message'),
		});
	} catch (err) {
		console.log(err);
		res.status(200).render('home', { message: err.message });
	}
});

router.post(
	'/login',
	(req, res, next) => {
		formParser(req, res, next);
	},
	async (req, res) => {
		try {
			const user = await User.findByCredentials(
				req.body.email,
				req.body.password
			);
			req.session.user_id = user._id;

			//Cookie
			//const token = await user.generateAuthToken();
			// res.cookie('jwt', token, {
			// 	expires: new Date(Date.now() + 600000),
			// 	httpOnly: false,
			// });

			req.flash('message', 'Login sucessful :)');
			res.redirect('/');
		} catch (err) {
			console.log(err.message);
			req.flash('message', err.message);
			res.redirect('/login');
		}
	}
);

router.get('/logout', authenticate, async (req, res) => {
	try {
		//Using cookie only
		// req.user.tokens = req.user.tokens.filter((obj) => {
		// 	return obj.token !== req.token;
		// });
		// res.clearCookie('jwt');
		// await req.user.save();

		//Using session
		req.session.destroy();

		res.redirect('/');
	} catch (err) {
		console.log(err);
		req.flash('message', err.message);
		res.redirect('/');
	}
});

router.post('/logoutAll', authenticate, async (req, res) => {
	try {
		// req.user.tokens = [];
		// await req.user.save();
		req.session.destroy();
		res.redirect('/');
	} catch (err) {
		console.log(err);
		req.flash('message', err.message);
		res.redirect('/');
	}
});

router.post(
	'/signup',
	(req, res, next) => {
		formParser(req, res, next);
	},
	async (req, res) => {
		try {
			const name = req.body.name;
			const email = req.body.email;
			const password = req.body.password;
			const dob = req.body.dob;
			const designation = req.body.designation;
			const street = req.body.street;
			const city = req.body.city;
			const country = req.body.country;
			const zip = req.body.zip;
			const phone_number = req.body.phoneNumber;

			const user = new User({
				name,
				email,
				password,
				dob,
				designation,
				address: { street, country, zip, city },
				phone_number,
			});
			await user.save();
			// sendWelcomeEmail(user.name, user.email);
			req.flash('message', 'Signup sucessfull! Login and enjoy ;)');
			res.redirect('/login');
		} catch (err) {
			console.log(err.message);
			console.log(err.name);

			if (err.message.includes('duplicate key error collection')) {
				req.flash('message', 'Email has been taken!');
			} else {
				req.flash('message', err.message);
			}
			res.redirect('/signup');
		}
	}
);
router.get('/signup', (req, res) => {
	res.status(200).render('signup', { message: req.flash('message') });
});

router.post('/forgotPass', async (req, res) => {
	try {
		const user = await User.find({ email: req.body.email });
		if (!user) {
			res.status(400).send({ error: 'No user found!' });
		} else {
			const OTP = Math.random();
			// sendResetPasswordEmail(OTP, email);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
});
module.exports = router;
