import React, { useState, useContext } from "react";
import SignIn from "../SignIn";
import { Typography } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import { Redirect } from "react-router";

const Home = () => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(firebase.getCurrentUser());
  const [error, setError] = useState("");
  return (
    <>
      {!user && !error && (
        <SignIn onLoginError={setError} onLoginSuccess={setUser} />
      )}
      {error && (
        <Typography variant="body1" color="textPrimary">
          {error}
        </Typography>
      )}
      {user && <Redirect to="/mainMenu" />}
    </>
  );
};

export default Home;
