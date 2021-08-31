const classModel=require('../models/class');
const userModel=require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
const {successHandler,failureHandler}=require('../utils/responseHandler')

module.exports.getRegiseredClasses=async(req,res)=>{
    console.log("came here")
    let error;
    try{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    if(!user){
        error=new Error("user doesn't exist");
        error.statusCode=404;
        throw error;
    }
    const classes=await classModel.find({});
    console.log(classes,classes.length)
    let listOfclasses=[];
    classes.forEach((cls)=>{
        if(cls.owner.equals(new ObjectId(userId))|| cls.students.includes(new ObjectId(userId))){
            listOfclasses.push(cls)
        }
    })
    // if(listOfclasses.length===0){
    //     error=new Error("this user doesn't have any registered classes");
    //     error.statusCode=400;
    //     throw error;
    // }
    successHandler(res,{classes:listOfclasses},"Classes fetched successfully",200)
    }catch(e){
        failureHandler(res,e.message,e.statusCode)
    }
}
