/* eslint no-console: ["error", { allow: ["log", "error"]}] */
import client from 'webpack-hot-client';
import webpackMiddleware from 'webpack-dev-middleware';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';

import db from '../db';
import webpackConfig from '../webpack.config.babel.js';
import { UnexpectedError, BookExistsError } from '../errors';

let app = express();

const compiler = webpack(webpackConfig);
const { publicPath } = webpackConfig.output;

const options = {
	server : app.listen(3000),
	hot: false
};

// Webpack dev setup
client(compiler, options);
app.use(webpackMiddleware(compiler, { publicPath }));

// Middleware
app.use(bodyParser.json());

app.post('/books', (req, res) => {
	return db.createBookIfUnique(req.body)
		.then(() => {
			res.status(200).send('Success!');
		})
		.catch((error) => {
			if (error.message === BookExistsError.message) {
				res.status(400).send(error.message);
				return;
			}
			console.error(error);
			res.status(500).send(UnexpectedError.message);
		});
});

app.get('/books', (req, res) => {
	return db.retrieveAllBooks()
		.then((books) => {
			res.status(200).send(JSON.stringify({ books: books }));
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send(UnexpectedError.message);
		});
});
