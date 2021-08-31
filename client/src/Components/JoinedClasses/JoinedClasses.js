import { Avatar } from "@material-ui/core";
import { FolderOpen, PermContactCalendar } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { selectClass,setSelectedClassId } from "../../store/actions/classwork";
import "./style.css";
import axios from "axios";

const JoinedClasses = ({ classData }) => {
  const history=useHistory();
  const dispatch=useDispatch();
  const [ownerName, setOwnerName] = useState("");
  const getOwner = (id) => {
    axios
      .get(`https://ourgclassroom.herokuapp.com/user/getUser/${id}`)
      .then((res) => {
        setOwnerName(res.data.data.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (classData.owner) {
      getOwner(classData.owner);
    }
  }, [classData.owner]);

  return (
    // <div className={classes.root}>
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />
          <div className="joined__content">
            {/* <Link className="joined__title" to={`/${classData.id}`}>
              <h2>{classData.className}</h2>
            </Link> */}

            {/* Following is only temporary */}
            {/* ----------------------------------------------- */}
            <div className="joined__title" >
              <h2 onClick={()=>{dispatch(selectClass(classData._id));dispatch(setSelectedClassId(classData._id));history.push("/main")}} >{classData.name}</h2>
              <div className="joined__owner">
                <p>{ownerName}</p>
              </div>
            </div>
            {/* ------------------------------------------------ */}

            {/* <p className="joined__owner">Owner</p> */}
          </div>
        </div>
        <Avatar
          className="joined__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
        />
      </div>
      <div className="joined__bottom">
        <PermContactCalendar />
        <FolderOpen />
      </div>
    </li>
    // </div>
  );
};

export default JoinedClasses;
