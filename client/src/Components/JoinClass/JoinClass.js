import React, { useState,useEffect } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { joinClass } from "../../store/actions/class";
import {toHandleCreateBox,toHandleJoinBox} from "../../store/actions/class"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinClass() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const curUser = JSON.parse(localStorage.getItem("user"));
  const [classCode, setClassCode] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState();
  // const [joinedData, setJoinedData] = useState();
  // const [classExists, setClassExists] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(user.state.openJoinClass){
      setOpen(user.state.openJoinClass)
    }
},[user])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(toHandleJoinBox(false))
    setOpen(false);
    // props.open = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(joinClass(classCode));
    dispatch(toHandleJoinBox(false))
    setOpen(false);
    setClassCode("")
  };
  return (
    <div>
     <div>&nbsp;</div>
      <Dialog
        fullScreen
        // open={joinClassDialog}
        open={open}
        // onClose={() => setJoinClassDialog(false)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              // onClick={() => setJoinClassDialog(false)}
            >
              <Close className="joinClass__svg" onClick={handleClose} />
              <div className="joinClass__topHead">Join Class</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">You're currently signed in as</p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar /*src={loggedInUser?.photoURL}*/ />
                {curUser.email}
                <div className="joinClass__loginText">
                  <div className="joinClass__loginName">
                    {/* {loggedInUser?.displayName} */}
                  </div>
                  <div className="joinClass__loginEmail">
                    {/* {loggedInUser?.email} */}
                  </div>
                </div>
              </div>
              <Button variant="outlined" color="primary">
                Logout
              </Button>
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
// export default JoinClass;
