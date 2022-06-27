const mongoose = require('mongoose');

mongoose.connect(
	process.env.DB_URL,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		autoIndex: true,
	},
	(error) => {
		if (error) {
			throw console.log('Unable to connect to database!');
		}
		console.log('Database connection successful!');
	}
);
