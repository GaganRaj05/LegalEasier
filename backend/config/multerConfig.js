const multer = require('multer');
const path=require('path');


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv|pdf|doc|docx|xls|xlsx|txt)$/i;
  
  const allowedMimeTypes = [
    // Images
    'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml',
    
    // Videos
    'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-flv',
    'video/webm', 'video/x-matroska',

    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only images and videos are allowed"), false);
  }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 30 * 1024 * 1024 }, 
    fileFilter: fileFilter
}).fields([
    {name:'img',maxCount:1},
    {name:'document',maxCount:1}
]);

module.exports = upload;