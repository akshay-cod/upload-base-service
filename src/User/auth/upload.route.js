const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { verifyTheUserToken } = require('../../../config/auth/userAuth');
const { uploadAFile } = require("./upload.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }, 
  })

const upload = multer({storage: storage, limits:{fileSize:1000000000 * 5}});

router.post('/upload-single-file',verifyTheUserToken, upload.single('file'), uploadAFile);

module.exports = router;