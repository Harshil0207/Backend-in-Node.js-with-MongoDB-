const File = require('../model/file')
const ErrorHandler = require('../middlwere/errorHandler')
const { StatusCodes } = require('http-status-codes')
const FileStoreToFirabse = require('../middlwere/multerUploadFile')


exports.SingleImage = async(req,res,next) => {
    try {
        const singleImage = req.file
        const { userType,fileType} = req.body
        
        if(!req.file){
            return next(new ErrorHandler("Select file", StatusCodes.BAD_REQUEST))

        } 

        const imagePath = await FileStoreToFirabse.uploadFileToFirebase(singleImage,userType,fileType)

        const file = await File.create({singleImage:imagePath})

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Single File Store successfully",
            student: file
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))

    }
}

exports.ArrayImage = async(req,res,next) =>{
try{
    const arrayImage = req.files
    const { userType,fileType} = req.body

    if(!req.files){
        return next(new ErrorHandler("Select file", StatusCodes.BAD_REQUEST))

    }

    const images = arrayImage.map(item => {
        return FileStoreToFirabse.uploadFileToFirebase(item,userType,fileType)
    })

    const finalImages = await Promise.all(images)


    const file = await File.create({arrayImage:finalImages})

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Array File Store successfully",
        student: file
    })

} catch (error) {
    return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))

}
}


exports.FiedlsImage = async(req,res,next) =>{
    try{
        console.log("REQ.FILES=========>",req.files)
        const { userType,fileType } = req.body
        const ImageA = req.files.ImageA ? req.files.ImageA[0] : []
        const ImageB = req.files.ImageB ? req.files.ImageB : []
    
        if(!ImageA || !ImageB){
            return next(new ErrorHandler("Select files", StatusCodes.BAD_REQUEST))
        }
        
        const imageA = await FileStoreToFirabse.uploadFileToFirebase(ImageA,userType,fileType)

        const imageB = ImageB.map(item => {
            return FileStoreToFirabse.uploadFileToFirebase(item,userType,fileType)
        })
    
        const finalBImages = await Promise.all(imageB)
    
    
        const file = await File.create({ImageA:imageA,ImageB:finalBImages})
    
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Fileds File Store successfully",
            student: file
        })
    
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    
    }
}

exports.deleteSingleImage = async(req,res,next) => {
    try {
        const {ImageId} = req.params
        
        const file = await File.findById(ImageId)
        if(!file){
            return next(new ErrorHandler("File not found",StatusCodes.NOT_FOUND))
        }

        if(file.singleImage){
            await FileStoreToFirabse.deleteFileFromFirebase(file.singleImage)
        }

        if(file.arrayImage){
            file.arrayImage.map(item => {
              return FileStoreToFirabse.deleteFileFromFirebase(item)
            })
        }

        if(file.ImageA){
            await FileStoreToFirabse.deleteFileFromFirebase(file.ImageA)
        }

        if(file.ImageB){
            file.ImageB.map(itemb => {
                return FileStoreToFirabse.deleteFileFromFirebase(itemb)
            })
        }

        const deleteFile = await File.findByIdAndDelete(ImageId)

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "File delete successfully",
            student: deleteFile
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

