const {nanoid}=require('nanoid');
var ObjectId = require('mongoose').Types.ObjectId;
const calenderModel=require("../models/calender");

const classModel = require('../models/class');
const classworkModel=require('../models/classwork');
const userModel = require('../models/user');
const {successHandler,failureHandler}=require('../utils/responseHandler')
const factory = require('./handleFactory');

module.exports.createClass=async(req,res)=>{
    let error;
    try{
    const owner = req.user.id;
    const {name,description}=req.body;
    if(!name || !description){
        error=new Error("missing required fields");
        error.statusCode=400;
        throw error;
    }
    const gclass = await classModel.findOne({name:name});
    if(gclass){
        error=new Error("class with the name already exists");
        error.statusCode=400;
        throw error;
    }
    let code=nanoid(6);
    const gclassFinal=new classModel({
        code,name,description,owner
    });
    const finalClass=await gclassFinal.save();
    successHandler(res,{class:finalClass},"Class has been created successfully",201)
   }
   catch(e){
    failureHandler(res,e.message,e.statusCode)
   }
}

module.exports.joinClass=async(req,res)=>{
    let error;
    try{
    const student = req.user.id;
    const {code}=req.body;
    if(!code){
        error=new Error("Missing required fields");
        error.statusCode=400;
        throw error;
    }
    const gclass=await classModel.findOne({code:code});
    if(!gclass){
        error=new Error("code is invalid");
        error.statusCode=400;
        throw error;
    }
    if(gclass.students.includes(student)){
        error=new Error("you are already a member of this class");
        error.statusCode=400;
        throw error;
    }
    gclass.students.push(student);
    const finalClass=await gclass.save();
    if(!finalClass){
        error=new Error("some internal error");
        error.statusCode=500;
        throw error;
    }
    successHandler(res,{class:finalClass},"Successfully joined class",200)
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.editClass=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    if(!user){
        error=new Error("User not found");
        error.statusCode=404;
        throw error;
    }
    if(user.owner!=userId){
        error=new Error("You don't have permissions to edit this class");
        error.statusCode=400;
        throw error;
    }
    const {name,description}=req.body;
    const gclass = await classModel.findById(req.params.classId);
    if(!gclass){
        error=new Error("class not found");
        error.statusCode=404;
        throw error;
    }
    if(name){
        gclass.name=name
    }
    if(description){
        gclass.description=description
    }
    const finalClass=await gclass.save();
    if(!finalClass){
        error=new Error("some internal error");
        error.statusCode=500;
        throw error;
    }
  successHandler(res,{class:finalClass},"Class details has been updated successfully",200)
    }catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.ExitFromClass=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    if(!user){
            error=new Error("user not found");
            error.statusCode=404;
            throw error;
    }
    const gclass=await classModel.findById(req.params.classId);
    if(!gclass){
        error=new Error("class not found");
        error.statusCode=404;
        throw error;
    }
    let index;
   gclass.students.forEach((stu,i)=>{
        if(stu.equals(new ObjectId(userId))){
            index=i;
        }
   })
    if(index<0 || gclass.owner.equals(new ObjectId(userId))){
        error=new Error("you are not a member of the class");
        error.statusCode=400;
        throw error;
    }
    if(gclass.owner.equals(userId)){
        error=new Error("you are the owner of this class,you cannot exit from class,please delete the class");
        error.statusCode=400;
        throw error;
    }
   gclass.students.splice(index,1);
   const finalClass=await classModel.findByIdAndUpdate(req.params.classId,{students:gclass.students});
   if(!finalClass){
       error=new Error("something wrong");
       error.statusCode=500;
       throw error;
   }
successHandler(res,{class:finalClass},"Successfully exited from class",200)
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

module.exports.removeStudent=async(req,res)=>{
    let error;
    try{
        const userId=req.user.id;
        const user=await userModel.findById(userId);
        if(!user){
            error=new Error("User not found");
            error.statusCode=404;
            throw error;
        }
    const {student}=req.body;
    const gclass=await classModel.findById(req.params.classId);
    if(!gclass){
        error=new Error("class not found");
        error.statusCode=404;
        throw error;
    }
    if(!(gclass.owner.equals(new ObjectId(userId)))){
        error=new Error("You don't have permissions to remove a student");
        error.statusCode=400;
        throw error;
    }
   let index;
   gclass.students.forEach((stu,i)=>{
        if(stu.equals(new ObjectId(student))){
            index=i;
        }
   })
   if(index<0){
    error=new Error("student is not member of the class");
    error.statusCode=400;
    throw error;
   }
   gclass.students.splice(index,1);
   const finalClass=await classModel.findByIdAndUpdate(req.params.classId,{students:gclass.students});
   if(!finalClass){
       error=new Error("some error occured");
       error.statusCode=500;
       throw error;
   }  
successHandler(res,{class:finalClass},"Student has been removed successfully",200)
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

exports.getAllClasses=factory.getAll(classModel)

exports.deleteClass=async(req,res)=>{
    let error;
    try{
        const userId=req.user.id;
        const user=await userModel.findById(userId);
        if(!user){
            error=new Error("User not found");
            error.statusCode=404;
            throw error;
        }
    const gclass=await classModel.findById(req.params.classId);
    if(!gclass){
        error=new Error("class not found");
        error.statusCode=404;
        throw error;
    }
    if(!(gclass.owner.equals(new ObjectId(userId)))){
        error=new Error("You don't have permissions to remove a student");
        error.statusCode=400;
        throw error;
    }
    const gclassDeleted=await classModel.findByIdAndDelete(req.params.classId);
    if(!gclassDeleted){
        error=new Error("some internal error occured , please try again");
        error.statusCode=500;
        throw error;
    }
    successHandler(res,null,"Successfully deleted the classroom",200)
    }catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}

exports.getFullClassInfo=async(req,res)=>{
    let error;
    try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    if(!user){
        error=new Error("user doesn't exist");
        error.statusCode=404;
        throw error;
    }
    const classId=req.params.id;
    const gclass=await classModel.findById(classId);
    if(!gclass){
        error=new Error("classroom doesn't exist");
        error.statusCode=404;
        throw error;
    }
    const classworks=await classworkModel.find({});
    const meetings=await calenderModel.find({});
    let classInfo={};
    classInfo.class=gclass
    classInfo.classworks=[]
    classInfo.calender=[];
    classworks.forEach((clswrk)=>{
        if(clswrk.class.equals(new ObjectId(classId))){
            classInfo.classworks.push(clswrk)
        }
    })
    meetings.forEach((meet)=>{
        if(meet.class.equals(new ObjectId(classId))){
            classInfo.calender.push(meet)
        }
    })
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++====")
    successHandler(res,{class:classInfo},"Class Information fetched successfully",200)
    }
    catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}