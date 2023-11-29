const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    memberId: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Ticket = sequelize.define('ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    family: { type: DataTypes.STRING, allowNull: false },
    screenshot: { type: DataTypes.STRING, allowNull: false },
    messageId: { type: DataTypes.STRING, allowNull: false },
})

User.hasOne(Ticket)
Ticket.belongsTo(User)

module.exports = { User, Ticket }