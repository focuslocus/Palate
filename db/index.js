/* eslint no-console: ["error", { allow: ["log"]}] */
import Sequelize from 'sequelize';

import { BookExistsError } from '../errors';
import { schema, config } from './models/books';

const connectionString = 'postgres://localhost:5432/booktracker_dev';
const db = new Sequelize(connectionString, {});

const Books = db.define('books', schema, config);

Books.sync();

export default {
	createBookIfUnique: (book) => {
		let { title, author, synopsis } = book;
		return Books.findAll({
			attributes: ['title', 'author', 'synopsis', 'date_read'],
			where: {
				title,
				author
			}
		}).then((result) => {
			if (result.length < 1) {
				return Books.create({
					title,
					author,
					synopsis,
					date_read: new Date().toUTCString()
				});
			}
			throw BookExistsError;
		});
	},

	retrieveAllBooks: () => {
		return Books
			.findAll()
			.then((books) => {
				return books.map((book) => {
					return {
						title: book.get('title'),
						author: book.get('author'),
						date_read: book.get('date_read'),
						current: book.get('current'),
						synopsis: book.get('synopsis')
					};
				});
			})
			.catch((err) => {
				console.log("Err: ", err);
				return err;
			});
	}
};
