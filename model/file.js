const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    singleImage:{
        type:String
    },
    arrayImage:{
        type:[]
    },
    ImageA:{
        type:String
    },
    ImageB:{
        type:[]
    }
})

const file = mongoose.model('File',fileSchema)

module.exports = file
 