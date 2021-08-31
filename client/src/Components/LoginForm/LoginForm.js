import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import { useDispatch, useSelector } from "react-redux";
import {Link,useHistory} from 'react-router-dom';
// import GoogleButton from "react-google-button";
import axios from "axios";
import { addUser } from "../../store/actions/user";
import "./style.css";
import { GoogleLogin } from "react-google-login";
//572165430323-q17vhadqud2vf81f3pj6i883775tk0b3.apps.googleusercontent.com

export default function LoginForm() {
  const history=useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const [state, setState] = React.useState({
    email: "",
    password: ""
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
      .post("https://ourgclassroom.herokuapp.com/user/login-google", {
        username: response.profileObj.name,
        email: response.profileObj.email,
        googleId: response.googleId
      })
      .then((res) => {
        setErr("");
        dispatch(addUser(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setTimeout(()=>{history.push("/home")},2000)
        console.log(res.data.message);
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
      .post("https://ourgclassroom.herokuapp.com/user/login", {
        email: state.email,
        password: state.password
      })
      .then((res) => {
        setErr("");
        dispatch(addUser(res.data.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        // setTimeout(() => {
        //   navigate("/");
        // }, 3000);
       
        setTimeout(()=>{history.push("/home")},2000)
      })
      .catch((err) => {
        console.log("err from server", err);
        setErr("");
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
          <Typography variant="h4">Login</Typography>
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
              placeholder="Password"
              value={state.password}
              className="input_box"
            />
            <br />
            <br />
            {/* <Typography className="forgot-password" color="textSecondary">
              Forgot Password?
            </Typography> */}
            <br />
            <CardActions className="cardActionsLgn">
              <div className="loginBtn">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
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
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <Typography className="signup" color="textSecondary">
            Don't have an account?
            <br />
            <Link to="/register">Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
