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
    origin: 'http://13.233.5.58/',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

server.options('*', cors(corsOptions))

server.get('/', (req, res) => {
    res.render(path.join(__dirname, 'frontend/build/index.html'));
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
                            res.status(200).json({name: dec.name})
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
    const title = req.body.title
    const content = req.body.content

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

                            /* Now add the blog to the database */

                            const blog = new Blog({
                                title: req.body.title,
                                content: req.body.content,
                                author: dec.name,
                                datePublished: Date.now(),
                                comments: []
                            })

                            blog.save().then(blogInfo => {

                                let userBlogs = info.blogs
                                userBlogs.push({ blogId: blogInfo._id })

                                User.findOneAndUpdate({username: dec.username}, {blogs: userBlogs}).then(userBlogUpdateInfo => {
                                    res.status(200).send()
                                }).catch(err =>{
                                    console.error(err)
                                    res.status(500).send()
                                })
                                
                            }).catch(err => {
                                console.error(err);
                                res.status(500).send()
                            })
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

server.get('/blogs', cors(corsOptions), (req, res, next) => {

    if(req.query.id){
        Blog.findById(req.query.id).then(blog =>{
            res.status(200).json(blog)
        })
    }
    else{
    Blog.find().then(blogs => {
        res.status(200).json(blogs)
    })
}
})

server.post('/comment', cors(corsOptions), (req, res, next) => {

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

                            Blog.findById(req.body.id).then(blg => {
                                let blogComments = blg.comments
                                blogComments.push({ username: info.username, commentText: req.body.content })

                                Blog.findByIdAndUpdate(req.body.id, {comments: blogComments}).then(blog => {
                                    res.status(200).send()
                                }).catch(err => {
                                    console.error(err)
                                    res.status(500).send()
                                })
                            }).catch(err => {
                                console.error(err)
                                res.status(500).send()
                            })
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

server.get('/comments', cors(corsOptions), (req, res, next) => {
    Blog.findById(req.query.id).then(blog => {
        res.status(200).json(blog.comments)
    })
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));