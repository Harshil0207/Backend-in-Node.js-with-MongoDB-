const multer = require('multer')
const path = require('path')
const fs = require('fs')


const fileStorage = multer.diskStorage({

    destination: (req,file,cb) => {
        const filepath = path.join(__dirname,'..','asstes','imgaes')

        if(!fs.existsSync(filepath)){ 

          fs.mkdirSync(filepath, { recursive: true })
          cb(null,filepath)

        } else {
            cb(null,filepath)
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' ||
       file.mimetype === 'application/doc' ||
       file.mimetype === 'video/mp4'
    ){
        cb(null,true)
    } else {
        cb(null,false)
    }
}


const upload = multer({ storage:fileStorage,fileFilter:fileFilter })

module.exports = upload