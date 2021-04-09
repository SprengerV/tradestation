const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./controllers');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ extname: '.hbs' });

// Templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Connect to mongodb
const mongoOpt = {
	useNewUrlParser: true,
	useUnifiiedTopology: true,
	family: 4
};
mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradestation', mongoOpt)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`SERVER LISTENING ON PORT ${PORT}`);
		});
	})
	.catch(err => console.error(err));
