// app.post('/upload-images',upload.array('image'),async (req,res)=>{
//     const uploader =  async (path)=> await cloudinary.uploads(path,'Images')
//     // if(req.method==='POST')
//     // {
        // const urls =[]
        //     const files = req.files
        //     for(file of files){
        //         const {path}=file
        //         const newPath= await uploader(path)
        //         urls.push(newPath)
        //         fs.unlinkSync(path)
//             }
//     res.status(200).json({
//         message:'images uploaded successfully',
//         data:urls
//     })
//     // }
// });


import customError from "../utility/customError.js";
import User from "../models/userModel.js";
import Image from "../models/imageModel.js";


import mongoose from "mongoose";


class upldService {
  
   async  upload__image(req,res){

    const {permission} = req.body
    const files = req.files
    if(!['public','private'].includes(permission))
     throw new customError('permission must be set to Public or private')
        // for(file  files){
        //     const {path}=file
        //     console.log(path)
        //     // const newPath= await uploader(path)
        //     // urls.push(newPath)
        //     // fs.unlinkSync(path)
        // }
        for(let i=0; i<files.length;i++){
        req.body['images__url']=files[i].path}

        const saveUserImage = new Image({
            user:req.user._id,
            images__url:req.body['images__url'],
            permission:permission
        }).save()
       
        return 
    }
   async  view__all__images(req,res){
       let user__Image=Image.find({user:req.user._id})
       return user__Image

   }
   
   async  delete__each__images(req,res){

    let imageId = req.params.imageId
    let isValidImages = mongoose.Types.ObjectId.isValid(imageId)
    
    if(!isValidImages)
     throw new customError('the image selected is an invalid image selection')
     let isImageExist  = Image.findById(imageId)
     if(isImageExist.user!=req.user._id)
    // if(!isImageExist)
    // throw new customError('the image does not exist in your ')


    return isValidImages

}


}

export default new upldService()
 