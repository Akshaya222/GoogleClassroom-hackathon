
import React, { useEffect, useState } from "react";
import {Avatar,Typography} from '@material-ui/core';
import axios from 'axios'
import "./style.css";
const Announcment = ({ classDetails }) => {
  const getOwner = () => {
    classDetails.forEach((item)=>{
      axios
      .get(`https://ourgclassroom.herokuapp.com/user/getUser/${item.author}`)
      .then((res) => {
        
        item.authorName=res.data.data.data.username
      })
      .catch((err) => {
        console.log(err);
      });
    })
   
  };
 getOwner()

  
  return (
    <div>
      {classDetails.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <Typography variant="h6">{item.authorName} posted a new {item.type} {item.title}</Typography>
            </div>
            <Typography variant="subtitle1" className="amt__txt"  >
              {item.description}
            </Typography>

            <img className="amt__img" src={item.photo} alt={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcment;
