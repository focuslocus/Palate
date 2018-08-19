import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Grid,
	Icon,
	Menu
} from 'semantic-ui-react';

import style from '../styles';

class NavigationHeaderComponent extends React.Component {
		// Accept a list of menu items to display
				// Require accompanying links to direct to
		// Default to loading light bulb icon
		/*
			Props: {
				items: [
					{
						content: ''
						linkTo: ''
					}
				]
			}
		*/

		render() {
			let MenuItems = this.props.items.map((item) => {
					return (
						<Menu.Item key={item.content}>
							<Link to={item.linkTo}>{item.content}</Link>
						</Menu.Item>
					)
			});

			return (
				<Grid.Row style={style.header} textAlign="center">
					<Container>
						<Menu>
							<Menu.Item>
								<Icon name="bookmark"/>
							</Menu.Item>
							{MenuItems}
						</Menu>
					</Container>
				</Grid.Row>
			);
		}
}

export default NavigationHeaderComponent;
