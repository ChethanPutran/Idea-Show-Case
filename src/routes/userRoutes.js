const express = require('express');
const multer = require('multer');
//For image formating
const sharp = require('sharp');
const { ObjectId } = require('mongodb');
const User = require('../modals/user');
const { isValid } = require('../utils/objHandler');
const writeFile = require('../utils/fileHandler');
const fileUpload = require('../utils/fileUpload');
const pngToDataUri = require('../utils/pngToDataUri');

//File Upload
//For disk storage
// const fs = require("fs");
// const path = require("path");
const allowedFileTypes = ['jpg', 'jpeg', 'png'];
// const allowedFileTypes = ["pdf", "doc", "docx"];
const upload = fileUpload(allowedFileTypes);

const router = new express.Router();

router.get('/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		console.log(String(req.params.id));
		if (!user) {
			throw new Error('No user found!');
		} else if (!user.profile_photo.img.data) {
			throw new Error('No profile photo associated with the user!');
		}
		res.set('Content-Type', 'image/png');
		res.status(200).send({ img: user.getImageDataUri() });
	} catch (err) {
		console.log(err);
		if (err.message.includes('Cast to ObjectId failed')) {
			res.status(404).send({ error: 'Page not found!' });
		} else {
			res.status(404).send({ error: err.message });
		}
	}
});

router.get('/dashboard', async (req, res) => {
	try {
		const user = await User.findOne({
			_id: req.session.user_id,
		});

		const profile_photo = pngToDataUri(user.profile_photo.img.data);
		console.log(typeof profile_photo);
		delete user.profile_photo;
		user.img = profile_photo;
		console.log(user.img, 'user.img');
		res.status(200).render('dashboard', {
			user: user,
			message: req.flash('message'),
		});
	} catch (err) {
		console.log(err);
		res.status(300).send({ error: err.message });
	}
});

router.post('/dashboard/avatar', upload.single('avatar'), async (req, res) => {
	try {
		console.log('Uploading profile photo...');
		//Image Formatting
		const imgBuff = await sharp(req.file.buffer)
			.resize(350, 350)
			.png()
			.toBuffer();
		const profileImg = {
			uploaded_at: Date.now(),
			title: req.file.originalname,
			img: {
				data: imgBuff,
				contentType: 'image/png',
			},
		};

		const user = await User.findOne({
			_id: req.session.user_id,
		});

		user.profile_photo = profileImg;

		await user.save();
		req.flash('message', 'Profile photo uploaded successfully');
		res.redirect('/user/dashboard');
	} catch (err) {
		if (err.message.includes("'buffer' of undefined")) {
			res.status(400).send({ error: 'Image is required!' });
		} else {
			res.status(400).send({ error: err.message });
		}
	}
});

router.delete('/dashboard/avatar', async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.status(200).send({ success: 'Success!' });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});
router.post('/dashboard/avtar/test', (req, res) => {
	// capture the encoded form data
	req.on('data', (data) => {
		writeFile(data, 'uploads/avtar.jpg');
	});

	// send a response when finished reading
	// the encoded form data
	req.on('end', () => {
		res.status(200).send('OK');
	});
});

router.get('/:id', async (req, res) => {
	try {
		console.log('New req');
		console.log('v', req.params.id);

		const id = new ObjectId(req.params.id);

		const user = await User.findOne({
			_id: id,
		});

		if (user) {
			res.status(200).send({ user: user });
		} else {
			res.status(400).json({ error: 'No user found' });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: 'Invalid Id!' });
	}
});

router.patch('/dashboard', async (req, res) => {
	try {
		const data = req.body;
		if (!isValid(User.schema.obj, data)) {
			throw new Error('Please provide a valid data');
		}
		Object.keys(data).forEach((key_) => (req.user[key_] = req.body[key_]));
		await req.user.save();
		res.status(200).send(req.user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.delete('/dashboard', async (req, res) => {
	try {
		await req.user.remove();
		res.status(200).send('Deleted Sucessfully');
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
