const File = require('../model/file')
const ErrorHandler = require('../middlwere/errorHandler')
const { StatusCodes } = require('http-status-codes')

exports.SingleImage = async(req,res,next) => {
    try {
        const singleImage = req.file

        if(!req.file){
            return next(new ErrorHandler("Select file", StatusCodes.BAD_REQUEST))

        }

        const imgae = singleImage.path

        const file = await File.create({singleImage:imgae})
 
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

    if(!req.files){
        return next(new ErrorHandler("Select file", StatusCodes.BAD_REQUEST))

    }

    const images = arrayImage.map(item => {
        return item.path
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
        const ImageA = req.files.ImageA ? req.files.ImageA[0] : []
        const ImageB = req.files.ImageB ? req.files.ImageB : []
    
        if(!ImageA || !ImageB){
            return next(new ErrorHandler("Select files", StatusCodes.BAD_REQUEST))
        }
        
        const imageA = ImageA.path

        const imageB = ImageB.map(item => {
            return item.path
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