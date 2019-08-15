import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import GroupIcon from "@material-ui/icons/Group";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import TournamentIcon from "../TournamentIcon";
import { Link } from "react-router-dom";
import { Theme } from "../../theme";
import { FirebaseContext } from "../Firebase";
import { RouteComponentProps } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "50%",
    padding: theme.spacing(2)
  }
}));

const MainMenu = ({ history }: RouteComponentProps) => {
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const logout = async () => {
    await firebase.logout();
    history.push("/");
  }
  return (
    <Paper className={classes.paper}>
      <List component="nav">
        <Link to="/team">
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItem>
        </Link>
        <Link to="/tournament">
          <ListItem button>
            <ListItemIcon>
              <TournamentIcon />
            </ListItemIcon>
            <ListItemText primary="Tournaments" />
          </ListItem>
        </Link>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default MainMenu;
