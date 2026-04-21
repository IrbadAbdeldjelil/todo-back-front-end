const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Task = sequelize.define('Task', {
    "id": {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    "title": {
        type: DataTypes.STRING,
        allowNull: false
    },
    "description": {
        type: DataTypes.TEXT,
        allowNull: true
    },
    "status": {
        type: DataTypes.ENUM('todo', 'in-progress', 'done'),
        defaultValue: "todo"
    },
    "userId": {
        type: DataTypes.UUID,
        allowNull:false
    }
},
    {
        timestamps: true
    });

module.exports = Task;