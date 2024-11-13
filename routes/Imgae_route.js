const express = require('express')
const upload = require('../middlwere/multer')
const {SingleImage,ArrayImage,FiedlsImage} = require('../controller/FileController')

const router = express.Router()

router.post('/single/image',upload.single("singleImage"),SingleImage)

router.post('/array/image',upload.array("arrayImage",5),ArrayImage)

router.post('/fileds/image',upload.fields([{name:"ImageA",maxCount:1},{name:"ImageB",maxCount:2}]),FiedlsImage)


module.exports = router 