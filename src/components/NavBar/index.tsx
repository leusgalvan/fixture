import React, { useContext, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 20
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const AppNavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/mainMenu">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <Home />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title}>
            Olympic Bonzzu
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;
