const { Sequelize } = require('sequelize');

const isDev = process.env.NODE_ENV === 'development';
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions:{
        ssl: !isDev?{
            require: true,
            rejectUnauthorized: false,
        }: false
    },
});

module.exports = sequelize;