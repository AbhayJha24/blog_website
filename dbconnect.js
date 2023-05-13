const mongoose = require('mongoose')

require('dotenv').config()

async function DBConnect() {
    mongoose.connect(process.env.db_uri).then(() => {
            console.log("Connection Successful !")
    }).catch(e => {
            console.log("Failed to connect to db : " + e)
    })
}

module.exports = DBConnect