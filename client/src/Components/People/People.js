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
  console.log("classInfo is..", classInfo.state.selectedClass.class,classInfo.state.selectedClassId);
  const [classDetails,setClassDetails]=useState({});
  let ownerEmail="";
  let students=[]
  const loadDetails=async(classId)=>{
    try {
      const response = await axios.get(
        `http://localhost:3002/class/${classId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("response",response.data.data)
      setClassDetails(response.data.data.class.class)
    } catch (e) {
      console.log(e);
    }
  }
  const getOwner = (id) => {
      classDetails.students?.forEach((stu)=>{
        axios
      .get(`http://localhost:3002/user/getUser/${id}`)
      .then((res) => {
        console.log(res.data.data.data.email)
          ownerEmail=res.data.data.data.email
          if(students.length==0){
            students[0]=res.data.data.data.email
          }
          else{
            students.push(res.data.data.data.email)
          }
       
      })
      .catch((err) => {
        console.log(err);
      });
      })
  };

  console.log(students)
  useEffect(() => {
    if (classDetails) {
      getOwner(classDetails.owner);
    }
  }, [classDetails]);

  useEffect(()=>{
    if(classInfo.state.selectedClassId){
      loadDetails(classInfo.state.selectedClassId)
    }
      // console.log("from useeffect classInfo",classInfo.state.selectedClass.class)
      // setClassDetails(classInfo.state.selectedClass.class)
  },[classInfo])


   if(students.length===0){
     return(
       <div>Loading</div>
     )
   }
   else{
    return (
      <div className="people">
        <Typography variant="h4">Teacher</Typography>
        <br />
          <div className="person">
            {<Avatar />}
            <div>{ownerEmail}</div>
          </div>
        <br />
        <Typography variant="h4">Students</Typography>
        <br />
        {students.map((item) => (
          <div className="person">
            {<Avatar />}
            <div>{item}</div>
          </div>
        ))}
      </div>
    );
   }
}
