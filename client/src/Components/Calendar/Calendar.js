import React, { useState,useEffect } from "react";
import axios from 'axios';
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
  // EventSettingsModel
} from "@syncfusion/ej2-react-schedule";

export default function Calendar() {
  const [calender,setCalender]=useState([]);
  const token=JSON.parse(localStorage.getItem("token"));

  const loadCalender=()=>{
    axios.get("https://ourgclassroom.herokuapp.com/meet/full-calender",{ headers: { Authorization: `Bearer ${token}` }}).then((res)=>{
      res.data.data.map((item)=>{
              const d=new Date(item.meetTime);
              item.startTime=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds());
              item.endTime=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()+1,d.getMinutes(),d.getSeconds());
              setCalender((prevState)=>{
                return [...prevState,item]
              })
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

useEffect(()=>{
  loadCalender()
},[])


  return (
    <ScheduleComponent
      currentView="Month"
      eventSettings={{
        dataSource: [...new Set(calender)],
        fields: {
          id: "meetId",
          subject: { name: "meetTopic" },
          startTime: { name: "startTime" },
          endTime: { name: "endTime" },
          description: {name: "meetJoinUrl"},
          location:{name:"meetJoinUrl"}
        }
      }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}
