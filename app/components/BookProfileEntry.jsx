import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Form,
	Grid,
	Header,
	Message
} from 'semantic-ui-react';

import style from '../styles';
import NavigationHeaderComponent from './NavigationHeader';

class BookProfileEntryComponent extends React.Component {

	constructor(props = {}){
		super(props);
		this.state = this.getInitialState();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getInitialState = this.getInitialState.bind(this);
	}

	render() {
		let { book, message } = this.state;

		return (
			<Grid container columns={1}>
				<Grid.Row
					style={{
						marginTop: '1rem'
					}}
					>
					<Grid.Column>
						<Link className="ui primary button" to="/">
							Back to Dashboard
						</Link>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row textAlign="center">
					<Grid.Column>
						<Header as="h3">Add a Book Profile</Header>
						<Form onSubmit={this.handleSubmit} >
							<Form.Field>
								<input id='title' placeholder='Title' onChange={this.handleChange}/>
							</Form.Field>
							<Form.Field>
								<input id='author' placeholder='Author' onChange={this.handleChange}/>
							</Form.Field>
							<Form.Field>
								<textarea id='synopsis' placeholder='Synopsis...' onChange={this.handleChange}></textarea>
							</Form.Field>
							<Form.Field>
								<Button type="submit">Save</Button>
							</Form.Field>
							<Message
								header={message.header}
								content={message.content}
								hidden={!message.visible}
								visible={message.visible}
								success={message.success}
								error={!message.error}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>

			</Grid>
		);
	}

	getInitialState() {
		return {
			book: {
				title: '',
				author: '',
				synopsis: ''
			},
			message: {
				header: '',
				content: '',
				visible: false,
				success: false,
				error: false
			}
		}
	}

	handleChange(e){
		let field = e.target.id;
		let updatedBook = Object.assign(this.state.book, {[field]: e.target.value})
		this.setState({
			book: updatedBook
		});
	}

	handleSubmit() {
		this.props.saveBookProfile(this.state.book)
				.then((result) => {
					console.lo
					this.setState({
						book: this.getInitialState().book,
						message: {
							header: result.header,
							content: result.content,
							success: result.status === 'success',
							error: result.status !== 'error',
							visible: true
						}
					})
				})
	}
};

export default BookProfileEntryComponent;
