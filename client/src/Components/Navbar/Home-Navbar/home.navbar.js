import React from "react";
import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch} from "react-redux";
import { useStyles } from "./style";
import {toHandleCreateBox,toHandleJoinBox} from "../../../store/actions/class"
import JoinClass from "../../JoinClass/JoinClass";
import CreateClass from "../../CreateClass/CreateClass";
const HomeNavbar = ({ children }) => {
  const dispatch=useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    dispatch(toHandleCreateBox(true))
    handleClose();

    // setCreateClassDialog(true);
  };

  const handleJoin = () => {
    dispatch(toHandleJoinBox(true))
    handleClose();

    // setJoinClassDialog(true);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar
                // onClick={() => logout()}
                // src={loggedInUser?.photoURL}
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
     <JoinClass/>
     <CreateClass/>
    </div>
  );
};
export default HomeNavbar;
