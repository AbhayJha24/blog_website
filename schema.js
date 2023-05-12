const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    datePublished: Date,
    comments: [{
            username: String,
            commentText: String
    }]
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    blogs: [{
        blogId: String
    }]
});

const Blog = mongoose.model('blog', blogSchema)
const User = mongoose.model('user', userSchema)

module.exports = { Blog, User }