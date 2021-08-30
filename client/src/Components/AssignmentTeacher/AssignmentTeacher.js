import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Grade from "../Grade/Grade";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  splitScreen: {
    display: 'flex',
    flexdirection: 'row'
  },
  topPane: {
    width: '50%',
  },
  bottomPane: {
    width: '50%'
  },
  grid: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  center:{
      textAlign: 'center'
  }
  
}));

export default function Assignment() {
  const data_items = [
    { type: "ass", name: "ass 1" },
    { type: "test", name: "test 1" },
    { type: "test", name: "test 2" },
    { type: "ass", name: "ass 2" }
  ];
  const classes = useStyles();

  return (
    <div className={classes.splitScreen}>
      <div className={classes.topPane}>
        <Typography variant="h5"className={classes.center}>Assignment</Typography>
        <hr />
        {data_items.map((item) => {
          return (
            <div className={classes.root}>
              <Grid container spacing={3} container justify = "center">
                {item.type === "ass" ? (
                  <Grid item xs={6} className={classes.grid}>
                    <Paper className={classes.paper}>
                      {item.name} <Grade />
                    </Paper>
                  </Grid>
                ) : null}
              </Grid>
            </div>
          );
        })}
      </div>
      <div className={classes.bottomPane}>
        <Typography variant="h5" className={classes.center}>Test</Typography>
        <hr />
        {data_items.map((item) => {
          return (
            <div className={classes.root}>
              <Grid container spacing={3} container justify = "center">
                {item.type === "test" ? (
                  <Grid item xs={6} className={classes.grid}>
                    <Paper className={classes.paper}>
                      {item.name}
                      <Grade/>
                    </Paper>
                  </Grid>
                ) : null}
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
}
