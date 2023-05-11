const express = require('express')
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const DBConnect = require('./dbconnect')
const {Blog, User} = require('./schema')


const server = express()

server.use(express.static(path.join(__dirname, 'frontend/build')))
const port = 80

require('dotenv').config()

// server.use(cors())
server.use(bodyparser.json())
server.use(cookieparser())

DBConnect()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

server.options('*', cors(corsOptions))

server.get('/', (req, res) => {
    res.send(path.join(__dirname, 'frontend/build/index.html'));
});

server.post('/loginrequest', cors(corsOptions), (req, res, next) => {

    /* Find user using username from the database */

    User.findOne({username: req.body.username}).then( info => {
        if(info){
            if(info.password === req.body.password){

                /* Sign and send jwt */

                jwt.sign(info.toJSON(), process.env.secret_key, { expiresIn: 60*60}, (err, token) =>{
                    if(err){
                        console.error(err)
                        res.status(500).send()
                    }
                    else{
                        res.cookie("authtoken", token).status(200).send()
                    }
                })
            }
            else{
                res.status(401).send()
            }
        }

        else{
            res.status(400).send()
        }
    }).catch(e => {
        console.error(e)
        res.status(500).send()
    })
});

server.post('/sessioncheck', cors(corsOptions), (req, res, next) =>{

    /*If the request has a jwt cookie atached parse it and allow access */

    if(req.cookies.authtoken){
        jwt.verify(req.cookies.authtoken, process.env.secret_key, (err, dec) => {
            if(err){
                console.log(err);
                res.status(401).send()
            }

            /*Verify user details from the database */

            if(dec){
                User.findOne({username: dec.username}).then(info => {
                    if(info){
                        if(info.username === dec.username && info.password === dec.password){
                            res.status(200).send()
                        }
                        else{
                            res.status(401).send()
                            console.log(info)
                            console.log(dec)
                        }
                    }

                    else{
                        res.status(401).send()
                        console.log(info)
                        console.log(dec)
                    }
                }).catch(e => {
                    res.status(500).send()
                    console.error(e);
                })
            }

            else{
                res.status(401).send()
                console.log(dec)
            }
        })
    }
    else{
        res.status(401).send()
    }
})

server.post('/register', cors(corsOptions), (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const email = req.body.email

    const user = new User({
        name: name,
        email: email,
        username: username,
        password: password, // Acctually it is better to use hashed password here
        blogs: {}
    })

    User.find({username: username}).then(info => {

        if (info.length > 0) {
            res.status(400).send()
        }

        else{
            User.find({email: email}).then(info => {

                if (info.length > 0) {
                    res.status(400).send()
                }
        
                else{
                    user.save().then(info => {
                        res.status(200).send()
                    }).catch(e =>{
                        console.error(e)
                        res.status(500).send()
                    })
                }
            }).catch(e => {
                console.error(e)
                res.status(500).send()
            })
        }
    }).catch(e => {
        console.error(e)
        res.status(500).send()
    })


})

server.post('/writeBlog', cors(corsOptions), (req, res, next) => {
    // const username = req.body.username
    // const password = req.body.password
    // const name = req.body.name
    // const email = req.body.email

    if(req.cookies.authtoken){
        jwt.verify(req.cookies.authtoken, process.env.secret_key, (err, dec) => {
            if(err){
                console.error(err);
                res.status(401).send()
            }

            console.log(dec);

            /*Verify user details from the database */

            // Do all the specified tasks

            const blog = new Blog({
                title: req.body.title,
                content: req.body.content,
                author: dec.username, // Actually verify and find name from the db at this step
                datePublished: Date.now(),
                comments: {}
            })

            res.status(200).send({"authenticated": "true"})
        })
    }
    else{
        res.status(401).send()
    }
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));