import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import { addAnswer } from "../../store/actions/classwork";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Answer from "../Answer/Answer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  splitScreen: {
    display: 'flex',
    flexdirection: 'row'
  },
  topPane: {
    width: '50%',
  },
  bottomPane: {
    width: '50%'
  },
  grid: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  center:{
      textAlign: 'center'
  }
  
}));

export default function Assignment({Assignments}) {
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem("user"))
 
  const classes = useStyles();
  //classId, classworkId, answers
  const [open, setOpen] = React.useState(false);
  const [answer, setAnswer] = useState(null);
  const [image, setImage] = useState(null);
  const [type,setType]=useState("");
  const [classworkId,setClassworkId]=useState("");

  const handleClickOpen = (type,cslwrkId) => {
    setType(type)
    setClassworkId(cslwrkId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler=async()=>{
    let formData=new FormData();
    formData.append("image",image)
    let imageUrl=null;
    if(image){
      // console.log("image hereeee")
      imageUrl=await axios.post("https://ourgclassroom.herokuapp.com/user/uploadImage",formData);
    }

      dispatch(addAnswer(Assignments.class._id,classworkId,{file:imageUrl?imageUrl.data.image:null,textAnswer:answer}))
  }
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(e.target);
      setImage(file);
    } else {
      setImage(null);
    }
  };
  console.log("assignments from assignment.js",Assignments)
 

  return (
    <div className={classes.splitScreen}>
      <div className={classes.topPane}>
        <Typography variant="h5"className={classes.center}>Assignment</Typography>
        <hr />
         {
           (Object.keys(Assignments).length===0)?
              <div>No Assignments</div>
           :
          
            Assignments.classworks.map((item) => {
              if(item.type=="assignment"){
                return (
                  <div className={classes.root}>
                    <Grid container spacing={3} container justify = "center">
                      {item.type === "assignment" ? (
                        <Grid item xs={6} className={classes.grid}>
                          <Paper className={classes.paper}>
                          <Typography variant="h6">{item.title}</Typography>
                             
                            {
                              item.answers?.map((ans)=>{
                                if(ans.student==user._id){
                                  return <Typography color="secondary">{ans.marks} / {item.points}</Typography>

                                }
                              })
                            }
                            <div>
      <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen("Assignment",item._id)}}>
        Add Assignment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{type}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={answer}
            onChange={(e)=>{setAnswer(e.target.value)}}
            label="Type your answer..."
            fullWidth
          />
          <input variant="outlined" color="primary" type="file" onChange={handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(); submitHandler();}} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    {/* -------------------------------------------- */}
                          </Paper>
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                );
              
            }})
            }
      </div>
      <div className={classes.bottomPane}>
        <Typography variant="h5" className={classes.center}>Test</Typography>
        <hr />
        {
           (Object.keys(Assignments).length===0)?
              <div>No Assignments</div>
           :
          
            Assignments.classworks.map((item) => {
              if(item.type=="test"){
                return (
                  <div className={classes.root}>
                    <Grid container spacing={3} container justify = "center">
                      {item.type === "test" ? (
                        <Grid item xs={6} className={classes.grid}>
                          <Paper className={classes.paper}>
                          <Typography variant="h6">{item.title}</Typography>

                            {
                              item.answers?.map((ans)=>{
                                if(ans.student==user._id){
                                  return <Typography color="secondary">{ans.marks} / {item.points}</Typography>
                                }
                              })
                            }
                            <div>
      <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen("Test",item._id)}}>
        Answer
      </Button>
    </div>
                            {/* ------------------------------- */}
                          </Paper>
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                );
              
            }})
            }
      </div>
    </div>
  );
}
