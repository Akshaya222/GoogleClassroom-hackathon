var request = require("request");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

exports.createMeeting=(req,res)=>{
    if(!req.body){
        res.status(400).json({
            status:"failure",
            message:"Please send details"
          })
    }
      var options= {
        method: 'POST',
        url: 'https://api.zoom.us/v2/users/18bcs017@iiitdwd.ac.in/meetings',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`
        },  body: {
          "topic": req.body.topic,
          "type": "2",
          "start_time": req.body.time,
          "duration": "40",
          "timezone": "America/Los_Angeles",
          "password": req.body.password,
          "agenda": req.body.agenda,
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

      request(options, function (error, response, body) {
         if(body){
            res.status(200).json({
                status:"success",
                message:"Meeting has been created successfully",
                data:body
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


  //sending all meetings scheduled
exports.getAllMeetings=(req,res)=>{
    var options = {
    method: 'GET',
    url: 'https://api.zoom.us/v2/users/18bcs017@iiidwd.ac.in/meetings',
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  request(options, function (error, response, body) {
     if(body){
        if(JSON.parse(body).total_records!==0){
            res.status(200).json({
            status:"success",
            message:"meeting has been sent successfully",
            data:JSON.parse(body).meetings
         }); 
         }
         else{
            res.status(200).json({
            status:"success",
            message:"no meetings found"});
         }
     }
     else{
         res.status(500).json({
             status:"failure",
             message:"Some Internal Error Occured from zoom API",
             error:error
         })
     }
  });
  }
//get specific meeting
exports.getMeetingDetails=(req,res)=>{
      
    if(!req.params.id){
        res.status(400).json({
            status:"failure",
            message:"Meeting not found"
          })
    }else{
        var options = {
            method: 'GET',
            url: `https://api.zoom.us/v2/meetings/${req.params.id}`,
            headers: {
              authorization: `Bearer ${token}`
            }
          };
          request(options, function (error, response, body) {
            if(body){
               res.status(200).json({
                   status:"success",
                   message:"meeting has been created successfully",
                   data:JSON.parse(body)
                }); 
            }
            else{
               res.status(500).json({
                   status:"failure",
                   message:"Some Internal Occured from Zoom API",
                   error:error
                }); 
            }
         });
    }
  }

