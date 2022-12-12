const db = require('../database/database')

const { DataTypes } = require('sequelize')
const Property = require('./property.models')
const User = require('./user.models')

const Review = db.define('Reviews', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
})

module.exports = Review
