import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import  Announcement  from "../Announcement/Announcement";
import Meeting from "../Meet/Meeting";
import { getFullInfo,createClassWork } from "../../store/actions/classwork";
import ClassNavbar from "../Navbar/Class-Navbar/ClassNavbar";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import VideocamIcon from "@material-ui/icons/Videocam";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import "./style.css";

const Main = ({ classData }) => {
  const dispatch = useDispatch();
  const classInfo = useSelector((state) => state);
  const user=JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"));
  const [showInput, setShowInput] = useState(false);
  const [classDetails,setClassDetails]=useState({});
  const [inputValue, setInput] = useState("");
  const [titleValue, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [meetTopic,setMeetTopic]=useState("");
  const [meetAgenda,setMeetAgenda]=useState("");
  const [meetTime,setMeetTime]=useState("");
  const [tabValue,setTabValue]=useState(0);
  const [taskFile, setTaskFile] = useState(null);
  const fileInputRef = React.useRef();


  const createMeetHandler=async()=>{

    axios.post(`https://ourgclassroom.herokuapp.com/meet/create/${classDetails.class.class._id}`,{
      topic:meetTopic,
      agenda:meetAgenda,
      time:`${meetTime}:00Z`
    },
    {headers: { Authorization: `Bearer ${token}`}})
    .then((res)=>{
        dispatch(getFullInfo(classDetails.class.class._id))
        handleClose()
    }).catch((err)=>{
      console.log(err.response.data.message)
    })
  }

  const loadDetails=async(classId)=>{
    try {
      const response = await axios.get(
        `https://ourgclassroom.herokuapp.com/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setClassDetails(response.data.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    if(classInfo.state.selectedClassId){
      loadDetails(classInfo.state.selectedClassId)
    }
      // console.log("from useeffect classInfo",classInfo.state.selectedClass.class.classworks)
      // setClassDetails(classInfo.state.selectedClass.class)
  },[classInfo])

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };
  const handleFileChange = (e) => {
    if(e.target.files[0]){
      setTaskFile(e.target.files[0]);
    }else{
      setTaskFile(null);
    }
  }
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    let formData=new FormData();
    formData.append("image",image)
    axios.post("https://ourgclassroom.herokuapp.com/user/uploadImage",
      formData
    ).then((res)=>{
     
      dispatch(createClassWork(titleValue,
        "material",
        inputValue,
        res.data.image,null,null,
        {},
        classDetails.class.class._id))
    }).catch((err)=>{
      console.log(err)
    })
  };
  if(Object.keys(classDetails).length===0){
    return (
      <div>
        Loading....
      </div>
    )
  }
  else{
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classDetails.class.class.name}
              </h1>
              <div className="main__section main__overflow">
                {classDetails.class.class.description}
              </div>
               <div style={{display:"flex",alignItems:"center"}}>
               {
                user._id==classDetails.class.class.owner?
                <Button variant="contained" onClick={handleClickOpen}>
                <VideoCallIcon />
                Create Meeting
              </Button>:null
              }
                <div>
                <Meeting role={classDetails.class.class.owner==user._id?"1":"0"} user={user} />
                </div>
               </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Create Meeting</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Create a Meeting</DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      value={meetTopic}
                      onChange={(e)=>setMeetTopic(e.target.value)}
                      id="name"
                      label="Title"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      value={meetAgenda}
                      onChange={(e)=>setMeetAgenda(e.target.value)}
                      id="name"
                      label="Agenda"
                      fullWidth
                    />
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      gutterBottom
                    >
                      Due Date
                    </Typography>
                    <TextField
                      autoFocus
                      name="meet"
                      value={meetTime}
                      onChange={(e)=>setMeetTime(e.target.value)}
                      margin="dense"
                      id="meet_time"
                      type="datetime-local"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={createMeetHandler} color="primary">
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              <div className="main__wrapper2">
                <div className="main__id">Class Code : {classDetails.class.class.code}</div>
              </div>
            </div>
          </div>
          <ClassNavbar tabValue={tabValue} setTabValue={setTabValue} />
        </div>
        {tabValue===0?
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      label="Title"
                      variant="filled"
                      className="title_field"
                      value={titleValue}
                      onChange={(e) => setTitle(e.target.value)}
                      fullWidth
                    />

                    <br />
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />

                    <div className="main__buttons">
                    {preview ? (
                          <img
                            className="amt__img"
                            src={preview}
                            alt="announcement"
                            style={{ objectFit: "cover" }}
                            onClick={() => {
                              setImage(null);
                            }}
                          />
                        ) : (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              fileInputRef.current.click();
                            }}
                            variant="contained"
                          >
                            Choose Image
                          </Button>
                        )}
                        <input
                          style={{ display: "none" }}
                          onChange={handleChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                        />
                        <input
                          onChange={handleFileChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                          // ref={fileInputRef}
                        />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={()=>{handleUpload(); setShowInput(false);}}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce something to your class</div>
                  </div>
                )}
              </div>
            </div>
            <Announcement classDetails={classDetails.class.classworks} />

            {/* <Announcement/> */}
          </div>
        </div>
      :null}
      </div>
    </div>
  );
}
};

export default Main;
