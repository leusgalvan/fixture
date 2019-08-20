import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase";
import Home from "../Home";
import AddTournament from "../Tournament/AddTournament";
import Tournament from "../Tournament";
import TeamView from "../Team";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainMenu from "../MainMenu";
import PrivateRoute from "../PrivateRoute";
import StandingsContainer from "../Standings";
import ResultsContainer from "../Results";
import AddTeam from "../Team/AddTeam";
import { Container, LinearProgress } from "@material-ui/core";
import NavBar from "../NavBar";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    firebase.onInitialize(() => setInitialized(true));
  }, [firebase]);
  return initialized ? (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/mainMenu" component={MainMenu} />
          <PrivateRoute exact path="/tournament" component={Tournament} />
          <PrivateRoute
            exact
            path="/tournament/add"
            component={AddTournament}
          />
          <PrivateRoute
            exact
            path="/standings/:idTournament"
            component={StandingsContainer}
          />
          <PrivateRoute
            exact
            path="/results/:idTournament"
            component={ResultsContainer}
          />
          <PrivateRoute exact path="/team" component={TeamView} />
          <PrivateRoute exact path="/team/add" component={AddTeam} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    </Router>
  ) : (
    <LinearProgress />
  );
};

export default App;
