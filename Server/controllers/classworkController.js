const classworkModel=require('../models/classwork');
const userModel = require("../models/user");
const classModel=require("../models/class");
var ObjectId = require('mongoose').Types.ObjectId;
const {successHandler,failureHandler}=require('../utils/responseHandler');
const multer = require('multer');
const sharp = require('sharp');
const AWS=require("aws-sdk");
const multerS3=require("multer-s3");

const BUCKET_NAME_IMAGES="akshaya-images-bucket";
const BUCKET_NAME_FILES="akshaya-files-bucket";
const s3=new AWS.S3( {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:'ap-south-1'
})
var uploadImages = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME_IMAGES,
        acl:'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
}).single('image');
var uploadFiles = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME_FILES,
        acl:'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
}).single('upload_file');
module.exports.uploadImageToS3=async(req,res,next)=>{
    uploadImages(req,res,function(error){
        if(error){
            console.log(error)
            res.status(500).json({
                status:"failure",
                message:"Image uploading failed"
            })
        }
        else{
            console.log(req.file)
            res.status(200).send({
                "image":req.file.location
            })
         }
    })
}
module.exports.uploadFileToS3=async(req,res,next)=>{
    uploadFiles(req,res,function(error){
        if(error){
            res.status(500).json({
                status:"failure",
                message:"File uploading failed"
            })
        }
        else{
            console.log(req.file)
            res.status(200).send({
                "file":req.file.location
            })
         }
    })
}

 

exports.createClassWork=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const classId=req.params.classId;
    const user=await userModel.findById(userId);
    const gclass=await classModel.findById(classId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass){
        error=new Error("Class not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass.owner.equals(new ObjectId(userId))){  //checking if it is owner
        error=new Error(`Permission denied`);
        error.statusCode=403;
        throw error;
    }
    const {title,type,description,photo}=req.body;
    if(!title || !type || !description){
        error=new Error("Missing required fields");
        error.statusCode=404;
        throw error;
    }
    if(type==="test" || type==="assignment" || type==="material"){
        let classwork=new classworkModel();
        classwork.author=userId;
        classwork.class=classId;
        classwork.title=title;
        classwork.type=type;
        classwork.description=description;
        classwork.photo=photo;
        const {dueDate,points,task}=req.body;
        if(type==="material"){
            if(task){
                classwork.task=task
            }
        }
        else{
        if(task){
                classwork.task=task
        }
        if(!dueDate || !points){
        error=new Error("Missing required fields");
        error.statusCode=404;
        throw error;
            }
            classwork.dueDate=dueDate,
            classwork.points=points
        }
        newClasswork=await classwork.save();
        if(!newClasswork){
        error=new Error("Some error occured");
        error.statusCode=500;
        throw error;
        }
        successHandler(res,{classwork:newClasswork},`${type} created successfully`,201)
    }
    else{
        error=new Error("Cannot create class work");
        error.statusCode=400;
        throw error;
    } 
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.addAnswer=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const classId=req.params.classId;
    const user=await userModel.findById(userId);
    const gclass=await classModel.findById(classId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass){
        error=new Error("Class not found");
        error.statusCode=404;
        throw error;
    }
    const classworkId=req.params.id;
    const classwork=await classworkModel.findById(classworkId);
    if(!classwork){
        error=new Error(`classwork not found`);
        error.statusCode=404;
        throw error;
    }
    if(!classwork.class.equals(new ObjectId(classId))){  //if class doesnt match
        error=new Error(`some error occured`);
        error.statusCode=500;
        throw error;
    }
    const {answers}=req.body;
    if(!answers){
        error=new Error(`please provide answer`);
        error.statusCode=400;
        throw error;
    }
    let answer={};
    answer.student=userId,
    answer.time=new Date()
    console.log(answers)
    answer.answer=answers
    classwork.answers.push(answer);
    const finalClasswork=await classwork.save();
    if(!finalClasswork){
        error=new Error(`some internal error occured`);
        error.statusCode=500;
        throw error;
    }
    successHandler(res,{classwork:finalClasswork},"Answered successfully",200);
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.editClassWork=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const classId=req.params.classId;
    const user=await userModel.findById(userId);
    const gclass=await classModel.findById(classId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass){
        error=new Error("Class not found");
        error.statusCode=404;
        throw error;
    }
    const classworkId=req.params.id;
    const classwork=await classworkModel.findById(classworkId);
    console.log(classwork)
    if(!classwork){
        error=new Error(`classwork not found`);
        error.statusCode=404;
        throw error;
    }
    console.log(classwork.class,classId)
    if(!(classwork.class.equals(new ObjectId(classId)))){  //if class doesnt match
        error=new Error(`some error occured`);
        error.statusCode=500;
        throw error;
    }
    if(!(classwork.author.equals(new ObjectId(userId)))){  //if class doesnt match
        error=new Error(`Permission denied`);
        error.statusCode=403;
        throw error;
    }
    let {points,dueDate,description,title,task,photo}=req.body;
    classwork.points=points?points:classwork.points;
    classwork.dueDate=dueDate?dueDate:classwork.dueDate
    classwork.description=description?description:classwork.description
    classwork.title=title?title:classwork.title
    classwork.task=task?task:classwork.task  
    classwork.photo=photo?photo:classwork.photo
    const finalClasswork=await classwork.save();
    if(!finalClasswork){
        error=new Error(`some internal error occured`);
        error.statusCode=500;
        throw error;
    }
    successHandler(res,{classwork:finalClasswork},"Updated Successfully",200);
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.addMarks=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const classId=req.params.classId;
    const user=await userModel.findById(userId);
    const gclass=await classModel.findById(classId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass){
        error=new Error("Class not found");
        error.statusCode=404;
        throw error;
    }
    const classworkId=req.params.id;
    const classwork=await classworkModel.findById(classworkId);
    if(!classwork){
        error=new Error(`classwork not found`);
        error.statusCode=404;
        throw error;
    }
    if(!(classwork.class.equals(new ObjectId(classId)))){  //if class doesnt match
        error=new Error(`some error occured`);
        error.statusCode=500;
        throw error;
    }
    if(!(classwork.author.equals(new ObjectId(userId)))){  //if class doesnt match
        error=new Error(`Permission denied`);
        error.statusCode=403;
        throw error;
    }
    let {marks,student}=req.body;
    if(!student || !marks){
        error=new Error("Please provide student details");
        error.statusCode=400;
        throw error;
    }
    let studentObj=classwork.answers.find((obj)=>obj.student.equals(new ObjectId(student)));
    if(studentObj){
        studentObj.marks=marks;
    }
    const finalClasswork=await classwork.save();
    if(!finalClasswork){
        error=new Error(`some internal error occured`);
        error.statusCode=500;
        throw error;
    }
    successHandler(res,{classwork:finalClasswork},"Added marks successfully",200);
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.deleteClasswork=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const classId=req.params.classId;
    const user=await userModel.findById(userId);
    const gclass=await classModel.findById(classId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(!gclass){
        error=new Error("Class not found");
        error.statusCode=404;
        throw error;
    }
    const classworkId=req.params.id;
    const classwork=await classworkModel.findById(classworkId);
    if(!classwork){
        error=new Error(`classwork not found`);
        error.statusCode=404;
        throw error;
    }
    if(!(classwork.class.equals(new ObjectId(classId)))){  //if class doesnt match
        error=new Error(`some error occured`);
        error.statusCode=500;
        throw error;
    }
    if(!(classwork.author.equals(new ObjectId(userId)))){  //if class doesnt match
        error=new Error(`Permission denied`);
        error.statusCode=403;
        throw error;
    }
    const finalClasswork=await classworkModel.findByIdAndDelete(classworkId);
    if(!finalClasswork){
        error=new Error(`some internal error occured`);
        error.statusCode=500;
        throw error;
    }
    successHandler(res,{classwork:null},"Deletion Successfull",200);
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}



