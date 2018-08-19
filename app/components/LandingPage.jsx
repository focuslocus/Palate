import React from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Container,
	Grid,
	Header,
	Menu,
	Segment
} from 'semantic-ui-react';

import style from '../styles';

import NavigationHeaderComponent from './NavigationHeader';
import BookListViewComponent from './BookListView';

class LandingPageComponent extends React.Component {
		constructor(props) {
			super(props);

			this.state = this.getInitialState();
			this.makeTabActive = this.makeTabActive.bind(this);
		}

		componentDidMount() {
			this.props.fetchBookProfiles()
							.then((books) => {
								this.setState({ bookList: books });
							});
		}

		getInitialState() {
				return {
					activeItem: 'reading',
					bookList: []
				}
		}

		makeTabActive(e) {
			this.setState({
				activeItem: e.target.id
			})
		}

		render() {
			let bookList = [];

			if (this.state.bookList.length > 0) {
				let books = this.state.bookList;
				switch (this.state.activeItem) {
					case 'reading':
						bookList = bookList.concat(books.filter( book => book.current ));
						break;
					case 'to read':
						bookList = bookList.concat(books.filter( book => book.synopsis.length < 1 ))
						break;
					case 'have read':
						bookList = bookList.concat(books.filter( book => book.synopsis.length ))
						break;
				}
			}

			return (
				<Grid container verticalAlign="top" columns={2}>
					<Grid.Row
						textAlign="center"
						columns={2}
						centered
						style={{marginTop: "2rem"}}
					>
						<Grid.Column>
							<Header
								as="h1"
								content="Overview"
							>
							</Header>
						</Grid.Column>
						<Grid.Column textAlign="right">
							<Link className="ui primary button" to="/books/new">
								Add a Book Profile
							</Link>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Menu tabular>
							<Menu.Item
								id="reading"
								onClick={this.makeTabActive}
								active={this.state.activeItem === 'reading'}
								>Reading</Menu.Item>
							<Menu.Item
								id="to read"
								onClick={this.makeTabActive}
								active={this.state.activeItem === 'to read'}
								>To Read</Menu.Item>
							<Menu.Item
								id="have read"
								onClick={this.makeTabActive}
								active={this.state.activeItem === 'have read'}
								>Have Read</Menu.Item>
						</Menu>
					</Grid.Row>
					<Grid.Row>
						<BookListViewComponent books={bookList} />
					</Grid.Row>
				</Grid>
			);
		}
}

export default LandingPageComponent;
