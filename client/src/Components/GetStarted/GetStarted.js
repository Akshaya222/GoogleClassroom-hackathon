import { Button } from "@material-ui/core";
import React from "react";
import {useHistory} from 'react-router-dom';
// import logo from "../../assets/logo.png";
// import { useLocalContext } from "../../context/context";
import "./style.css";
const GetStarted = () => {
  // const { login, loggedInUser } = useLocalContext();
  let history = useHistory();

  
  const logo =
    "https://logodownload.org/wp-content/uploads/2020/04/google-classroom-logo-2.png";
  return (
    <div className="login">
      <img className="login__logo" src={logo} alt="Classroom" />

      <Button variant="contained" color="primary" onClick={() =>{history.push("/login")} }>
        Get Started
      </Button>
    </div>
  );
};

export default GetStarted;
