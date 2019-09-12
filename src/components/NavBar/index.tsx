import React, { useContext, useCallback, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { AppContext, AppActions } from "../../state";
import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InvertColors from "@material-ui/icons/InvertColors";
import { RouteChildrenProps } from "react-router";
import { FirebaseContext } from "../Firebase";
import { Theme } from "../../theme";
import DarkMode from "./DarkMode";

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

const NavBar = ({ history }: RouteChildrenProps) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const { user, isDarkModeEnabled, dispatch } = useContext(AppContext);

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setOpen(false);
  }, []);

  const logout = useCallback(async () => {
    await firebase.logout();
    setOpen(false);
    history.push("/");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      {isDarkModeEnabled && <DarkMode />}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Olympic Bonzzu
          </Typography>
          {user && (
            <>
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
              <Button
                component={Link}
                to="/team"
                className={classes.linkButtons}
              >
                Teams
              </Button>
              <Button
                onClick={() => dispatch({ type: AppActions.TOGGLE_DARK_MODE })}
                className={classes.linkButtons}
              >
                <InvertColors />
              </Button>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {user.photoURL ? (
                  <Avatar alt="User photo" src={user.photoURL} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>

              <Menu
                id="profile-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>{user.displayName}</MenuItem>
                <MenuItem>{user.email}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
