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
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
//30 mins
const EXPIRATION_TIME = 1000 * 60 * 30;

const app = express();

const port = process.env.PORT;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/partials');

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// for parsing application/json
app.use(express.json());

//Parsing cookies
app.use(cookieParser());

//For flashing messages while redirecting
app.use(flash());

//Session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({
			mongoUrl: process.env.DB_URL,
		}),
	})
);

//for parsing form-data
// app.use((req, res, next) => {
// 	formParser(req, res, next);
// });

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
app.use('/ideas', authenticate, ideaRouter);
app.get('*', (req, res) => {
	res.status(404).render('404');
});
app.post('/*', (req, res) => {
	res.status(404).send({ error: 'Page not found!' });
});
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
