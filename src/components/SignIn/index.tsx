import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { Theme } from "../../theme";
import { User } from "firebase";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(2),
    width: "50%",
    alignItems: "center"
  },

  title: {
    margin: theme.spacing(2)
  },

  button: {
    margin: theme.spacing(2)
  }
}));

interface SignInProps {
  onLoginSuccess: (user: User) => void;
  onLoginError: (err: string) => void;
}

const SignIn = ({ onLoginSuccess, onLoginError }: SignInProps) => {
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5" color="textPrimary">
        Welcome
      </Typography>
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant="h6">Signing in...</Typography>
        </>
      ) : (
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}
        >
          Sign in
        </Button>
      )}
    </Paper>
  );

  async function login() {
    setLoading(true);
    const { error, user } = await firebase.login();

    if (error) {
      onLoginError(error);
    }
    if (!user) {
      onLoginError("User is undefined");
    } else {
      onLoginSuccess(user);
    }
  }
};

export default SignIn;
