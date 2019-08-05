import React, { useState, useContext, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';
import Home from '../Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import MainMenu from '../MainMenu';

const App = () => {
    const firebase = useContext(FirebaseContext);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        firebase.onInitialize(setInitialized);
    }, [firebase]);
    return initialized ? (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/mainMenu" component={MainMenu} />
                <Route component={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    ) : <LinearProgress />;
};

export default App;