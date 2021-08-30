import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Announcement from "../../Announcement/Announcement";
import ClassWork from "../../ClassWork/Classwork";
import People from "../../People/People";

function ClassNavbar(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

ClassNavbar.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: "white",
//   },
// }));
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function SimpleTabs({tabValue,setTabValue}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
      {/* <Paper square> */}
      <Tabs value={tabValue} onChange={handleChange}indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
 aria-label="simple tabs example">
          <Tab label="Stream" {...a11yProps(0)} />
          <Tab label="Classwork" {...a11yProps(1)} />
          <Tab label="People" {...a11yProps(2)} />
        </Tabs>
      {/* </Paper> */}
        
      </AppBar>
      {/* <ClassNavbar value={value} index={0}>
        Item One
      </ClassNavbar> */}
      <ClassNavbar value={tabValue} index={1}>
        <ClassWork/>
      </ClassNavbar>
      <ClassNavbar value={tabValue} index={2}>
        <People/>
      </ClassNavbar>
    </div>
  );
}
