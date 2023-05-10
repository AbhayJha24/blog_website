const express = require('express')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const server = express()
server.use(express.static(path.join(__dirname, 'frontend/build')))
const port = 80

server.use(cors())
server.use(bodyparser.json())
server.use(cookieparser())

server.get('/', (req, res) => {
    res.send(path.join(__dirname, 'frontend/build/index.html'));
});

server.post('/loginrequest', (req, res, next) => {
    if(req.body.username === "user" && req.body.password === "pass"){
    jwt.sign(req.body, "blogwebsite", { expiresIn: 60*60}, (err, token) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log(token)
            res.cookie("authtoken", token)
        }
    })
}
else{
    res.status(401).send({
            "Access Denied" : "401 Unauthorized"
        })
}
});

server.post('/sessioncheck', (req, res, next) =>{
    /*
    If the request has a jwt cookie atached parse it and allow access
    */

    console.log(req.cookies)
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));