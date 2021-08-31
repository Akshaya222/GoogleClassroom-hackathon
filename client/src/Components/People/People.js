import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullInfo} from "../../store/actions/classwork";
import axios from 'axios';
import "./style.css";
import Typography from "@material-ui/core/Typography";

export default function People() {
  const classInfo = useSelector((state) => state);
  const user=JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [classDetails,setClassDetails]=useState({});
  const [student,setStudent]=useState([])
  const [ownerEmail,setOwnerEmail]=useState("");
  
  const loadDetails=async(classId)=>{
    try {
      const response = await axios.get(
        `https://ourgclassroom.herokuapp.com/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setClassDetails(response.data.data.class.class)
    } catch (e) {
      console.log(e);
    }
  }
  const getOwner = (id) => {
    axios
    .get(`https://ourgclassroom.herokuapp.com/user/getUser/${id}`)
    .then((res) => {
        setOwnerEmail(res.data.data.data.email)
    })
    .catch((err) => {
      console.log(err);
    });
      if(classDetails?.students?.length!=0){
        classDetails?.students?.forEach((stu)=>{
          axios
          .get(`https://ourgclassroom.herokuapp.com/user/getUser/${stu}`)
          .then((res) => {
                setStudent(prevStudents=>
                  {
                    return [...prevStudents,res.data.data.data.email]
                  }
                )})
          .catch((err) => {
            console.log(err);
          })
        })
      }
  };

  useEffect(() => {
    if (classDetails) {
      getOwner(classDetails.owner);
    }
  }, [classDetails]);

  useEffect(()=>{
    if(classInfo.state.selectedClassId){
      loadDetails(classInfo.state.selectedClassId)
    }
  },[classInfo])

  // console.log("student length", students.length);
  
    return (
      <div className="people">
        <Typography variant="h4">Teacher</Typography>
        <hr/>
        <br />
          <div className="person">
            {<Avatar />}
            <div>{ownerEmail}</div>
          </div>
        <br />
        <Typography variant="h4">Students</Typography>
        <hr/>
        <br />
        {
          student.length==0?<p>No students</p>:<div>
            {student.map((item) => (
            <div className="person">
              {<Avatar />}
              <div>{item}</div>
            </div>
          ))}
          </div>
        }
      </div>
    );
}
