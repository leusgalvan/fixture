import React, { useState, useContext } from 'react';
import SignIn from '../SignIn';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';
import MainMenu from '../MainMenu';

const styles = theme => ({
    app: {
        margin: theme.spacing(3),
    },
});

const App = ({ classes }) => {
    const firebase = useContext(FirebaseContext);
    const [user, setUser] = useState(firebase.auth.currentUser);
    const [error, setError] = useState('');
    return (
        <div className={classes.app}>
            {!user && !error && <SignIn onLoginError={setError} onLoginSuccess={setUser} />}
            {error && (<Typography variant="body1" color="textPrimary">{error}</Typography>)}
            {user && (<MainMenu />)}
        </div>
    );
};

export default withStyles(styles)(App);