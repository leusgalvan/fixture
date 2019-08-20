import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 20,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linkButtons: {
      color: "white",
    },
  })
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Olympic Bonzzu
          </Typography>
          <Button
            component={Link}
            to="/mainMenu"
            className={classes.linkButtons}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/tournament"
            className={classes.linkButtons}
          >
            Tournaments
          </Button>
          <Button component={Link} to="/team" className={classes.linkButtons}>
            Teams
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
