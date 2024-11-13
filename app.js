const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

// app.get('/',(req,res,next) => {
//     res.send("hello")
// }) 

const student = require('./routes/curd')
const Image = require('./routes/Imgae_route')
const uploadCloude = require('./routes/UploadClouse')
const errorMidllwere = require('./error/error')

app.use(student)
app.use(Image)
app.use(uploadCloude)

app.use(errorMidllwere)
mongoose.connect("mongodb+srv://harshil:harshil@mongodbschema.0bl6c.mongodb.net/")
.then(() => {
    console.log("Database Connected!")  
    app.listen(4000, () => {
        console.log("The port is runnig",4000)
    })
})
.catch(err => {
    console.log(err) 
})



//mongodb+srv://harshil:<db_password>@learningmongodb.tl0xr.mongodb.net/