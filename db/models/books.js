import Sequelize from 'sequelize';

const schema = {
	'title': {
		type: Sequelize.STRING(55),
		allowNull: false
	},
	'author': {
		type: Sequelize.STRING(55),
		allowNull: false
	},
	'current': {
		type: Sequelize.BOOLEAN
	},
	'date_read': {
		type: Sequelize.DATE,
		allowNull: false
	},
	'synopsis': {
		type: Sequelize.TEXT,
		allowNull: false
	}
};

const config = {
	timestamps : false
};

export { schema, config };
