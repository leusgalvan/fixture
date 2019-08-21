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
  Redirect
} from "react-router-dom";
import MainMenu from "../MainMenu";
import PrivateRoute from "../PrivateRoute";
import StandingsContainer from "../Standings";
import ResultsContainer from "../Results";
import AddTeam from "../Team/AddTeam";
import { Container, LinearProgress } from "@material-ui/core";
import NavBar from "../NavBar";
import { AppContext } from "../../state/index";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(firebase.getCurrentUser());
  useEffect(() => {
    firebase.onInitialize(() => {
      setInitialized(true);
      setUser(firebase.getCurrentUser());
    });
  }, [firebase]);
  return initialized ? (
    <AppContext.Provider value={{ user }}>
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
    </AppContext.Provider>
  ) : (
    <LinearProgress />
  );
};

export default App;
