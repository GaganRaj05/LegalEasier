const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    cloud_name:process.env.CLOUDINARY_API_CLOUDNAME,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary