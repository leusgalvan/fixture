import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress, Card } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { Theme } from "../../theme";
import { User } from "firebase";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(2),
    width: "50%",
    alignItems: "center",
  },

  title: {
    margin: theme.spacing(2),
  },

  button: {
    margin: theme.spacing(2),
  },
  media: {
    // height: 0,
    width: "89%",
    paddingTop: "60.25%", // 16:9
    backgroundSize: "contain",
  },
}));

interface SignInProps {
  onLoginSuccess: (user: User) => void;
  onLoginError: (err: string) => void;
  error?: string;
}

const SignIn = ({ onLoginSuccess, onLoginError, error }: SignInProps) => {
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Card className={classes.paper}>
      <CardMedia
        className={classes.media}
        image={require("../Common/logo.png")}
        title="olympic-bonzzu"
      />
      <Typography className={classes.title} variant="h5" color="textPrimary">
        Welcome
      </Typography>
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant="h6">Signing in...</Typography>
        </>
      ) : (
        <>
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
          >
            Sign in
          </Button>
          {error && (
            <Typography variant="subtitle1" color="error">
              {error}
            </Typography>
          )}
        </>
      )}
    </Card>
  );

  async function login() {
    setLoading(true);
    const { user, error } = await firebase.login();

    setLoading(false);
    if (error) {
      onLoginError(error);
    }
    if (!user) {
      onLoginError("We are really sorry, something went wrong :(");
    } else {
      onLoginSuccess(user);
    }
  }
};

export default SignIn;
