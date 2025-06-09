const mongoose = require('mongoose');


const blogsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    published: {
        type:Date,
        required:true,
    },
    author: {
        type:String,
        required:true,
    },
    category: {
        type:String,
        required:true,
    },  
    description: {
        type:String,
        required:true,
    },
    img_url: {
        type:String,
        required:true
    }
});


const Blog = mongoose.model("blogs",blogsSchema)


module.exports = Blog;