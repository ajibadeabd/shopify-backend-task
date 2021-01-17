import upload from "../utility/multer.js";
// const  router = express.Router();

// router.use('/user',user)

// export default router


import express  from 'express'
const  router = express.Router();
import userCtrl  from '../controller/userCntroller.js'
import UpldCtrl  from '../controller/uploadController.js'
import  passport from  'passport'
const auth = passport.authenticate('jwt',{session:false})

/* GET home page. */

// registeration route
router.post("/register",userCtrl.register);

// login route
router.post("/login",userCtrl.login);

// upload image
router.post("/upload__image",auth,upload.array('images'),UpldCtrl.upload__image);
// view all mmy image by each user
router.get("/view__all__images",auth,UpldCtrl.view__all__images);

//delete each images by each user
router.delete("/view__all__images/:imageId",auth,UpldCtrl.delete__each__images);


// fetch user profile
router.get("/get_profile",auth,userCtrl.getProfile);
router.get("csv",userCtrl.getProfile);


export default  router;
