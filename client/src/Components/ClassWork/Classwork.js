import React, {useState, useRef, useEffect} from "react";
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
import {useDispatch,useSelector} from "react-redux";
import { createClassWork } from "../../store/actions/classwork";
import "./style.css";
import Assignment from "../Assignment/Assignment";
import AssignmentTeacher from "../AssignmentTeacher/AssignmentTeacher";
import axios from "axios";

export default function Classwork() {
  const dispatch=useDispatch();
  const classInfo = useSelector((state) => state);
  const user=JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [classDetails,setClassDetails]=useState({});
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openTest, setOpenTest] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [preview, setPreview] = useState("");

  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const [title, setTitle]=useState("");
  const [description, setDescription]=useState("");
  const [dueDate, setDueDate]=useState("");
  const [taskFile, setTaskFile]=useState("");
  const [type, setType] = useState("");
  const [points, setPoints] = useState("");
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
  
  const onSelectMaterial=()=>{
    setType("")
    setType("material");
  }
  const onSelectTest=()=>{
    setType("")
    setType("test")
  }
  const onSelectAssignment=()=>{
    setType("")
    setType("assignment")
  }

  const loadDetails=async(classId)=>{
    try {
      const response = await axios.get(
        `https://ourgclassroom.herokuapp.com/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
   
      setClassDetails(response.data.data.class)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(()=>{
    if(classInfo.state.selectedClassId){
      loadDetails(classInfo.state.selectedClassId)
    }
  },[classInfo])

  const handlesubmit = async(e) => {
    let formData=new FormData();
    formData.append("image",image)
    let formDataFile=new FormData();
    
    formDataFile.append("upload_file",taskFile)
    let imageUrl=null;
    let fileUrl=null;
    if(image){
     
      imageUrl=await axios.post("https://ourgclassroom.herokuapp.com/user/uploadImage",formData);
    }
   
    dispatch(createClassWork(title,
      type,
      description,
      imageUrl?imageUrl.data.image:null,
      dueDate?`${dueDate}.00Z`:null,
      points?points:null,
      {},
      classDetails.class._id))
      handleCloseMaterial();
      handleCloseTest();
      handleCloseAssignment();
      setTitle("")
      setDescription("");
      setDueDate("");
      setTaskFile(null);
      setImage(null);
      setPoints("")
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
    setType("");
  };
  const handleCloseAssignment = () => {
    setOpenAssignment(false);
    setType("");
  };
  const handleCloseTest = () => {
    setOpenTest(false);
    setType("");
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    
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
            onSelectMaterial();
          }}
          // onChange={} 
        >
        
          Material
        </MenuItem>
        <MenuItem
        
          onClick={(e) => {
            handleClose();
            handleClickOpenAssignment();
            onSelectAssignment();
           
          }}
          
        >
          Assignment
        </MenuItem>
        <MenuItem
         
          onClick={() => {
            handleClose();
            handleClickOpenTest();
            onSelectTest()
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
              
              variant="outlined"
              color="primary"
              type="file"
              ref={fileInputRef}
              accept="image/*"
            />

            <input
              // style={{ display: "none" }}
              value={taskFile}
              onChange={(e)=>{setTaskFile(e.target.value)}}
              variant="outlined"
              color="primary"
              type="file"
              
            />
          </DialogContentText>
          <TextField
            // onChange={handleWorkChange}
            // value={work.title}
            name="title"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
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
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
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
              value={taskFile}
              onChange={(e)=>{setTaskFile(e.target.value)}}
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
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            name="title"
            margin="dense"
            id="assignment_title"
            fullWidth
          />
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            // value={work.description}
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            name="description"
            margin="dense"
            id="assignment_name"
            label="Class Assignment"
            multiline
            fullWidth
            rows={4}
          />
           <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="points"
            label="Maximum marks"
            type="number"
            value ={points}
            onChange={(e)=>{setPoints(e.target.value)}}
            fullWidth
          />
          <br/>
          <br/>
          <Input
            value={dueDate}
            autoFocus
            // onChange={handleWorkChange}
            // value={work.dueDate}
            onChange={(e)=>{setDueDate(e.target.value)}}
            name="dueDate"
            margin="dense"
            id="assignment_due_date"
            type="datetime-local"
          />
         <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Due Date
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignment} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseAssignment();
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
              value={taskFile}
              onChange={(e)=>{setTaskFile(e.target.value)}}
              variant="outlined"
              color="primary"
              type="file"
            />
          </DialogContentText>
          <TextField
            autoFocus
            // onChange={handleWorkChange}
            // value={work.title}
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
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
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            margin="dense"
            id="test_name"
            label="Test Name"
            multliline
            fullWidth
            rows={10}
          />
          <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="points"
            label="Maximum marks"
            type="number"
            value ={points}
            onChange={(e)=>{setPoints(e.target.value)}}
            fullWidth
          />
          <br/>
          <br/>
          <Input
            autoFocus
            // onChange={handleWorkChange}
            // value={work.dueDate}
            value={dueDate}
            onChange={(e)=>{setDueDate(e.target.value)}}
            name="dueDate"
            margin="dense"
            id="test_due_date"
            type="datetime-local"
          />
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Due Date
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTest} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              handleCloseTest();
              handlesubmit();
            }} color="primary">
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
      {
         Object.keys(classDetails).length==0?<p>No class work</p>:<div>
           {
          user._id == classDetails.class.owner?<AssignmentTeacher  Assignments={classDetails} />:<Assignment Assignments={classDetails} />
          }
         </div>
      }
    </div>
  );
}
