import React, { useState, useContext, useEffect, useReducer } from "react";
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
import {
  AppContext,
  reducerApp,
  initialState,
  AppActions,
} from "../../state/index";
import TeamGenerator from "../TeamGenerator";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const [initialized, setInitialized] = useState(false);
  const [state, dispatch] = useReducer(reducerApp, initialState);
  useEffect(() => {
    firebase.onInitialize(() => {
      setInitialized(true);
      dispatch({
        type: AppActions.AUTH_STATE_CHANGED,
        payload: firebase.getCurrentUser(),
      });
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return initialized ? (
    <AppContext.Provider value={{ ...state, dispatch }}>
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
              path="/tournament/generateTeams"
              component={TeamGenerator}
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
