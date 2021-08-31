var request = require("request");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
const {nanoid}=require('nanoid');
const calenderModel=require('../models/calender');
const userModel=require('../models/user');
const classModel=require("../models/class");

//to generate jwt token
const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 15000)
};
console.log(process.env.ZOOM_API_SECRET)
const token = jwt.sign(payload,process.env.ZOOM_API_SECRET);
console.log("token generated");

//verify's meeting details received from frontend and returns signature
exports.verifyMeetingDetails=(req, res) => {
    if(!req.body){
        res.status(400).json({
            status:"failure",
            message:"Please send details"
          })
    }
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(process.env.ZOOM_API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
    const hash = crypto.createHmac('sha256', process.env.ZOOM_API_SECRET).update(msg).digest('base64')
    const signature = Buffer.from(`${process.env.ZOOM_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')
    if(signature){
      console.log("signature verified")
        res.status(200).json({
            status:"success",
            message:"Signature Generated Successfully",
            signature: signature
          })
    }
    else{
        res.status(404).json({
            status:"failure",
            message:"Meeting details invalid,Please try again!!"
          })
    }
  }

exports.createMeeting=async(req,res)=>{
  const {topic,time,agenda}=req.body;
  if(!topic,!time,!agenda){
    res.status(400).json({
      status:"failure",
      message:"Required missing fields"
    })
  }
  const userId=req.user.id;
        const classId=req.params.classId;
        const user=await userModel.findById(userId);
        if(!user){
          res.status(404).json({
            message:"User not found",
            status:"failure"
          })
        }
        const gclass=await classModel.findById(classId);
        if(!gclass){
          res.status(404).json({
            message:"Class not found",
            status:"failure"
          })
        }
    let password=nanoid(5);
      var options= {
        method: 'POST',
        url: 'https://api.zoom.us/v2/users/18bcs017@iiitdwd.ac.in/meetings',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`
        },  body: {
          "topic": topic,
          "type": "2",
          "start_time": time,
          "duration": "40",
          "timezone": "America/Los_Angeles",
          "password": password,
          "agenda": agenda,
          "settings": {
            "host_video": "true",
            "participant_video": "true",
            "cn_meeting": "false",
            "in_meeting": "true",
            "join_before_host": "true",
            "mute_upon_entry": "true",
            "watermark": "false",
            "use_pmi": "false",
            "approval_type": "2",
            "audio": "both",
            "auto_recording": "none",
            "enforce_login": "false",
            
         "registrants_email_notification": "true"
          }
        },
        json: true
      };

      request(options,async function (error, response, body) {
         if(body){//creator class title agenda time
           console.log(body.id,body.start_url,body.join_url,body.password)
           const meetItem={
            meetId:body.id,
            meetJoinUrl:body.join_url,
            meetStartUrl:body.start_url,
            meetPassword:body.password,
            creator:userId,
            meetTime:time,
            meetTopic:topic,
            meetAgenda:agenda,
            class:classId
           }
           const calender= await calenderModel.create(meetItem)
            res.status(200).json({
                status:"success",
                message:"Meeting has been created successfully",
                data:calender
             });
         }if(error){
             res.status(500).json({
                 status:"failure",
                 message:"Some Internal Error Occured from Zoom API",
                 error:error
             })
         }
      });
  }
exports.fetchCalender=async(req,res)=>{
    const userId=req.user.id;
    const user=await userModel.findById(userId);
    if(!user){
      res.status(404).json({
        message:"User not found",
        status:"failure"
      })
    }
    let fullCalender=await calenderModel.find({});
    let classes=await classModel.find({});
    let listOfclasses=[];
    classes.forEach((cls)=>{
        if(cls.owner.equals(new ObjectId(userId))|| cls.students.includes(new ObjectId(userId))){
            listOfclasses.push(cls)
        }
    })
    
    let finalItems=[];

    listOfclasses.forEach((cls)=>{
      fullCalender.forEach((meet)=>{
        if(meet.class.equals(new ObjectId(cls._id))){
            finalItems.push(meet)
        }
    })
    })
    res.status(200).json({
      data:finalItems
    })
  }

  