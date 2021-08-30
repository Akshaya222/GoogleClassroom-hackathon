import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./style.css";
import Typography from "@material-ui/core/Typography";

export default function People() {
  const [people, setPeople] = useState([
    { id: "123142", name: "Hema Malini", type: "teacher" },
    { id: "473400", name: "Abhishek", type: "student" }
  ]);
  return (
    <div className="people">
      <Typography variant="h4">Teacher</Typography>
      <br />
      {people.map((item) => (
        <div className="person">
          {item.type === "teacher" ? <Avatar /> : null}
          <div>{item.type === "teacher" ? item.name : null}</div>
        </div>
      ))}
      <br />
      <Typography variant="h4">Students</Typography>
      <br />
      {people.map((item) => (
        <div className="person">
          {item.type === "student" ? <Avatar /> : null}
          <div>{item.type === "student" ? item.name : null}</div>
        </div>
      ))}
    </div>
  );
}
