import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';

const styles = theme => ({
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
    }
});

const SignIn = ({ classes, onLoginSuccess, onLoginError }) => {
    const firebase = useContext(FirebaseContext);
    
    return (
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5" color="textPrimary">
                Welcome
            </Typography>
            <Button className={classes.button} fullWidth variant="contained" color="primary" onClick={login}>Sign in</Button>
        </Paper>
    );

    async function login() {
        const { error, user } = await firebase.login();
        if (error) {
            onLoginError(error);
        } else {
            onLoginSuccess(user);
        }
    }
}



export default withStyles(styles)(SignIn);