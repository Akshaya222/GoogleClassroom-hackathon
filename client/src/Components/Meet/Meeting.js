import React,{useEffect,useState} from 'react';
import {ZoomMtg} from '@zoomus/websdk';
import { useSelector } from "react-redux";
import {Button} from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import "./styles.css";


ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.8/lib', '/av');

function Meeting({role,user}) {
    const classInfo=useSelector(state=>state);
    const [classDetails,setClassDetails]=useState({});

useEffect(()=>{
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
  },[])

  useEffect(()=>{
    setClassDetails(classInfo.state.selectedClass.class)
},[classInfo])

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://ourgclassroom.herokuapp.com/meet/verify-token'
  var apiKey = 'khbgXDkkSICFyUnWPOMWbg'
  var meetingNumber =classInfo?.state?.selectedClass.class.calender[classInfo.state.selectedClass.class.calender.length-1]?.meetId
  var leaveUrl = 'https://ourgclassroom.herokuapp.comhome'
  var userName = user.username
  var userEmail = user.email
  var passWord =classInfo?.state?.selectedClass.class.calender[classInfo.state.selectedClass.class.calender.length-1]?.meetPassword

  function getSignature(meetingNumber,password,role){
    fetch(signatureEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber:meetingNumber,
          role: role
        })
      }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature,meetingNumber,password)
      }).catch(error => {
        console.error(error)
      })
}

function startMeeting(signature,meetingNumber,password) {
  document.getElementById('zmmtg-root').style.display = 'block'
  ZoomMtg.init({
    leaveUrl: leaveUrl,
    isSupportAV: true,
    success: (success) => {
      ZoomMtg.join({
        signature: signature,
        meetingNumber: meetingNumber,
        userName: userName,
        apiKey: apiKey,
        userEmail: userEmail,
        passWord: password,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        }
      })

    },
    error: (error) => {
      console.log(error)
    }
  })
}

  return (
    <div className="App">
      {
        classInfo?.state?.selectedClass?.class?.calender?.length==0?<p>No lecture</p>:<Button
        className="start__btn"
                     variant="contained"
                     //onClick={()=>getSignature(meetingNumber,passWord,role)}
                     onClick={()=>window.open(classInfo.state.selectedClass.class.calender[classInfo?.state?.selectedClass.class.calender.length-1]?.meetJoinUrl)}
                   >
                     {role==1?"Start Class":"Join Class"}
                     
                   </Button>
      }
        
    </div>
  );
}

export default Meeting;