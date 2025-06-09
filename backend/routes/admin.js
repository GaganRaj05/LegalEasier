const express = require('express');
const handleMulterError = require('../middlewares/handleMulterErrors');
const {uploadBlog, uploadExistingBlog, getBlogs} = require('../controllers/admin');
const router = express.Router();
const upload = require('../config/multerConfig');

router.post('/upload-blog',upload, handleMulterError, uploadBlog);

router.post('/upload-existing', uploadExistingBlog);
router.get('/get-blogs', getBlogs)

module.exports = router;