const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const formParser = require('./utils/parseForm');
const authenticate = require('./middlewares/authenticate');
const userRouter = require('./routes/userRoutes');
const indexRouter = require('./routes/index');
const ideaRouter = require('./routes/ideaRoutes');

const app = express();

const port = process.env.PORT;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// for parsing application/json
app.use(express.json());

//Parsing cookies
app.use(cookieParser());

//for parsing form-data
app.use((req, res, next) => {
	formParser(req, res, next);
});

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	//Disabling routes
	// res.status(503).send("Server under maintainance!");
	// Add Access Control Allow Origin headers
	// res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	// res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(indexRouter);
app.use('/user', authenticate, userRouter);
app.use('/user/ideas', authenticate, ideaRouter);
app.get('/', authenticate, (req, res) => {
	console.log(req.user);
	res.status(200).render('dashboard', { user: req.user });
});
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
