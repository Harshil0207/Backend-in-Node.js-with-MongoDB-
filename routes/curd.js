const express = require('express')
const {createStudent,getStudents,deleteStudent, UpdateStudent, getEditStudent} = require('../controller/crudController')
const {multerUpload} = require('../middlwere/multerUploadFile')

const router = express.Router()

router.post('/student/register',multerUpload.single("profile"),createStudent)

router.get('/student/get/details/:userId',getStudents)

router.get('/student/get/edit/detail/:userId',getEditStudent)

router.delete('/student/delete/:userId',deleteStudent)

router.put('/student/register/update/:userId',multerUpload.single("profile"),UpdateStudent)


module.exports = router 