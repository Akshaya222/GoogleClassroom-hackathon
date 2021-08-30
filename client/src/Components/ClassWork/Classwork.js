import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Input } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./style.css";
import Assignment from "../Assignment/Assignment";
import AssignmentTeacher from "../AssignmentTeacher/AssignmentTeacher";
// Create handlesubmit func

export default function Classwork() {
  const [openAssignment, setOpenAssignment] = React.useState(false);
  const [openMaterial, setOpenMaterial] = React.useState(false);
  const [openTest, setOpenTest] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [preview, setPreview] = React.useState("");

  const [image, setImage] = React.useState(null);
  const fileInputRef = React.useRef();
  // const [work, setWork] = React.useState([
  //   {
  //     type: "material",
  //     title: "work 1",
  //     description: "anggnogaiengel algnk",
  //     work: "",
  //     dueDate: "020819"
  //   },
  //   {
  //     type: "test",
  //     title: "test 1",
  //     description: "anggnogaiengel algnk",
  //     work: "",
  //     dueDate: "020839"
  //   }
  // ]);

  // function handleWorkChange(event) {
  //   const { name, value } = event.target;
  //   setWork((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value
  //     };
  //   });
  // }

  const handlesubmit = (e) => {
    // e.preventDefault();
    // console.log(work);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenMaterial = () => {
    setOpenMaterial(true);
  };
  const handleClickOpenAssignment = () => {
    setOpenAssignment(true);
  };
  const handleClickOpenTest = () => {
    setOpenTest(true);
  };

  const handleCloseMaterial = () => {
    setOpenMaterial(false);
  };
  const handleCloseAssignment = () => {
    setOpenAssignment(false);
  };
  const handleCloseTest = () => {
    setOpenTest(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(e.target);
      setImage(file);
    } else {
      setImage(null);
    }
  };
  React.useEffect(() => {
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
  return (
    <div>
      <br />
      <br />
      <div className="root">
        <Button variant="contained" color="primary" onClick={handleClick}>
          <AddIcon />
          Add Classwork
        </Button>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleClickOpenMaterial();
            // setWork({ type: "material" });
          }}
        >
          Material
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleClickOpenAssignment();
            // setWork({ type: "assignment" });
          }}
        >
          Assignment
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleClickOpenTest();
            // setWork({ type: "test" });
          }}
        >
          Test
        </MenuItem>
      </Menu>
      {/* MATERIAL DIALOG */}
      <Dialog
        open={openMaterial}
        onClose={handleCloseMaterial}
        value="material"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Material</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* <input
              // onChange={() => {
              //   handleChange();
              //   // handleWorkChange();
              // }}
              onChange={handleChange}
              // value={work.work}
              name="work"
              variant="outlined"
              color="primary"
              type="file"
            /> */}
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
                size="small"
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
              // style={{ display: "none" }}
              onChange={handleChange}
              variant="outlined"
              color="primary"
              type="file"
            />
          </DialogContentText>
          <TextField
            // onChange={handleWorkChange}
            // value={work.title}
            name="title"
            autoFocus
            margin="dense"
            id="material_title"
            label="Title"
            fullWidth
          />
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            // value={work.description}
            name="description"
            margin="dense"
            id="material_name"
            label="Class Material"
            multiline
            rows={5}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMaterial} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseMaterial();
              handlesubmit();
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
      {/* ASSIGNMENT DIALOG */}
      <Dialog
        open={openAssignment}
        onClose={handleCloseAssignment}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* <input
              // onChange={() => {
              //   handleChange();
              //   // handleWorkChange();
              // }}
              // value={work.work}
              onChange={handleChange}
              name="work"
              variant="outlined"
              color="primary"
              type="file"
            /> */}
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
                size="small"
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
              // style={{ display: "none" }}
              onChange={handleChange}
              variant="outlined"
              color="primary"
              type="file"
            />
          </DialogContentText>
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            label="Title"
            // value={work.title}
            name="title"
            margin="dense"
            id="assignment_title"
            fullWidth
          />
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            // value={work.description}
            name="description"
            margin="dense"
            id="assignment_name"
            label="Class Assignment"
            multiline
            fullWidth
            rows={4}
          />
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            Due Date
          </Typography>
          <Input
            autoFocus
            // onChange={handleWorkChange}
            // value={work.dueDate}
            name="dueDate"
            margin="dense"
            id="assignment_due_date"
            type="datetime-local"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignment} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseMaterial();
              handlesubmit();
            }}
            color="primary"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
      {/* TEST DIALOG */}
      <Dialog
        open={openTest}
        onClose={handleCloseTest}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* <input
              // onChange={() => {
              //   handleChange();
              //   // handleWorkChange();
              // }}
              onChange={handleChange}
              name="work"
              // value={work.work}
              variant="outlined"
              color="primary"
              type="file"
            /> */}
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
                size="small"
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
              // style={{ display: "none" }}
              onChange={handleChange}
              variant="outlined"
              color="primary"
              type="file"
            />
          </DialogContentText>
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            // value={work.title}
            name="title"
            margin="dense"
            id="test_title"
            label="Title"
            fullWidth
          />
          <TextField
            autoFocus
            name="description"
            // onChange={handleWorkChange}
            // value={work.description}
            margin="dense"
            id="test_name"
            label="Test Name"
            multliline
            fullWidth
            rows={10}
          />
          <Typography variant="subtitle1" color="textPrimary" gutterBottom>
            Due Date
          </Typography>
          <Input
            autoFocus
            // onChange={handleWorkChange}
            // value={work.dueDate}
            name="dueDate"
            margin="dense"
            id="test_due_date"
            type="datetime-local"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTest} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseTest} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <Typography variant="h4" className="classwork__heading">Classwork</Typography>
      <hr />
      <br />
      {/* {work.map((item) => {
        return (
          <div className="amt">
            <div className="amt__Cnt">
              <div className="amt__top">
                <Typography variant="h6" className="root">
                  {item.title}
                </Typography>
              </div>
              <Typography variant="subtitle1" className="amt__txt">
                {item.description}
              </Typography>

              <img className="amt__img" src={item.imageUrl} alt={item.text} />
            </div>
          </div>
        );
      })} */}
      <AssignmentTeacher />
    </div>
  );
}
