import React,{} from "react";
import { BrowserRouter,Switch,Route} from 'react-router-dom';

// importt HomeNavbar from "./Components/Navbar/Home-Navbar/home.navbar";
import JoinClass from "./Components/JoinClass/JoinClass";
import Announcement from "./Components/Announcement/Announcement";
import Drawer from "./Components/Drawer/Drawer";
import AllJoinedClasses from "./Components/JoinedClasses/AllJoinedClasses";
import Main from "./Components/Main/Main";
import GetStarted from "./Components/GetStarted/GetStarted";
// import ClassNavbar from "./Components/Navbar/Class-Navbar/ClassNavbar";
import SignupForm from "./Components/SignupForm/SignupForm";
import LoginForm from "./Components/LoginForm/LoginForm";
// import ContextProvider from "./context/context";
 import Calendar from "./Components/Calendar/Calendar";
import Classwork from "./Components/ClassWork/Classwork";
import People from "./Components/People/People";
import CreateClass from "./Components/CreateClass/CreateClass";

import HomeNavbar from "./Components/Navbar/Home-Navbar/home.navbar";


export default function App() {
  // const classes = [{owner: "agj", className: "angdo", description: "ahgoeg", id:"23"}]
  return (
      <BrowserRouter>
        <Switch>
           <Route path="/login" exact component={LoginForm}/>
           <Route path="/register" component={SignupForm}/>
           <Route path="/home" component={AllJoinedClasses}/>
           <Route path="/main" component={Main} />
           <Route path="/classwork" component={Classwork} />
           <Route path="/calender" component={Calendar} />
           <Route path="/" exact component={GetStarted} />
        </Switch>
     </BrowserRouter>
  );
}
{/* <JoinForm/> */}
      {/* <Login/> */}
      {/* <CreateClass /> */}
      {/* <HomeNavbar /> */}
      {/* <Calendar /> */}
      {/* <Classwork /> */}
      {/* <People /> */}
      


// import React,{useEffect} from 'react';
// import {ZoomMtg} from '@zoomus/websdk';

// import './App.css';
// import './index.css';




// ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.8/lib', '/av');


// function App() {

//   useEffect(()=>{

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load('en-US');
// ZoomMtg.i18n.reload('en-US');
//   },[])

//   // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
//   var signatureEndpoint = 'http://localhost:3002/meet/verify-token'
//   var apiKey = 'khbgXDkkSICFyUnWPOMWbg'
//   var meetingNumber = '95091150724'
//   var role = 1
//   var leaveUrl = 'http://localhost:3000'
//   var userName = 'Bhavya'
//   var userEmail = 'bhavyatripati00@gmail.com'
//   var passWord = 'AUG30'
//   // pass in the registrant's token if your meeting or webinar requires registration. More info here:
//   // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
//   // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar

//   function getSignature(meetingNumber,password,role){
//     fetch(signatureEndpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           meetingNumber:meetingNumber,
//           role: role
//         })
//       }).then(res => res.json())
//       .then(response => {
//         startMeeting(response.signature,meetingNumber,password)
//       }).catch(error => {
//         console.error(error)
//       })
// }

// function startMeeting(signature,meetingNumber,password) {
//   document.getElementById('zmmtg-root').style.display = 'block'
//   ZoomMtg.init({
//     leaveUrl: leaveUrl,
//     isSupportAV: true,
//     success: (success) => {
//       console.log(success)

//       ZoomMtg.join({
//         signature: signature,
//         meetingNumber: meetingNumber,
//         userName: userName,
//         apiKey: apiKey,
//         userEmail: userEmail,
//         passWord: password,
//         success: (success) => {
//           console.log(success)
//         },
//         error: (error) => {
//           console.log(error)
//         }
//       })

//     },
//     error: (error) => {
//       console.log(error)
//     }
//   })
// }

//   return (
//     <div className="App">
//       <main>
//         <h1>Zoom Meeting SDK Sample React</h1>
//         <button onClick={()=>getSignature(meetingNumber,passWord,role)}>Join Meeting</button>
//       </main>
//     </div>
//   );
// }

// export default App;

