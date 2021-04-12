const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

module.exports = {
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI
	}),
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: {}
}
