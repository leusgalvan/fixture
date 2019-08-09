import React, { useState, useContext } from "react";
import SignIn from "../SignIn";
import MainMenu from "../MainMenu";
import { Typography } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";

const Home = () => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(firebase.auth.currentUser);
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
      {user && <MainMenu onLogout={logout} />}
    </>
  );
  async function logout() {
    await firebase.logout();
    setUser(null);
  }
};

export default Home;
