import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {useHistory} from "react-router-dom";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { selectClass,setSelectedClassId } from "../../store/actions/classwork";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeNavbar from "../Navbar/Home-Navbar/home.navbar";
import { Menu } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import SchoolIcon from "@material-ui/icons/School";
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  after_divider: {
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    color: "#5f6368",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    marginLeft: "1rem"
  }
});

export default function Drawer({classesList}) {
  const history=useHistory();
  const dispatch=useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button>
            <ListItemIcon>
              
                <HomeIcon fontSize="medium" /> 
              
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem button onClick={()=>history.push("/calender")}>
            <ListItemIcon>
              
                <CalendarTodayIcon fontSize="medium" /> 
              
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
      </List>
      <Divider />
      <p className={classes.after_divider}>Enrolled </p>
      <List>
        {classesList.map((text, index) => (
             <ListItem button key={text.name} onClick={()=>{dispatch(selectClass(text._id));dispatch(setSelectedClassId(text._id));history.push("/main")}}>
             <ListItemIcon>
               {" "}
               <SchoolIcon />{" "}
             </ListItemIcon>
             <ListItemText primary={text.name} />
           </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <HomeNavbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(anchor, true)}
            >
              <Menu />
            </IconButton>
          </HomeNavbar>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
