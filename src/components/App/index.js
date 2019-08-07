import React, { useState, useContext, useEffect } from "react";
import { LinearProgress, Container } from "@material-ui/core";
import { FirebaseContext } from "../Firebase";
import Home from "../Home";
import Tournament from "../Tournament";
import Team from "../Team";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainMenu from "../MainMenu";
import PrivateRoute from "../PrivateRoute";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    firebase.onInitialize(() => setInitialized(true));
  }, [firebase]);
  return initialized ? (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/mainMenu" component={MainMenu} />
          <PrivateRoute exact path="/tournament" component={Tournament} />
          <PrivateRoute exact path="/team" component={Team} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Container>
  ) : (
    <LinearProgress />
  );
};

export default App;
