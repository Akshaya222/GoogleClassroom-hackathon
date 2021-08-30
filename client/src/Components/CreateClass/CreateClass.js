import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./style.css";
import { createClass } from "../../store/actions/class";

const CreateClass = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  console.log("state is..", user);
  const [className, setClassName] = useState("");

  const [Description, setDescription] = useState("");

  const addClass = (e) => {
    e.preventDefault();
    dispatch(createClass(className, Description));
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // props.open = false;
  };
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open create class form
      </Button>
      <Dialog
        // fullScreen
        // open={joinClassDialog}
        open={open}
        // onClose={() => setJoinClassDialog(false)}
        onClose={handleClose}
        maxWidth="md"
        // TransitionComponent={Transition}
      >
        <div className="form">
          {/* <p className="class__title">Create Class </p>
          <Close className="joinClass__svg" onClick={handleClose} /> */}
          <div
            className="createClass__wraper2"
            // onClick={() => setJoinClassDialog(false)}
          >
            <div className="class__title">Create Class</div>
            <Close className="createClass__svg" onClick={handleClose} />
          </div>
          <div className="form__inputs">
            <TextField
              id="filled-basic"
              label="Class Name (required)"
              className="form__input"
              variant="filled"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />

            <TextField
              id="filled-basic"
              label="Description"
              className="form__input"
              variant="filled"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogActions>
            <Button onClick={addClass} color="primary">
              Create
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateClass;
