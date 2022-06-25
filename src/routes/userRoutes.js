const express = require('express');
const multer = require('multer');

//For image formating
const sharp = require('sharp');
const fileUpload = require('../utils/fileUpload');
const User = require('../modals/user');
const authenticate = require('../middlewares/authenticate');
const { isValid } = require('../utils/objHandler');
const { sendWelcomeEmail } = require('../emails/emailSender');
const writeFile = require('../utils/fileHandler');
const { matchPassword } = require('../utils/passHandler');

//File Upload
//For disk storage
// const fs = require("fs");
// const path = require("path");
const allowedFileTypes = ['jpg', 'jpeg', 'png'];
// const allowedFileTypes = ["pdf", "doc", "docx"];
const upload = fileUpload(allowedFileTypes);

const router = new express.Router();

router.get('/:id/avatar', authenticate, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			throw new Error('No user found!');
		} else if (!user.avatar.img.data) {
			throw new Error('No profile photo associated with the user!');
		}
		res.set('Content-Type', 'image/png');
		res.status(200).send(user.avatar.img.data);
	} catch (err) {
		res.status(404).send(err.message);
	}
});

router.post(
	'/dashboard/avatar',
	authenticate,
	upload.single('avatar'),
	async (req, res) => {
		console.log('New request');
		try {
			console.log(req.file);
			//Image Formatting
			const imgBuff = await sharp(req.file.buffer)
				.resize(350, 350)
				.png()
				.toBuffer();
			const profileImg = {
				uploadedAt: Date.now(),
				name: req.file.originalname,
				img: {
					data: imgBuff,
					contentType: 'image/png',
				},
			};

			req.user.avatar = profileImg;
			await req.user.save();
			res.status(200).send({
				success: 'Profile photo uploaded successfully',
			});
		} catch (err) {
			console.log(err);
			res.status(400).send({ error: err.message });
		}
	},

	(err, req, res, next) => {
		if (res) {
			res.status(400).send({ error: err.message });
		}
	}
);
router.delete('/dashboard/avatar', authenticate, async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.status(200).send({ success: 'Success!' });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
});
router.post('/dashboard/avtar/test', authenticate, (req, res) => {
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

router.get('/dashboard', authenticate, async (req, res) => {
	res.render('dashboard', { user: req.user });
});
// router.get("/:id", authenticate, async(req, res) => {
//     try {
//         const id = new ObjectId(req.params.id);
//         const user = await User.findOne({
//             _id: id,
//         });

//         if (user) {
//             res.status(200).send(user);
//         } else {
//             res.status(400).json({ error: "No user found" });
//         }
//     } catch (err) {
//         res.status(400).json({ error: "Invalid Id!" });
//     }
// });

router.patch('/dashboard', authenticate, async (req, res) => {
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

router.delete('/dashboard', authenticate, async (req, res) => {
	try {
		await req.user.remove();
		res.status(200).send('Deleted Sucessfully');
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
