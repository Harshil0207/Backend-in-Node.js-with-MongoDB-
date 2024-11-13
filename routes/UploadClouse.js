const express = require('express')
const {SingleImage,ArrayImage,FiedlsImage, deleteSingleImage} = require('../controller/UploadeClodueFiles')
const {multerUpload} = require('../middlwere/multerUploadFile')

const router = express.Router()

router.post('/upload/Cloude/single/image',multerUpload.single("singleImage"),SingleImage)

router.post('/upload/Cloude/array/image',multerUpload.array("arrayImage",5),ArrayImage)

router.post('/upload/Cloude/fileds/image',multerUpload.fields([{name:"ImageA",maxCount:1},{name:"ImageB",maxCount:5}]),FiedlsImage)

router.delete('/delete/images/cloud/database/:ImageId',deleteSingleImage)

module.exports = router 