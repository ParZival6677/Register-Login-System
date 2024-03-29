//importing modules
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(`postgres://postgres:763512@localhost:5432/postgres`, {dialect: "postgres"})

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to postgres`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.users = require('./userModel') (sequelize, DataTypes)

module.exports = db