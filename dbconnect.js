const mongoose = require('mongoose')

async function DBConnect() {
    mongoose.connect('mongodb://localhost:27017/blogwebsite').then(() => {
            console.log("Connection Successful !")
    }).catch(e => {
            console.log("Failed to connect to db : " + e)
    })
}

module.exports = DBConnect