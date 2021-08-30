import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import db, { storage } from "../../lib/firebase";
import "./style.css";
// import firebase from "firebase";
// import { useLocalContext } from "../../context/context";
import  Announcement  from "../Announcement/Announcement";
import { getFullInfo } from "../../store/actions/classwork";
import ClassNavbar from "../Navbar/Class-Navbar/ClassNavbar";

const Main = ({ classData }) => {
  const dispatch = useDispatch();
  const classInfo = useSelector((state) => state);
  console.log("classInfo is..", classInfo.state.selectedClass.class);

  const [showInput, setShowInput] = useState(false);
  const [classDetails,setClassDetails]=useState({});
  const [inputValue, setInput] = useState("");
  const [titleValue, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = React.useRef();

  useEffect(()=>{
      console.log("from useeffect classInfo",classInfo.state.selectedClass.class)
      setClassDetails(classInfo.state.selectedClass.class)
  },[classInfo])

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target);
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };
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

  const handleUpload = () => {
    console.log("posted");
    // const uploadImage = storage.ref(`images/${image.name}`).put(image);

    //   uploadImage.on("state_changed", () => {
    //     storage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         db.collection("announcments")
    //           .doc("classes")
    //           .collection(classData.id)
    //           .add({
    //             timstamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             imageUrl: url,
    //             text: inputValue,
    //             sender: loggedInMail,
    //           });
    //       });
    //   });
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
                {classDetails.class.name}
              </h1>
              <div className="main__section main__overflow">
                {classDetails.class.description}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classDetails.class.code}</div>
              </div>
            </div>
          </div>
          <ClassNavbar />
        </div>
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
                            Choose File
                          </Button>
                        )}
                        <input
                          style={{ display: "none" }}
                          onChange={handleChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                          ref={fileInputRef}
                        />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          onClick={handleUpload}
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
            <Announcement classDetails={classDetails.classworks} />
            {/* <Announcement/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
};

export default Main;
