import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AppContext } from "../../state";
import { IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
    },
    linkButtons: {
      color: "white"
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { user } = useContext(AppContext);

  /* const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }
*/
  return (
    <div className={classes.root}>
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
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                //onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
