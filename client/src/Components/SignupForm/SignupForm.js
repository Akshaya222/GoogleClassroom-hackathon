import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link,useHistory} from 'react-router-dom';
import Input from "@material-ui/core/Input";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import "./style.css";

function SignupForm() {
  const history=useHistory();
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [err, setErr] = React.useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }
  const responseGoogle = (response) => {
    axios
      .post("https://ourgclassroom.herokuapp.com/user/signup-google", {
        username: response.profileObj.name,
        email: response.profileObj.email,
        googleId: response.googleId
      })
      .then((res) => {
        setErr("");
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setTimeout(()=>{history.push("/home")},2000)
      })
      .catch((err) => {
        setErr("");
        setErr(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://ourgclassroom.herokuapp.com/user/signup", {
        username: state.username,
        email: state.email,
        password: state.password,
        passwordConfirm: state.confirmPassword
      })
      .then((res) => {
        setErr("");
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setTimeout(()=>{history.push("/home")},2000)
      })
      .catch((err) => {
        setErr("");
        console.log(err.response.data.message)
        setErr(err.response.data.message);
      });
  };
  return (
    <div className="card">
      <Card className="card-body">
        <CardContent>
          <img
            className="logo-img"
            src="https://logodownload.org/wp-content/uploads/2020/04/google-classroom-logo-2.png"
            alt="google classroom"
          ></img>
          <br />
          <br />
          <Typography variant="h4">Sign Up</Typography>
          <br />
          <Typography
            variant="body2"
            align="center"
            style={{ color: "red", margin: err ? "3px 0px" : null }}
          >
            {err ? err : null}
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Full Name"
              value={state.username}
              className="input_box"
            />
            <br />
            <br />
            <Input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email address"
              value={state.email}
              className="input_box"
            />
            <br />
            <br />

            <Input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Create Password"
              value={state.password}
              className="input_box"
            />
            <br />
            <br />
            <Input
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              className="input_box"
            />
            <br />
            <br />
            <CardActions className="cardActionsLgn">
              <div className="loginBtn">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Sign Up
                </Button>
              </div>
            </CardActions>
          </form>
          <Typography className="or" variant="caption" color="textSecondary">
            or
          </Typography>
          <br />
          <br />

          <GoogleLogin
            type="light"
            clientId="572165430323-q17vhadqud2vf81f3pj6i883775tk0b3.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <Typography className="signup" color="textSecondary">
            Already have an account?
            <br />
           <Link to="/login" >Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default SignupForm;
