import React from 'react';
import { Route } from 'react-router-dom';

import LandingPageComponent  from './components/LandingPage';
import BookProfileEntryComponent from './components/BookProfileEntry';

class App extends React.Component {
	render() {
		return (
			<div>
				<Route exact path="/" render={ () => <LandingPageComponent fetchBookProfiles={this.fetchBookProfiles} /> } />
				<Route exact path="/books/new" render={ () => <BookProfileEntryComponent saveBookProfile={this.saveBookProfile}/>} />
			</div>
		);
	}

	fetchBookProfiles () {
		return fetch('/books', {
				headers: new Headers({
				'Content-Type': 'application/json'
			}),
			method: 'GET',
		})
		.then((response) => {
			return response.json().then((res) => {
				return res.books;
			})
		})
		.catch((err) => {
			console.log("Err: ", err);
		})
	}

	saveBookProfile(data) {
		return fetch('/books', {
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			method: 'POST',
			body: JSON.stringify(data)
		})
		.then((response) => {
			let status = Number(response.status);
			let formStatus, formMessage, messageHeader;
			if (status >= 500) {
				formStatus = 'error';
				messageHeader = 'Whoops!';
				formMessage = 'Unexpected error, please try again!';
			} else if (status >= 400) {
				formStatus = 'error';
				messageHeader = 'Ruh roh!';
				formMessage = 'Book synopsis already exists!'
			} else {
				formStatus = 'success';
				messageHeader = 'Yay!';
				formMessage = 'Great job, unto the next!';
			}

			return {
				status: formStatus,
				message: {
					header: messageHeader,
					content: formMessage
				}
			};
		})
		.catch((error) => {
			console.error(error);
		})
	}
};

export default App;
