const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    skil:{
        type:[],
        required:true
    },
    address:{
        type:[Object],
        required:true
    },
    marks:{
        type:[String],
        required:true
    },
    profile:{
        type:String,
        required:true
    }
})

const student = mongoose.model('student',studentSchema)

module.exports = student
