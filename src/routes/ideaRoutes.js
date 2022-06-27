const express = require('express');
const Idea = require('../modals/idea');
const { ObjectId } = require('mongodb');
const { isValid } = require('../utils/objHandler');
const authenticate = require('../middlewares/authenticate');

router = new express.Router();

// const usr = new User({
//   _id: new mongoose.Types.ObjectId(),
//   name: "Roman",
//     email:"roman@gmail.com",
//     password:"k23akrj*#",
//     age: 20,
//     phoneNumber:3456567656,
//     });

// usr.save(function (err) {
//   if (err) return console.log(err);

// 	const pr = new Idea({
// 	  title: 'Casino Royale',
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores culpa porro minima, distinctio ex quis cumque, quam in at labore dignissimos alias tempore rerum est consectetur reprehenderit praesentium rem ut.",
//     owner:  usr._id});

//   pr.save(function (err) {
//     if (err) return console.log(err);
//   });
// });

router.post('/idea', authenticate, async (req, res) => {
	try {
		const idea = new Idea({ ...req.body, owner: req.user._id });
		await idea.save();

		res.status(200).json({ status: 'success', data: { idea } });
	} catch (err) {
		res.status(400).json({ status: 'failure', error: err });
		console.log('Error', err);
	}
});

//Pagination
//GET /ideas?limi=10&skip=10
//GET /ideas?completed=true
//GET /ideas?sortBy=createdAt_asc
//GET /ideas?sortBy=createdAt_desc
router.get('/', authenticate, async (req, res) => {
	try {
		const match = {};
		const sort = {};

		if (req.query.completed) {
			match.completed = req.query.completed === 'true';
		}
		//Sorting
		if (req.query.sortBy) {
			const parts = req.query.sortBy.split('_');
			sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		}
		// console.log(sort);
		// const ideas = await Idea.find({ owner: req.user._id });
		const ideas = await Idea.find({ owner: '613964e68d81490e4c4d06ef' });
		console.log(ideas);
		if (ideas.length > 0) {
			return res.status(200).send({ ideas });
		}
		res.status(400).send({ error: 'No idea found!' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send({
			error: 'Unexpexted Error!',
			reason: err.message,
		});
	}
});
router.get('/idea/:id', authenticate, async (req, res) => {
	try {
		const id = new ObjectId(req.params.id);
		const idea = await Idea.findOne({ _id: id, owner: req.user._id })
			.populate('owner')
			.exec();
		if (idea) {
			res.status(200).send({ ideas });
		} else {
			res.status(400).json({ error: 'No user found' });
		}
	} catch (err) {
		console.log(err);
		res.status(400).send({ error: 'Invalid Id!', message: err });
	}
});

router.patch('/idea/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		if (!isValid(Idea.schema.obj, data)) {
			throw new Error('Please provide a valid data');
		}
		const idea = await Idea.findOne({ _id: id, owner: req.user._id })
			.populate('owner')
			.exec();
		Object.keys(data).forEach((key_) => (idea[key_] = data[key_]));
		await idea.save();

		if (!idea) {
			console.log('No idea found!');
			return res.status(404).json({ error: 'No idea found!' });
		}
		res.status(200).json({ idea: idea });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.message });
	}
});

router.delete('/idea/:id', authenticate, async (req, res) => {
	const id = req.params.id;
	console.log(id);
	try {
		const idea = await Idea.findOneAndDelete({
			_id: id,
			owner: req.user._id,
		});
		if (idea) {
			res.status(200).json({ message: 'Idea has been removed!' });
		} else {
			throw new Error('No idea found!');
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
