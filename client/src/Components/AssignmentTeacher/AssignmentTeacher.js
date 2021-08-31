import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid";
import Grade from "../Grade/Grade";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addMarks } from "../../store/actions/classwork";
import { Typography } from "@material-ui/core";


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
  center: {
    textAlign: 'center'
  }

}));

export default function Assignment({ Assignments }) {
  const dispatch = useDispatch()
  // const 
  const [open, setOpen] = useState(false);
  const [marks, setMarks] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [testanswers, setTestAnswers] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [totalMarks, setTotalMarks] = useState("")
  const [classworkId, setClassworkId] = useState("")
  const handleClickOpen = (stu) => {
    setStudentId(stu)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setMarks(event.target.value);
  }
  const handleSubmit = (event) => {
    //   console.log(grade);
  }
  

  const addMarksHandler = () => {
    //classId, classworkId, marks, student
    dispatch(addMarks(Assignments.class._id, classworkId, marks, studentId))
  }

  const onSelectWork = (item) => {
    setClassworkId(item._id)
    setTotalMarks(item.points)
    item.answers.forEach((answer) => {
      axios
        .get(`https://ourgclassroom.herokuapp.com/user/getUser/${answer.student}`)
        .then((res) => {
          answer.email = res.data.data.data.email;
          answer.display = "true"
          setAnswers((prevState) => {
            return [...prevState, answer]
          })
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }

  const onSelectTest = (item) => {
    setClassworkId(item._id)
    setTotalMarks(item.points)
    item.answers.forEach((answer) => {
      axios
        .get(`https://ourgclassroom.herokuapp.com/user/getUser/${answer.student}`)
        .then((res) => {
          answer.email = res.data.data.data.email;
          answer.display = "true"
          setTestAnswers((prevState) => {
            return [...prevState, answer]
          })
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }

  const classes = useStyles();

  return (
    <div className={classes.splitScreen}>
      <div className={classes.topPane}>
        <Typography variant="h5" className={classes.center}>Assignment</Typography>
        <hr />
        {
            (Object.keys(Assignments).length === 0) ?
              <div>No Assignments</div>
              :
              Assignments.classworks.map((item) => {
                if (item.type == "assignment") {
                  return (
                    <div className={classes.root} onClick={() => {
                      onSelectWork(item)
                    }}>
                      <Grid container spacing={3} container justify="center">
                        {item.type === "assignment" ? (
                          <Grid item xs={6} className={classes.grid}>
                            <Paper className={classes.paper}>
                              {item.title}
                            </Paper>
                          </Grid>
                        ) : null}
                      </Grid>
                      <div>
                      {
                        [...new Set(answers)].map((ans) => {
                          if (ans.display == "true") {
                            return <div style={{ maxWidth: "100%", border: "1px solid black" }} >
                              <div style={{ display: "flex", alignItems: "center" }} ><Typography variant="h6" style={{ marginLeft: '10px' }}>{ans.email}</Typography>
                                <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '10px', height: '35px', marginTop: '10px' }} onClick={() => { handleClickOpen(ans.student) }}>add marks</Button>


                              </div>
                              <Typography color="secondary" style={{ marginLeft: '10px' }}>  {ans.marks}/ {totalMarks}</Typography>
                              <div style={{ marginLeft: '10px' }}>
                                <p>Text Answer is : {ans.textAnswer ? ans.textAnswer : "no text answer"}</p>
                                <p>File is : {ans.file ? ans.file : "no file"}</p>
                              </div>

                            </div>
                          }
                        })
                      }
                      </div>
                      </div>
                      );
          }
        })
        }
        </div>
        <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Enter Marks / {totalMarks}</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          onChange={handleChange}
                          margin="dense"
                          id="grade"
                          label="Marks"
                          type="number"
                          min="0"
                          value={marks}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={() => { handleClose(); handleSubmit(); addMarksHandler() }} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
        <div className={classes.bottomPane}>
          <Typography variant="h5" className={classes.center}>Test</Typography>
          <hr />
          {
            (Object.keys(Assignments).length === 0) ?
              <div>No Assignments</div>
              :
              Assignments.classworks.map((item) => {
                if (item.type == "test") {
                  return (
                    <div className={classes.root} onClick={() => {
                      onSelectTest(item)
                    }}>
                      <Grid container spacing={3} container justify="center">
                        {item.type === "test" ? (
                          <Grid item xs={6} className={classes.grid}>
                            <Paper className={classes.paper}>
                              {item.title} 
                            </Paper>
                          </Grid>
                        ) : null}
                      </Grid>
                      <div>
                      {
                        [...new Set(testanswers)]?.map((ans) => {
                          if (ans.display == "true") {
                            return <div style={{ maxWidth: "95%",marginLeft:"12px", border: "1px solid black" }} >
                              <div style={{ display: "flex", alignItems: "center" }} ><Typography variant="h6" style={{ marginLeft: '10px' }}>{ans.email}</Typography>
                                <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '10px', height: '35px', marginTop: '10px' }} onClick={() => { handleClickOpen(ans.student) }}>add marks</Button>


                              </div>
                              <Typography color="secondary" style={{ marginLeft: '10px' }}>  {ans.marks}/ {totalMarks}</Typography>
                              <div style={{ marginLeft: '10px' }}>
                                <p>Text Answer is : {ans.textAnswer ? ans.textAnswer : "no text answer"}</p>
                                <p>File is : {ans.file ? ans.file : "no file"}</p>
                              </div>

                            </div>
                          }
                        })
                      }
                      </div>
                      </div>
                      );
          }
        })
        }
        </div>
    </div>
        );
}
