import React, { useState, useContext, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';
import Home from '../Home';

const styles = theme => ({
    app: {
        margin: theme.spacing(3),
    }
});

const App = ({ classes }) => {
    const firebase = useContext(FirebaseContext);
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        firebase.auth.onAuthStateChanged(setInitialized);
    }, []);
    return initialized? <Home />: <LinearProgress />;
};

export default withStyles(styles)(App);