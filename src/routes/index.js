const express = require('express');
const authenticate = require('../middlewares/authenticate');
const User = require('../modals/user');

const router = new express.Router();

router.get('/login', (req, res) => {
	res.status(200).render('login');
});
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		const token = await user.generateAuthToken();

		res.cookie('jwt', token, {
			expires: new Date(Date.now() + 600000),
			httpOnly: false,
		});

		res.status(200).send({ user, token });
	} catch (err) {
		res.status(400).send(err.message);
	}
});
router.post('/logout', authenticate, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((obj) => {
			return obj.token !== req.token;
		});
		res.clearCookie('jwt');
		await req.user.save();
		res.status(200).send({ message: 'Logout successful!' });
	} catch (err) {
		res.status(500).send(err.message);
	}
});
router.post('/logoutAll', authenticate, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.status(200).send({
			message: 'Logout successful from all devices!',
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post('/signup', async (req, res) => {
	try {
		console.log(req.body.name);
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
		res.redirect('/login');
	} catch (err) {
		if (err.message.includes('duplicate key error collection')) {
			res.status(400).send({ error: 'Email has been taken!' });
		} else {
			res.status(400).send({ error: err.message });
		}
	}
});
router.get('/signup', (req, res) => {
	res.status(200).render('signup');
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
