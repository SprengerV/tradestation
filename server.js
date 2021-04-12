const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
const mongoOpt = require('./config/mongoose');
const session = require('express-session');
const sess = require('./config/session');
const routes = require('./controllers');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// Templating engine
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// Session storage
app.use(session(sess));

// Configure express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Connect to mongodb
mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tradestation', mongoOpt)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`SERVER LISTENING ON PORT ${PORT}`);
		});
	})
	.catch(err => console.error(err));
